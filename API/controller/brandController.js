const { DbUrl, DbName, soItemMoiPageAdmin, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau } = require('../functionHoTro/index');

module.exports = {
    LayDanhSachBrandTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let allBrand = await colBrand.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allBrand.length) / SoItemMoiPageAdmin);
        let arrBrand = await colBrand.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrBrand,
            soTrang: soTrang
        });
    },

    LayDanhSachBrand_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let allBrand = await colBrand.find({
            isDelete: false, $or: [
                {
                    idShow: {
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

        let arrBrand = await colBrand.find({
            isDelete: false, $or: [
                {
                    idShow: {
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
        let soTrang = Math.ceil(parseInt(allBrand.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrBrand,
            soTrang: soTrang
        });
    },

    LayDanhSachBrand_ChuaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let allBrand = await colBrand.find({ isDelete: false, isLock: false }).toArray();
        let soTrang = Math.ceil(parseInt(allBrand.length) / SoItemMoiPageAdmin);
        let arrBrand = await colBrand.find({ isDelete: false, isLock: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrBrand,
            soTrang: soTrang
        });
    },

    LayDanhSachBrand_DaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let allBrand = await colBrand.find({ isDelete: false, isLock: true }).toArray();
        let soTrang = Math.ceil(parseInt(allBrand.length) / SoItemMoiPageAdmin);
        let arrBrand = await colBrand.find({ isDelete: false, isLock: true }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrBrand,
            soTrang: soTrang
        });
    },

    LayDanhSachBrandAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let allBrand = await colBrand.find({ isDelete: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allBrand
        });
    },

    LayBrandTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let brandID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let result = await colBrand.find({ _id: ObjectId(brandID) }).next();
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

    ThemBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let brandThem = {
            idShow: 'BRAND-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            lowerTen: BoDau(req.body.ten),
            img: req.body.img,
            xuatXu: req.body.xuatXu,
            ngayTao: new Date(),
            isLock: false,
            isDelete: false
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        const brandTrung = await colBrand.findOne({ lowerTen: brandThem.lowerTen });

        if (brandTrung === null) {
            let result = await colBrand.insertOne(brandThem);
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
                message: 'Tên thương hiệu đã được đặt trước đó'
            })
        }

    },

    XoaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let brandID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let result = await colBrand.updateOne({ _id: ObjectId(brandID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    KhoaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let brandID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let result = await colBrand.updateOne({ _id: ObjectId(brandID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let brandID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let result = await colBrand.updateOne({ _id: ObjectId(brandID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công !'
        });

    },

    SuaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let brandSua = {
            _id: ObjectId(req.body._id),
            ten: req.body.ten,
            xuatXu: req.body.xuatXu,
            img: req.body.img
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection(brands);
        let result = await colBrand.updateOne({ _id: ObjectId(brandSua._id) },
            {
                $set:
                {
                    ten: brandSua.ten,
                    xuatXu: brandSua.xuatXu,
                    img: brandSua.img
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}