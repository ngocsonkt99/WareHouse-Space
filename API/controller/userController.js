const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, user, voucher, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const bcrypt = require('bcrypt');
const { BoDau } = require('../functionHoTro/index');

module.exports = {
    LayShopTheoID: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let dataUser = await colUser.find({ 'thongTinShop.idShop': shopID, vaiTro: 1 }).next();
        client.close();
        if (dataUser === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: dataUser
            });
        }
    },

    LayShopTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allUser = await colUser.find({ vaiTro: 1 }).toArray();
        let soTrang = Math.ceil(parseInt(allUser.length) / SoItemMoiPageAdmin);
        let arrUser = await colUser.find({ vaiTro: 1 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrUser,
            soTrang: soTrang
        });
    },

    LayDanhSachShop_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allShop = await colUser.find({
            vaiTro: 1, $or: [
                {
                    'thongTinShop.idShop': {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    'thongTinShop.lowerTen': {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).toArray();

        let arrShop = await colUser.find({
            vaiTro: 1, $or: [
                {
                    'thongTinShop.idShop': {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    'thongTinShop.lowerTen': {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allShop.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrShop,
            soTrang: soTrang
        });
    },

    LayDanhSachUser_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allUser = await colUser.find({
            isDelete: false, vaiTro: { $ne: 0 }, $or: [
                {
                    sdt: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    email: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    lowerTen: {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).toArray();

        let arrUser = await colUser.find({
            isDelete: false, vaiTro: { $ne: 0 }, $or: [
                {
                    sdt: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    email: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    lowerTen: {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allUser.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrUser,
            soTrang: soTrang
        });
    },

    LayUserTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allUser = await colUser.find({ isDelete: false, vaiTro: { $ne: 0 } }).toArray();
        let soTrang = Math.ceil(parseInt(allUser.length) / SoItemMoiPageAdmin);
        let arrUser = await colUser.find({ isDelete: false, vaiTro: { $ne: 0 } }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrUser,
            soTrang: soTrang
        });
    },

    LayUser_ChuaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allUser = await colUser.find({ isDelete: false, vaiTro: { $ne: 0 }, isLock: false }).toArray();
        let soTrang = Math.ceil(parseInt(allUser.length) / SoItemMoiPageAdmin);
        let arrUser = await colUser.find({ isDelete: false, vaiTro: { $ne: 0 }, isLock: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrUser,
            soTrang: soTrang
        });
    },

    LayUser_DaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allUser = await colUser.find({ isDelete: false, vaiTro: { $ne: 0 }, isLock: true }).toArray();
        let soTrang = Math.ceil(parseInt(allUser.length) / SoItemMoiPageAdmin);
        let arrUser = await colUser.find({ isDelete: false, vaiTro: { $ne: 0 }, isLock: true }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrUser,
            soTrang: soTrang
        });
    },

    LayShop_ChuaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allUser = await colUser.find({ 'thongTinShop.isLock': false, vaiTro: 1 }).toArray();
        let soTrang = Math.ceil(parseInt(allUser.length) / SoItemMoiPageAdmin);
        let arrUser = await colUser.find({ 'thongTinShop.isLock': false, vaiTro: 1 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrUser,
            soTrang: soTrang
        });
    },

    LayShop_DaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let allUser = await colUser.find({ 'thongTinShop.isLock': true, vaiTro: 1 }).toArray();
        let soTrang = Math.ceil(parseInt(allUser.length) / SoItemMoiPageAdmin);
        let arrUser = await colUser.find({ 'thongTinShop.isLock': true, vaiTro: 1 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrUser,
            soTrang: soTrang
        });
    },

    KhoaShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result = await colUser.updateOne({ 'thongTinShop.idShop': id },
            {
                $set:
                {
                    'thongTinShop.isLock': true
                }
            });

        const colProduct = db.collection(product);
        let arrProduct = await colProduct.find({ idShop: id, isDelete: false }).toArray();

        for (let index = 0; index < arrProduct.length; index++) {
            await colProduct.updateOne({ idShow: arrProduct[index].idShow }, {
                $set:
                {
                    isLock: true
                }
            })
        }

        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công'
        });

    },

    MoKhoaShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result = await colUser.updateOne({ 'thongTinShop.idShop': id },
            {
                $set:
                {
                    'thongTinShop.isLock': false
                }
            });

        const colProduct = db.collection(product);
        let arrProduct = await colProduct.find({ idShop: id, isDelete: false }).toArray();

        for (let index = 0; index < arrProduct.length; index++) {
            await colProduct.updateOne({ idShow: arrProduct[index].idShow }, {
                $set:
                {
                    isLock: false
                }
            })
        }
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công'
        });

    },

    KhoaUser: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result = await colUser.updateOne({ _id: ObjectId(id) },
            {
                $set:
                {
                    isLock: true,
                    'thongTinShop.isLock': true
                }
            });

        let userNow = await colUser.find({ _id: ObjectId(id) }).next();
        const shopID = userNow.thongTinShop.idShop;
        const colProduct = db.collection(product);
        let arrProduct = await colProduct.find({ idShop: shopID, isDelete: false }).toArray();

        for (let index = 0; index < arrProduct.length; index++) {
            await colProduct.updateOne({ idShow: arrProduct[index].idShow }, {
                $set:
                {
                    isLock: true
                }
            })
        }

        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công'
        });
    },

    MoKhoaUser: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result = await colUser.updateOne({ _id: ObjectId(id) },
            {
                $set:
                {
                    isLock: false,
                    'thongTinShop.isLock': false
                }
            });

        let userNow = await colUser.find({ _id: ObjectId(id) }).next();
        const shopID = userNow.thongTinShop.idShop;
        const colProduct = db.collection(product);
        let arrProduct = await colProduct.find({ idShop: shopID, isDelete: false }).toArray();

        for (let index = 0; index < arrProduct.length; index++) {
            await colProduct.updateOne({ idShow: arrProduct[index].idShow }, {
                $set:
                {
                    isLock: false
                }
            })
        }

        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công'
        });

    },

    LayUserTheoID: async function (req, res) {
        let userID = ObjectId(req.query.idUser);
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let dataUser = await colUser.find({ _id: userID }).next();
        client.close();
        if (dataUser === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: dataUser
            });
        }
    },

    ThemUser: async function (req, res) {
        let userThem = {
            ten: req.body.ten,
            lowerTen: BoDau(req.body.ten),
            email: req.body.email,
            sdt: req.body.sdt,
            cmnd: req.body.cmnd,
            ngaySinh: new Date(req.body.ngaySinh),
            gioiTinh: req.body.gioiTinh,
            taiKhoan: {
                tenTaiKhoan: req.body.taiKhoan.tenTaiKhoan,
                matKhau: req.body.taiKhoan.matKhau
            },
            thongTinShop: {
                ten: '',
                lowerTen: '',
                diaChi: '',
                idShop: '',
                logoShop: '',
                keyPaypal: '',
                viShop: '',
                ngayTao: '',
                moTa: '',
                img: {
                    carousel: [],
                    banner1: '',
                    banner2: ''
                }
            },
            vaiTro: req.body.vaiTro,
            isLock: req.body.isLock,
            isDelete: req.body.isDelete
        }
        const saltRounds = 10;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        const allUser = await colUser.find({ isDelete: false }).toArray();
        let trungTaiKhoan = false;
        for (let index = 0; index < allUser.length; index++) {
            if (allUser[index].email === userThem.email) {
                trungTaiKhoan = true;
                break;
            }
        }

        let result;

        if (trungTaiKhoan === false) {
            bcrypt.hash(userThem.taiKhoan.matKhau, saltRounds, async function (err, hash) {
                userThem.taiKhoan.matKhau = hash;
                result = await colUser.insertOne(userThem);
                client.close();
                if (result.insertedCount > 0) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Thêm user thành công',
                    })
                } else {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Thêm user thất bại',
                    });
                }

            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Email này đã tồn tại. Vui lòng chọn email khác để đăng ký tài khoản',
            })
        }
    },

    TaoShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let shopThem = {
            _id: req.body._id,
            idShop: 'SHOP-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            lowerTen: BoDau(req.body.ten),
            diaChi: req.body.diaChi,
            logoShop: req.body.logoShop,
            keyPaypal: req.body.keyPaypal,
            viShop: req.body.viShop,
            ngayTao: new Date(req.body.ngayTao),
            moTa: req.body.moTa
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        const allShop = await colUser.find({}).toArray();
        var trungTenShop = false;

        for (let index = 0; index < allShop.length; index++) {
            console.log(allShop[index].thongTinShop);

            if (allShop[index].thongTinShop != undefined) {
                if (shopThem.ten === allShop[index].thongTinShop.ten) {
                    trungTenShop = true;
                    break;
                }
            }
        }

        if (trungTenShop) {
            res.status(200).json({
                status: 'fail',
                message: 'Tên shop này đã tồn tại'
            });
        } else {
            let result = await colUser.updateOne({ _id: ObjectId(shopThem._id) },
                {
                    $set:
                    {
                        thongTinShop: {
                            idShop: shopThem.idShop,
                            ten: shopThem.ten,
                            lowerTen: shopThem.lowerTen,
                            diaChi: shopThem.diaChi,
                            logoShop: shopThem.logoShop,
                            keyPaypal: shopThem.keyPaypal,
                            viShop: shopThem.viShop,
                            ngayTao: shopThem.ngayTao,
                            moTa: shopThem.moTa,
                            img: {
                                carousel: [],
                                banner1: '',
                                banner2: ''
                            },
                            isLock: true
                        },
                        vaiTro: 1
                    }
                });
            client.close();
            res.status(200).json({
                status: 'success',
                message: 'Sửa thành công'
            });
        }
    },

    SuaThietKeShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let thietKeShop = {
            _id: req.body._id,
            logo: req.body.logo,
            carousel: req.body.carousel,
            banner1: req.body.banner1,
            banner2: req.body.banner2
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result = await colUser.updateOne({ _id: ObjectId(thietKeShop._id) },
            {
                $set:
                {
                    'thongTinShop.logoShop': thietKeShop.logo,
                    'thongTinShop.img': {
                        carousel: thietKeShop.carousel,
                        banner1: thietKeShop.banner1,
                        banner2: thietKeShop.banner2
                    }
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },

    SuaThongTinShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let thongTinShop = {
            _id: req.body._id,
            ten: req.body.ten,
            lowerTen: BoDau(req.body.ten),
            diaChi: req.body.diaChi,
            moTa: req.body.moTa
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result = await colUser.updateOne({ _id: ObjectId(thongTinShop._id) },
            {
                $set:
                {
                    'thongTinShop.ten': thongTinShop.ten,
                    'thongTinShop.lowerTen': thongTinShop.lowerTen,
                    'thongTinShop.diaChi': thongTinShop.diaChi,
                    'thongTinShop.moTa': thongTinShop.moTa
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },

    SuaThongTinTaiKhoan: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const saltRounds = 10;
        let thongTinSua = {
            _id: req.body._id,
            hoTen: req.body.hoTen,
            lowerTen: BoDau(req.body.hoTen),
            gioiTinh: req.body.gioiTinh,
            ngaySinh: req.body.ngaySinh,
            matKhauMoi: req.body.matKhauMoi,
            trangThaiCapNhatMatKhau: req.body.trangThaiCapNhatMatKhau
        }

        console.log(thongTinSua)

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result;
        if (thongTinSua.trangThaiCapNhatMatKhau === false) {
            result = await colUser.updateOne({ _id: ObjectId(thongTinSua._id) },
                {
                    $set:
                    {
                        ten: thongTinSua.hoTen,
                        lowerTen: thongTinSua.lowerTen,
                        gioiTinh: thongTinSua.gioiTinh,
                        ngaySinh: thongTinSua.ngaySinh
                    }
                });
            client.close();
            res.status(200).json({
                status: 'success',
                message: 'Sửa thông tin thành công'
            });
        } else {
            bcrypt.hash(thongTinSua.matKhauMoi, saltRounds, async function (err, hash) {
                result = await colUser.updateOne({ _id: ObjectId(thongTinSua._id) },
                    {
                        $set:
                        {
                            ten: thongTinSua.hoTen,
                            lowerTen: thongTinSua.lowerTen,
                            gioiTinh: thongTinSua.gioiTinh,
                            ngaySinh: thongTinSua.ngaySinh,
                            'taiKhoan.matKhau': hash
                        }
                    });
                client.close();
                res.status(200).json({
                    status: 'success',
                    message: 'Sửa thông tin thành công'
                });
            })
        }
    },

    KiemTraDoiMatKhau: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const _id = req.query.idUser;
        const matKhauCu = req.query.matKhauCu;
        const matKhauMoi = req.query.matKhauMoi;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let result = await colUser.findOne({ _id: ObjectId(_id) });
        client.close();

        bcrypt.compare(matKhauCu, result.taiKhoan.matKhau, function (err, result) {
            if (result === true) {
                res.status(200).json({
                    status: 'success',
                    message: 'Tất cả hợp lệ'
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Mật khẩu cũ không hợp lệ'
                });
            }
        })
    },
}