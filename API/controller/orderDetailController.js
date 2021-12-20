const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, phanTramLoiNhuan, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');


module.exports = {
    LayChiTietDonHangTheoIdDonHang: async function (req, res) {
        var idDonHang = req.query.idOrder;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let arrOrderDetail = await colOrderDetail.find({ idOrder: idDonHang }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail
        });
    },

    LayChiTietDonHangAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({}).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allOrderDetail
        });
    },

    LayChiTietDonHangTheoIdShop_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_ChoDuyet_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 0 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 0 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_DaDuyet_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 1 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 1 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_DangVanChuyen_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 2 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 2 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_KhachNhanHang_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 3 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 3 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_HoanThanh_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 4 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 4 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_Huy_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 5 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 5 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoID: async function (req, res) {
        const orderDetailID = req.query.idOrderDetail;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShow: orderDetailID }).next();
        client.close();
        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },

    SuaTrangThaiThanhDaDuyet: async function (req, res) {
        const orderDetailID = req.body.id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.updateOne({ idShow: orderDetailID },
            {
                $set:
                {
                    trangThai: 1
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },

    SuaChiTietDonHang: async function (req, res) {
        const orderDetailID = req.body.id;
        var chiTietSua = {
            trangThai: req.body.trangThai,
            ghiChu: req.body.ghiChu
        }
        console.log(chiTietSua)
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result;

        if (chiTietSua.trangThai === 4 || chiTietSua.trangThai === 5) {
            result = await colOrderDetail.updateOne({ idShow: orderDetailID },
                {
                    $set:
                    {
                        trangThai: chiTietSua.trangThai,
                        ghiChu: chiTietSua.ghiChu,
                        ngayHoanThanh: new Date()
                    }
                });
        } else {
            result = await colOrderDetail.updateOne({ idShow: orderDetailID },
                {
                    $set:
                    {
                        trangThai: chiTietSua.trangThai,
                        ghiChu: chiTietSua.ghiChu
                    }
                });
        }


        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },

    TinhLoiNhuanHomNay: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        const colLichSuCTDonHang = db.collection(orderhistorydetail);

        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        let arrLichSu = [];
        var dateNow = new Date();
        let arrOrderDetails = [];
        var loiNhuanHomNay = 0;

        for (let index = 0; index < result.length; index++) {
            let result2 = await colLichSuCTDonHang.findOne({ idOrderDetail: result[index].idShow, trangThai: 4 });
            arrLichSu.push(result2);
        }

        for (let index = 0; index < arrLichSu.length; index++) {
            if (arrLichSu[index].ngayThucHien.getDate() === dateNow.getDate() &&
                arrLichSu[index].ngayThucHien.getMonth() === dateNow.getMonth() &&
                arrLichSu[index].ngayThucHien.getFullYear() === dateNow.getFullYear()) {
                arrOrderDetails.push(arrLichSu[index].idOrderDetail);
            }

        }

        for (let index = 0; index < result.length; index++) {
            for (let index2 = 0; index2 < arrOrderDetails.length; index2++) {
                if (arrOrderDetails[index2] === result[index].idShow) {
                    loiNhuanHomNay += result[index].thanhTien;
                }

            }
        }

        client.close();
        res.status(200).json({
            status: 'success',
            data: loiNhuanHomNay,
            message: 'Tính lợi nhuận thành công'
        });
    },

    TinhOrderDangChoXacNhan: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 0 }).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: result.length,
            message: 'Tính đơn hàng đang chờ xác nhận thành công'
        });
    },

    TinhOrderDangVanChuyen: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 2 }).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: result.length,
            message: 'Tính đơn hàng đang vận chuyển thành công'
        });
    },

    TinhOrderDatNgayHomQua: async function (req, res) {
        const shopID = req.query.idShop;
        var dateNow = new Date();
        var beforeDateNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 1);
        var arrOrderDetails = [];

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID }).toArray();

        for (let index = 0; index < result.length; index++) {
            if (result[index].ngayTao.getDate() === beforeDateNow.getDate() &&
                result[index].ngayTao.getMonth() === beforeDateNow.getMonth() &&
                result[index].ngayTao.getFullYear() === beforeDateNow.getFullYear()) {
                arrOrderDetails.push(result[index]);
            }

        }

        client.close();
        res.status(200).json({
            status: 'success',
            data: arrOrderDetails.length,
            message: 'Tính đơn hàng đang vận chuyển thành công'
        });
    },

    TinhOrderDat7NgayGanNhat: async function (req, res) {
        const shopID = req.query.idShop;
        var dateNow = new Date();
        var date7NgayTruocDo = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 7);
        var arrOrderDetails = [];

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID }).toArray();

        for (let index = 0; index < result.length; index++) {
            if (result[index].ngayTao.getDate() >= date7NgayTruocDo.getDate() &&
                result[index].ngayTao.getDate() < dateNow.getDate() &&
                result[index].ngayTao.getMonth() === date7NgayTruocDo.getMonth() &&
                result[index].ngayTao.getFullYear() === date7NgayTruocDo.getFullYear()) {
                arrOrderDetails.push(result[index]);
            }

        }

        client.close();
        res.status(200).json({
            status: 'success',
            data: arrOrderDetails.length,
            message: 'Tính đơn hàng đang vận chuyển thành công'
        });
    },

    TinhDataLoiNhuan7NgayTruocDo: async function (req, res) {
        const shopID = req.query.idShop;
        var dateNow = new Date();
        var date7NgayTruocDo = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 7);
        // var dateNow2 = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 1);
        // var date7NgayTruocDo = new Date(dateNow2.getFullYear(), dateNow2.getMonth(), dateNow2.getDate() - 7);
        var arrDate = [];
        var arrDoanhThu = [];

        for (let index = 0; index < 7; index++) {
            var dateThem = new Date(date7NgayTruocDo.getFullYear(), date7NgayTruocDo.getMonth(), date7NgayTruocDo.getDate() + index);
            arrDate.push(dateThem);
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var doanhThu = 0;
            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayTao.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayTao.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayTao.getFullYear()) {
                    doanhThu += result[index2].thanhTien;
                }
            }
            arrDoanhThu.push(doanhThu);
        }

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()).toString() + '/' + (arrDate[index].getMonth() + 1).toString() + '/' + arrDate[index].getFullYear().toString();
            arrDateResult.push(stringDate);
        }


        console.log(arrDateResult);
        console.log(arrDoanhThu);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            message: 'Tính lợi nhuận 7 ngày (từng ngày) trước hôm nay thành công'
        });
    },

    TinhDataLoiNhuanTuanNay: async function (req, res) {
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week

        var firstday = new Date(curr.setDate(first));

        const shopID = req.query.idShop;
        var arrDate = [];
        var arrDoanhThu = [];
        var arrChietKhau = [];
        var arrDoanhThuSauChietKhau = [];

        for (let index = 0; index <= 7; index++) {
            var dateThem = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + index);
            if (dateThem >= firstday) {
                arrDate.push(dateThem);
            }
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var doanhThu = 0;
            var chietKhau = 0;

            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                    doanhThu += result[index2].thanhTien;
                    chietKhau += result[index2].thanhTien * phanTramLoiNhuan / 100;
                }
            }
            arrDoanhThu.push(doanhThu);
            arrChietKhau.push(chietKhau);
            arrDoanhThuSauChietKhau.push(doanhThu - chietKhau);
        }

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1) + '/' + arrDate[index].getFullYear();
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            dataChietKhau: arrChietKhau,
            message: 'Tính lợi nhuận tuần này thành công'
        });
    },

    TinhDataLoiNhuanTuanNay_Admin: async function (req, res) {
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        var arrDate = [];
        var arrDoanhThu = [];

        for (let index = 0; index <= 7; index++) {
            var dateThem = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + index);
            if (dateThem >= firstday) {
                arrDate.push(dateThem);
            }
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        const colLichSu = db.collection(orderhistorydetail);
        let result = await colLichSu.find({ trangThai: 4, ngayThucHien: { $gte: firstday, $lte: lastday } }).toArray();

        let arrOrderDetailID = [];
        for (let index = 0; index < result.length; index++) {
            arrOrderDetailID.push(result[index].idOrderDetail);
        }

        let result2 = await colOrderDetail.find({ trangThai: 4 }).toArray();

        let arrOrderDetail = [];

        for (let index = 0; index < result2.length; index++) {
            for (let index2 = 0; index2 < arrOrderDetailID.length; index2++) {
                if (result2[index].idShow === arrOrderDetailID[index2]) {
                    arrOrderDetail.push(result2[index]);
                    break;
                }
            }
        }


        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var doanhThu = 0;
            for (let index2 = 0; index2 < arrOrderDetail.length; index2++) {
                if (arrDate[index1].getDate() === arrOrderDetail[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === arrOrderDetail[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === arrOrderDetail[index2].ngayHoanThanh.getFullYear()) {
                    doanhThu += arrOrderDetail[index2].thanhTien * phanTramLoiNhuan / 100;
                }
            }
            arrDoanhThu.push(doanhThu);
        }

        console.log(arrDoanhThu);

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1) + '/' + arrDate[index].getFullYear();
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            data: arrOrderDetail,
            message: 'Tính lợi nhuận tuần này thành công'
        });
    },

    TinhDataSanLuongTuanNay: async function (req, res) {
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        const shopID = req.query.idShop;
        var arrDate = [];
        var arrSanLuong = [];

        for (let index = 0; index <= 7; index++) {
            var dateThem = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + index);
            if (dateThem >= firstday) {
                arrDate.push(dateThem);
            }
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var sanLuong = 0;
            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                    sanLuong += result[index2].soLuong;
                }
            }
            arrSanLuong.push(sanLuong);
        }

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1) + '/' + arrDate[index].getFullYear();
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSanLuong: arrSanLuong,
            message: 'Tính sản lượng tuần này thành công'
        });
    },

    TinhDataSoDonHangTuanNay: async function (req, res) {
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        const shopID = req.query.idShop;
        var arrDate = [];
        var arrSoDonHang = [];

        for (let index = 0; index <= 7; index++) {
            var dateThem = new Date(firstday.getFullYear(), firstday.getMonth(), firstday.getDate() + index);
            if (dateThem >= firstday) {
                arrDate.push(dateThem);
            }
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var soDonHang = 0;
            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                    soDonHang += 1;
                }
            }
            arrSoDonHang.push(soDonHang);
        }

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1) + '/' + arrDate[index].getFullYear();
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSoDonHang: arrSoDonHang,
            message: 'Tính số đơn hàng tuần này thành công'
        });
    },

    TinhDataLoiNhuanThangNay: async function (req, res) {
        var curr = new Date(); // get current date
        var soNgayTrongThang = daysInMonth(curr.getMonth() + 1, curr.getFullYear());
        var firstDateOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 1);

        const shopID = req.query.idShop;
        var arrDate = [];
        var arrDoanhThu = [];
        var arrChietKhau = [];
        var arrDoanhThuSauChietKhau = [];


        for (let index = 1; index <= soNgayTrongThang; index++) {
            var dateThem = new Date(firstDateOfMonth.getFullYear(), firstDateOfMonth.getMonth(), index);
            arrDate.push(dateThem);
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var doanhThu = 0;
            var chietKhau = 0;
            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                    doanhThu += result[index2].thanhTien;
                    chietKhau += result[index2].thanhTien * phanTramLoiNhuan / 100;
                }
            }
            arrDoanhThu.push(doanhThu);
            arrChietKhau.push(chietKhau);
            arrDoanhThuSauChietKhau.push(doanhThu - chietKhau);
        }

        console.log(arrDoanhThu)
        console.log(arrChietKhau)
        console.log(arrDoanhThuSauChietKhau)

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1);
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            dataChietKhau: arrChietKhau,
            dataDoanhThuSauChietKhau: arrDoanhThuSauChietKhau,
            message: 'Tính lợi nhuận tháng này thành công'
        });
    },

    TinhDataLoiNhuanThangNay_Admin: async function (req, res) {
        var curr = new Date(); // get current date
        var soNgayTrongThang = daysInMonth(curr.getMonth() + 1, curr.getFullYear());

        var arrDate = [];
        var arrDoanhThu = [];
        var firstDateOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 1);

        for (let index = 1; index <= soNgayTrongThang; index++) {
            var dateThem = new Date(firstDateOfMonth.getFullYear(), firstDateOfMonth.getMonth(), index);
            arrDate.push(dateThem);
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ trangThai: 4 }).toArray();
        let arrOrderDetail = [];

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var doanhThu = 0;
            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                    doanhThu += result[index2].thanhTien;
                    arrOrderDetail.push(result[index2]);
                }
            }
            arrDoanhThu.push(doanhThu);
        }

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1);
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            data: arrOrderDetail,
            message: 'Tính lợi nhuận tháng này thành công'
        });
    },

    TinhDataSanLuongThangNay: async function (req, res) {
        var curr = new Date(); // get current date
        var soNgayTrongThang = daysInMonth(curr.getMonth() + 1, curr.getFullYear());
        // console.log(curr.toString());
        console.log(soNgayTrongThang);

        const shopID = req.query.idShop;
        var arrDate = [];
        var arrSanLuong = [];
        var firstDateOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 1);

        for (let index = 1; index <= soNgayTrongThang; index++) {
            var dateThem = new Date(firstDateOfMonth.getFullYear(), firstDateOfMonth.getMonth(), index);
            arrDate.push(dateThem);
        }


        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var sanLuong = 0;
            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                    sanLuong += result[index2].soLuong;
                }
            }
            arrSanLuong.push(sanLuong);
        }

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1);
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSanLuong: arrSanLuong,
            message: 'Tính sản lượng tháng này thành công'
        });
    },

    TinhDataSoDonHangThangNay: async function (req, res) {
        var curr = new Date(); // get current date
        var soNgayTrongThang = daysInMonth(curr.getMonth() + 1, curr.getFullYear());
        // console.log(curr.toString());
        console.log(soNgayTrongThang);

        const shopID = req.query.idShop;
        var arrDate = [];
        var arrSoDonHang = [];
        var firstDateOfMonth = new Date(curr.getFullYear(), curr.getMonth(), 1);

        for (let index = 1; index <= soNgayTrongThang; index++) {
            var dateThem = new Date(firstDateOfMonth.getFullYear(), firstDateOfMonth.getMonth(), index);
            arrDate.push(dateThem);
        }
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        for (let index1 = 0; index1 < arrDate.length; index1++) {
            var soDonHang = 0;
            for (let index2 = 0; index2 < result.length; index2++) {
                if (arrDate[index1].getDate() === result[index2].ngayHoanThanh.getDate() &&
                    arrDate[index1].getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                    arrDate[index1].getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                    soDonHang += 1;
                }
            }
            arrSoDonHang.push(soDonHang);
        }

        var arrDateResult = [];

        for (let index = 0; index < arrDate.length; index++) {
            var stringDate = (arrDate[index].getDate()) + '/' + (arrDate[index].getMonth() + 1);
            arrDateResult.push(stringDate);
        }

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSoDonHang: arrSoDonHang,
            message: 'Tính số đơn hàng tháng này thành công'
        });
    },

    TinhDataLoiNhuan3ThangGanNhat: async function (req, res) {
        var curr = new Date(); // get current date
        const shopID = req.query.idShop;
        var arrDoanhThu = [];
        var arrChietKhau = [];
        var arrDoanhThuSauChietKhau = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();
        var doanhThu1 = 0;
        var doanhThu2 = 0;
        var doanhThu3 = 0;

        var chietKhau1 = 0;
        var chietKhau2 = 0;
        var chietKhau3 = 0;

        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu1 += result[index2].thanhTien;
                chietKhau1 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu2 += result[index2].thanhTien;
                chietKhau2 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu3 += result[index2].thanhTien;
                chietKhau3 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }
        }

        arrDoanhThu.push(doanhThu3, doanhThu2, doanhThu1);
        arrChietKhau.push(chietKhau3, chietKhau2, chietKhau1);
        arrDoanhThuSauChietKhau.push(doanhThu3 - chietKhau3, doanhThu2 - chietKhau2, doanhThu1 - chietKhau1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();

        arrDateResult.push(stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            dataChietKhau: arrChietKhau,
            dataDoanhThuSauChietKhau: arrDoanhThuSauChietKhau,
            message: 'Tính lợi nhuận 3 tháng gần nhất thành công'
        });
    },

    TinhDataLoiNhuan3ThangGanNhat_Admin: async function (req, res) {
        var curr = new Date(); // get current date
        var arrDoanhThu = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ trangThai: 4 }).toArray();
        var doanhThu1 = 0;
        var doanhThu2 = 0;
        var doanhThu3 = 0;

        let arrOrderDetail = [];

        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu1 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu2 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu3 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }
        }

        arrDoanhThu.push(doanhThu3, doanhThu2, doanhThu1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();

        arrDateResult.push(stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            data: arrOrderDetail,
            message: 'Tính lợi nhuận 3 tháng gần nhất thành công'
        });
    },


    TinhDataSanLuong3ThangGanNhat: async function (req, res) {
        var curr = new Date(); // get current date
        const shopID = req.query.idShop;
        var arrSanLuong = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();
        var sanLuong1 = 0;
        var sanLuong2 = 0;
        var sanLuong3 = 0;

        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong1 += result[index2].soLuong;
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong2 += result[index2].soLuong;
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong3 += result[index2].soLuong;
            }
        }

        arrSanLuong.push(sanLuong3, sanLuong2, sanLuong1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();

        arrDateResult.push(stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSanLuong: arrSanLuong,
            message: 'Tính sản lượng 3 tháng gần nhất thành công'
        });
    },

    TinhDataSoDonHang3ThangGanNhat: async function (req, res) {
        var curr = new Date(); // get current date
        const shopID = req.query.idShop;
        var arrSoDonHang = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();
        var soDonHang1 = 0;
        var soDonHang2 = 0;
        var soDonHang3 = 0;

        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang1 += 1;
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang2 += 1;
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang3 += 1;
            }
        }


        arrSoDonHang.push(soDonHang3, soDonHang2, soDonHang1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();

        arrDateResult.push(stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSoDonHang: arrSoDonHang,
            message: 'Tính số đơn hàng 3 tháng gần nhất thành công'
        });
    },

    TinhDataLoiNhuan6ThangGanNhat: async function (req, res) {
        var curr = new Date(); // get current date
        const shopID = req.query.idShop;
        var arrDoanhThu = [];
        var arrChietKhau = [];
        var arrDoanhThuSauChietKhau = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);
        var thangThuTu = new Date(curr.getFullYear(), curr.getMonth() - 4, 1);
        var thangThuNam = new Date(curr.getFullYear(), curr.getMonth() - 5, 1);
        var thangThuSau = new Date(curr.getFullYear(), curr.getMonth() - 6, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();
        var doanhThu1 = 0;
        var doanhThu2 = 0;
        var doanhThu3 = 0;
        var doanhThu4 = 0;
        var doanhThu5 = 0;
        var doanhThu6 = 0;

        var chietKhau1 = 0;
        var chietKhau2 = 0;
        var chietKhau3 = 0;
        var chietKhau4 = 0;
        var chietKhau5 = 0;
        var chietKhau6 = 0;


        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu1 += result[index2].thanhTien;
                chietKhau1 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu2 += result[index2].thanhTien;
                chietKhau2 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu3 += result[index2].thanhTien;
                chietKhau3 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }

            if (thangThuTu.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuTu.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu4 += result[index2].thanhTien;
                chietKhau4 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }

            if (thangThuNam.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNam.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu5 += result[index2].thanhTien;
                chietKhau5 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }

            if (thangThuSau.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuSau.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu6 += result[index2].thanhTien;
                chietKhau6 += result[index2].thanhTien * phanTramLoiNhuan / 100;
            }
        }

        arrDoanhThu.push(doanhThu6, doanhThu5, doanhThu4, doanhThu3, doanhThu2, doanhThu1);
        arrChietKhau.push(chietKhau6, chietKhau5, chietKhau4, chietKhau3, chietKhau2, chietKhau1);
        arrDoanhThuSauChietKhau.push(doanhThu6 - chietKhau6, doanhThu5 - chietKhau5, doanhThu4 - chietKhau4, doanhThu3 - chietKhau3, doanhThu2 - chietKhau2, doanhThu1 - chietKhau1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();
        var stringThangThuTu = (thangThuTu.getMonth() + 1).toString() + '/' + (thangThuTu.getFullYear()).toString();
        var stringThangThuNam = (thangThuNam.getMonth() + 1).toString() + '/' + (thangThuNam.getFullYear()).toString();
        var stringThangThuSau = (thangThuSau.getMonth() + 1).toString() + '/' + (thangThuSau.getFullYear()).toString();


        arrDateResult.push(stringThangThuSau, stringThangThuNam, stringThangThuTu, stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            dataChietKhau: arrChietKhau,
            dataDoanhThuSauChietKhau: arrDoanhThuSauChietKhau,
            message: 'Tính lợi nhuận 6 tháng gần nhất thành công'
        });
    },

    TinhDataLoiNhuan6ThangGanNhat_Admin: async function (req, res) {
        var curr = new Date(); // get current date
        var arrDoanhThu = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);
        var thangThuTu = new Date(curr.getFullYear(), curr.getMonth() - 4, 1);
        var thangThuNam = new Date(curr.getFullYear(), curr.getMonth() - 5, 1);
        var thangThuSau = new Date(curr.getFullYear(), curr.getMonth() - 6, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ trangThai: 4 }).toArray();
        var doanhThu1 = 0;
        var doanhThu2 = 0;
        var doanhThu3 = 0;
        var doanhThu4 = 0;
        var doanhThu5 = 0;
        var doanhThu6 = 0;
        let arrOrderDetail = [];


        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu1 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu2 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu3 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }

            if (thangThuTu.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuTu.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu4 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }

            if (thangThuNam.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNam.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu5 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }

            if (thangThuSau.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuSau.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                doanhThu6 += result[index2].thanhTien;
                arrOrderDetail.push(result[index2]);
            }
        }

        arrDoanhThu.push(doanhThu6, doanhThu5, doanhThu4, doanhThu3, doanhThu2, doanhThu1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();
        var stringThangThuTu = (thangThuTu.getMonth() + 1).toString() + '/' + (thangThuTu.getFullYear()).toString();
        var stringThangThuNam = (thangThuNam.getMonth() + 1).toString() + '/' + (thangThuNam.getFullYear()).toString();
        var stringThangThuSau = (thangThuSau.getMonth() + 1).toString() + '/' + (thangThuSau.getFullYear()).toString();


        arrDateResult.push(stringThangThuSau, stringThangThuNam, stringThangThuTu, stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataDoanhThu: arrDoanhThu,
            data: arrOrderDetail,
            message: 'Tính lợi nhuận 6 tháng gần nhất thành công'
        });
    },


    TinhDataSanLuong6ThangGanNhat: async function (req, res) {
        var curr = new Date(); // get current date
        const shopID = req.query.idShop;
        var arrSanLuong = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);
        var thangThuTu = new Date(curr.getFullYear(), curr.getMonth() - 4, 1);
        var thangThuNam = new Date(curr.getFullYear(), curr.getMonth() - 5, 1);
        var thangThuSau = new Date(curr.getFullYear(), curr.getMonth() - 6, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();
        var sanLuong1 = 0;
        var sanLuong2 = 0;
        var sanLuong3 = 0;
        var sanLuong4 = 0;
        var sanLuong5 = 0;
        var sanLuong6 = 0;


        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong1 += result[index2].thanhTien;
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong2 += result[index2].soLuong;
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong3 += result[index2].soLuong;
            }

            if (thangThuTu.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuTu.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong4 += result[index2].soLuong;
            }

            if (thangThuNam.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNam.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong5 += result[index2].soLuong;
            }

            if (thangThuSau.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuSau.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                sanLuong6 += result[index2].soLuong;
            }
        }

        arrSanLuong.push(sanLuong6, sanLuong5, sanLuong4, sanLuong3, sanLuong2, sanLuong1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();
        var stringThangThuTu = (thangThuTu.getMonth() + 1).toString() + '/' + (thangThuTu.getFullYear()).toString();
        var stringThangThuNam = (thangThuNam.getMonth() + 1).toString() + '/' + (thangThuNam.getFullYear()).toString();
        var stringThangThuSau = (thangThuSau.getMonth() + 1).toString() + '/' + (thangThuSau.getFullYear()).toString();

        arrDateResult.push(stringThangThuSau, stringThangThuNam, stringThangThuTu, stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSanLuong: arrSanLuong,
            message: 'Tính sản lượng 6 tháng gần nhất thành công'
        });
    },

    TinhDataSoDonHang6ThangGanNhat: async function (req, res) {
        var curr = new Date(); // get current date
        const shopID = req.query.idShop;
        var arrSoDonHang = [];

        var thangThuNhat = new Date(curr.getFullYear(), curr.getMonth() - 1, 1);
        var thangThuHai = new Date(curr.getFullYear(), curr.getMonth() - 2, 1);
        var thangThuBa = new Date(curr.getFullYear(), curr.getMonth() - 3, 1);
        var thangThuTu = new Date(curr.getFullYear(), curr.getMonth() - 4, 1);
        var thangThuNam = new Date(curr.getFullYear(), curr.getMonth() - 5, 1);
        var thangThuSau = new Date(curr.getFullYear(), curr.getMonth() - 6, 1);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();
        var soDonHang1 = 0;
        var soDonHang2 = 0;
        var soDonHang3 = 0;
        var soDonHang4 = 0;
        var soDonHang5 = 0;
        var soDonHang6 = 0;


        for (let index2 = 0; index2 < result.length; index2++) {
            if (thangThuNhat.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNhat.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang1 += 1;
            }

            if (thangThuHai.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuHai.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang2 += 1;
            }

            if (thangThuBa.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuBa.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang3 += 1;
            }

            if (thangThuTu.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuTu.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang4 += 1;
            }

            if (thangThuNam.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuNam.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang5 += 1;
            }

            if (thangThuSau.getMonth() === result[index2].ngayHoanThanh.getMonth() &&
                thangThuSau.getFullYear() === result[index2].ngayHoanThanh.getFullYear()) {
                soDonHang6 += 1;
            }
        }

        arrSoDonHang.push(soDonHang6, soDonHang5, soDonHang4, soDonHang3, soDonHang2, soDonHang1);

        var arrDateResult = [];

        var stringThangThuNhat = (thangThuNhat.getMonth() + 1).toString() + '/' + (thangThuNhat.getFullYear()).toString();
        var stringThangThuHai = (thangThuHai.getMonth() + 1).toString() + '/' + (thangThuHai.getFullYear()).toString();
        var stringThangThuBa = (thangThuBa.getMonth() + 1).toString() + '/' + (thangThuBa.getFullYear()).toString();
        var stringThangThuTu = (thangThuTu.getMonth() + 1).toString() + '/' + (thangThuTu.getFullYear()).toString();
        var stringThangThuNam = (thangThuNam.getMonth() + 1).toString() + '/' + (thangThuNam.getFullYear()).toString();
        var stringThangThuSau = (thangThuSau.getMonth() + 1).toString() + '/' + (thangThuSau.getFullYear()).toString();

        arrDateResult.push(stringThangThuSau, stringThangThuNam, stringThangThuTu, stringThangThuBa, stringThangThuHai, stringThangThuNhat);

        client.close();
        res.status(200).json({
            status: 'success',
            dataDate: arrDateResult,
            dataSoDonHang: arrSoDonHang,
            message: 'Tính số đơn hàng 6 tháng gần nhất thành công'
        });
    },



}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}