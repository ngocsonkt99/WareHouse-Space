const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau, shuffle, sapXepTuLonDenBe } = require('../functionHoTro/index');

module.exports = {
    LayDanhSachVoucherTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let allVoucher = await colVoucher.find({}).toArray();
        let soTrang = Math.ceil(parseInt(allVoucher.length) / SoItemMoiPageAdmin);
        let arrVoucher = await colVoucher.find({}).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrVoucher,
            soTrang: soTrang
        });
    },

    LayDanhSachVoucher_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let allVoucher = await colVoucher.find({
            idShow: {
                '$regex': search,
                '$options': '$i'
            }
        }).toArray();

        let arrVoucher = await colVoucher.find({
            idShow: {
                '$regex': search,
                '$options': '$i'
            }
        }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allVoucher.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrVoucher,
            soTrang: soTrang
        });
    },

    LayDanhSachVoucher_ChuaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let allVoucher = await colVoucher.find({ isLock: false }).toArray();
        let soTrang = Math.ceil(parseInt(allVoucher.length) / SoItemMoiPageAdmin);
        let arrVoucher = await colVoucher.find({ isLock: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrVoucher,
            soTrang: soTrang
        });
    },

    LayDanhSachVoucher_DaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let allVoucher = await colVoucher.find({ isLock: true }).toArray();
        let soTrang = Math.ceil(parseInt(allVoucher.length) / SoItemMoiPageAdmin);
        let arrVoucher = await colVoucher.find({ isLock: true }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrVoucher,
            soTrang: soTrang
        });
    },

    LayDanhSachVoucherAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let allVoucher = await colVoucher.find({ isDelete: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allVoucher
        });
    },

    LayVoucherTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let voucherID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let result = await colVoucher.find({ _id: ObjectId(voucherID) }).next();
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

    LayVoucherTheoIDShow: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let voucherID = BoDau(req.query.idShow);
        await client.connect();
        var dateNow = new Date();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let result = await colVoucher.find({ idLower: voucherID, isLock: false }).next();
        client.close();
        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có Voucher này',
            })
        } else {
            if (result.ngayKetThuc < dateNow) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Voucher đã hết hạn',
                    data: result
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Đã kích hoạt Voucher',
                    data: result
                });
            }

        }
    },

    ThemVoucher: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let voucherThem = {
            idShow: req.body.idShow,
            idLower: BoDau(req.body.idShow),
            ten: req.body.ten,
            loaiGiamGia: req.body.loaiGiamGia,
            giaTriGiam: req.body.giaTriGiam,
            ngayBatDau: req.body.ngayBatDau,
            ngayKetThuc: req.body.ngayKetThuc,
            ngayTao: new Date(),
            isLock: false
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        const voucherTrung = await colVoucher.findOne({ idShow: voucherThem.idShow });

        if (voucherTrung === null) {
            let result = await colVoucher.insertOne(voucherThem);
            client.close();
            if (result.insertedCount > 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'Thêm thành công'
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Thêm thất bại!'
                })
            }
        } else {
            client.close();
            res.status(200).json({
                status: 'fail',
                message: 'Voucher này đã tồn tại'
            })
        }

    },

    KhoaVoucher: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let voucherID = req.body._id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let result = await colVoucher.updateOne({ _id: ObjectId(voucherID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaVoucher: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let voucherID = req.body._id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection(voucher);
        let result = await colVoucher.updateOne({ _id: ObjectId(voucherID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },
}