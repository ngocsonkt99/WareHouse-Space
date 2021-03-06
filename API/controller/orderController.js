const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, order, voucher, user, product, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau } = require('../functionHoTro/index');
const sgMail = require('@sendgrid/mail');
var nodemailer = require('nodemailer');
sgMail.setApiKey(process.env.MAIL_KEY);


module.exports = {
    LayDonHangTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrder = db.collection(order);
        let allOrder = await colOrder.find({}).toArray();
        let soTrang = Math.ceil(parseInt(allOrder.length) / SoItemMoiPageAdmin);
        let arrOrder = await colOrder.find({}).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrder,
            soTrang: soTrang
        });
    },

    LayDonHangTheoIDUser: async function (req, res) {
        const idUser = req.query.id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrder = db.collection(order);
        let allOrder = await colOrder.find({ idUser: idUser }).sort({ _id: -1 }).toArray();
        client.close();

        console.log(allOrder)

        res.status(200).json({
            status: 'success',
            data: allOrder
        });
    },

    LayDanhSachOrder_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrder = db.collection(order);
        let allOrder = await colOrder.find({
            $or: [
                {
                    idShow: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    'thongTinNguoiMua.lowerTen': {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).toArray();

        let arrOrder = await colOrder.find({
            $or: [
                {
                    idShow: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    'thongTinNguoiMua.lowerTen': {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allOrder.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrder,
            soTrang: soTrang
        });
    },


    LayDonHangTheoID: async function (req, res) {
        const orderID = req.query.idOrder;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrder = db.collection(order);
        let result = await colOrder.find({ idShow: orderID }).next();
        client.close();
        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Kh??ng c?? d??? li???u',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'L???y d??? li???u th??nh c??ng',
                data: result
            });
        }
    },

    ThemDonHang: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let emailNhan = req.body.emailNhan;
        let donHangThem = {
            idShow: req.body.idShow,
            thongTinNguoiMua: {
                ten: req.body.thongTinNguoiMua.hoTen,
                lowerTen: BoDau(req.body.thongTinNguoiMua.hoTen),
                sdt: req.body.thongTinNguoiMua.sdt,
                diaChi: req.body.thongTinNguoiMua.diaChi
            },
            tongTien: req.body.tongTien,
            soLuongSanPham: req.body.soLuongSanPham,
            hinhThucThanhToan: req.body.hinhThucThanhToan,
            ngayTao: new Date(req.body.ngayTao),
            idUser: req.body.idUser,
            idVoucher: req.body.idVoucher
        }

        let dataGioHang = req.body.dataGioHang;
        var countGioHang = dataGioHang.length;
        var countResultThemChiTiet = 0;

        var arrChiTietGioHang = [];

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrder = db.collection(order);
        const colOrderDetail = db.collection(orderdetail);
        const colVoucher = db.collection(voucher);
        const colLichSu = db.collection(orderhistorydetail);
        const colProduct = db.collection(product);
        let result = await colOrder.insertOne(donHangThem);
        let resultVoucher = await colVoucher.find({ idShow: donHangThem.idVoucher }).next();
        let resultProduct = await colProduct.find({}).toArray();

        console.log(result.insertedCount)
        if (result.insertedCount > 0) {
            //C???p nh???t s??? l?????ng ???? b??n trong database PRODUCTS
            for (let index1 = 0; index1 < dataGioHang.length; index1++) {
                for (let index2 = 0; index2 < resultProduct.length; index2++) {
                    if (dataGioHang[index1].ten === resultProduct[index2].ten) {
                        await colProduct.findOneAndUpdate({ idShow: resultProduct[index2].idShow }, { $inc: { "soLuongDaBan": dataGioHang[index1].soLuong } });
                        break;
                    }
                }
            }

            //C???p nh???t th??ng tin gi?? tr??? gi???m gi?? v??o trong t???ng chi ti???t ????n h??ng
            for (let index = 0; index < dataGioHang.length; index++) {
                var giamGiaResult = 0;
                if (resultVoucher !== null) {
                    if (resultVoucher.loaiGiamGia === 0) {
                        giamGiaResult = resultVoucher.giaTriGiam
                    } else {
                        giamGiaResult = dataGioHang[index].giaCuoiCung * dataGioHang[index].soLuong * resultVoucher.giaTriGiam / 100
                    }
                }

                //t???o chi ti???t ????n h??ng ????? th??m v??o database
                var chitiet = {
                    idShow: 'ORDDE-' + ids.generate().toUpperCase(),
                    ten: dataGioHang[index].ten,
                    giaCuoiCung: dataGioHang[index].giaCuoiCung,
                    giamGia: giamGiaResult,
                    thanhTien: dataGioHang[index].giaCuoiCung * dataGioHang[index].soLuong - giamGiaResult,
                    soLuong: dataGioHang[index].soLuong,
                    mauSac: dataGioHang[index].mauSac,
                    size: dataGioHang[index].size,
                    img: dataGioHang[index].img,
                    ngayTao: donHangThem.ngayTao,
                    ngayHoanThanh: new Date(1900, 1, 1),
                    idShop: dataGioHang[index].idShop,
                    idUser: dataGioHang[index].idUser,
                    idOrder: donHangThem.idShow,
                    trangThai: 0,
                    ghiChu: ''
                }

                arrChiTietGioHang.push(chitiet);

                // t???o c??c l???ch s??? theo tr???ng th??i ????n h??ng
                var lichSu0Default = {
                    idOrderDetail: chitiet.idShow,
                    trangThai: 0,
                    ngayThucHien: new Date()
                }

                var lichSu1Default = {
                    idOrderDetail: chitiet.idShow,
                    trangThai: 1,
                    ngayThucHien: ''
                }

                var lichSu2Default = {
                    idOrderDetail: chitiet.idShow,
                    trangThai: 2,
                    ngayThucHien: ''
                }

                var lichSu3Default = {
                    idOrderDetail: chitiet.idShow,
                    trangThai: 3,
                    ngayThucHien: ''
                }

                var lichSu4Default = {
                    idOrderDetail: chitiet.idShow,
                    trangThai: 4,
                    ngayThucHien: ''
                }

                var lichSu5Default = {
                    idOrderDetail: chitiet.idShow,
                    trangThai: 5,
                    ngayThucHien: ''
                }

                //th??m c??c l???ch s??? v?? chi ti???t ????n h??ng v???a m???i t???o v??o database
                await colLichSu.insertMany([lichSu0Default, lichSu1Default, lichSu2Default, lichSu3Default, lichSu4Default, lichSu5Default]);
                await colOrderDetail.insertOne(chitiet);
                countResultThemChiTiet += 1;
            }



            if (countResultThemChiTiet === countGioHang) {
                client.close();
                var html = '<h2>DANH S??CH S???N PH???M</h2>';

                for (let index = 0; index < arrChiTietGioHang.length; index++) {
                    html += `
                    <img src=${arrChiTietGioHang[index].img} alt="???nh" width="150" height="160">
                    <p><b>T??n s???n ph???m: </b>${arrChiTietGioHang[index].ten}</p>
                    <p><b>S??? l?????ng: </b>${arrChiTietGioHang[index].soLuong}</p>
                    <p><b>Gi??: </b>${format_curency(arrChiTietGioHang[index].giaCuoiCung.toString())}??</p>
                    <p><b>Gi???m gi??: </b>${format_curency(arrChiTietGioHang[index].giamGia.toString())}??</p>
                    <p><b>M??u s???c: </b>${arrChiTietGioHang[index].mauSac === '' ? 'Kh??ng' : arrChiTietGioHang[index].mauSac}</p>
                    <p><b>Size: </b>${arrChiTietGioHang[index].size === '' ? 'Kh??ng' : arrChiTietGioHang[index].size}</p>
                    <p><b>Th??nh ti???n: </b>${format_curency(arrChiTietGioHang[index].thanhTien.toString())}??</p>
                    <br></br>
                    `
                }

                html += `
                <h2>????N H??NG ???????C GIAO ?????N</h2>
                <p><b>T??n : </b>${donHangThem.thongTinNguoiMua.ten}</p>
                <p><b>?????a ch??? nh??: </b>${donHangThem.thongTinNguoiMua.diaChi}</p>
                <p><b>??i???n tho???i: </b>${donHangThem.thongTinNguoiMua.sdt}</p>
                <p><b>Email: </b>${emailNhan}</p>
                <br></br>
                <h3>C??m ??n b???n ???? mua h??ng t???i WareHouse.</h3>
                `

                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_FROM,
                        pass: process.env.PASS_EMAIL
                    }
                });

                const mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: emailNhan,
                    subject: `WareHouse ???? nh???n ????n h??ng ${donHangThem.idShow}`,
                    html: html
                }
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('1')
                        res.status(200).json({
                            status: 'fail',
                            message: 'Th??m ????n h??ng th???t b???i !'
                        })
                    } else {
                        console.log('2')
                        res.status(200).json({
                            status: 'success',
                            message: 'Th??m ????n h??ng th??nh c??ng'
                        })
                    }
                })
            }
        } else {
            client.close();
            console.log('3')
            res.status(200).json({
                status: 'fail',
                message: 'Th??m ????n h??ng th???t b???i !'
            })

        }

    }
}

function format_curency(a) {
    a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
}