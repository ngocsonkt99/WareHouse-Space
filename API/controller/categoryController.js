const { DbUrl, DbName, soItemMoiPageAdmin, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local} = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau } = require('../functionHoTro/index');

module.exports = {
    LayDanhSachCategoryTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let allCategory = await colCategory.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allCategory.length) / SoItemMoiPageAdmin);
        let arrCategory = await colCategory.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrCategory,
            soTrang: soTrang
        });
    },

    LayDanhSachCategory_ChuaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let allCategory = await colCategory.find({ isDelete: false, isLock: false }).toArray();
        let soTrang = Math.ceil(parseInt(allCategory.length) / SoItemMoiPageAdmin);
        let arrCategory = await colCategory.find({ isDelete: false, isLock: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrCategory,
            soTrang: soTrang
        });
    },

    LayDanhSachCategory_DaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let allCategory = await colCategory.find({ isDelete: false, isLock: true }).toArray();
        let soTrang = Math.ceil(parseInt(allCategory.length) / SoItemMoiPageAdmin);
        let arrCategory = await colCategory.find({ isDelete: false, isLock: true }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrCategory,
            soTrang: soTrang
        });
    },

    LayDanhSachCategoryAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let allCategory = await colCategory.find({ isDelete: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allCategory
        });
    },

    LayDanhSachCategoryChuaKhoa: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let allCategory = await colCategory.find({ isDelete: false, isLock: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allCategory
        });
    },

    LayCategoryTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let result = await colCategory.find({ _id: ObjectId(categoryID) }).next();
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

    LayCategoryTheoIDSanPham: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProducts = db.collection(product);
        const colCategory = db.collection(category);
        let product = await colProducts.findOne({ _id: ObjectId(productID) });
        let allCategory = await colCategory.find({}).toArray();

        if (product === null) {
            client.close();
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            // console.log(product.idCategory)
            let arrCategory = [];
            for (let index = 0; index < product.idCategory.length; index++) {
                for (let index2 = 0; index2 < allCategory.length; index2++) {
                    if (product.idCategory[index] === allCategory[index2]._id.toString()) {
                        arrCategory.push(allCategory[index2]);
                        break;
                    }
                }
            }
            client.close();
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: arrCategory
            })
        }
    },

    LayDanhSachCategory_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let allCategory = await colCategory.find({
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

        let arrCategory = await colCategory.find({
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
        let soTrang = Math.ceil(parseInt(allCategory.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrCategory,
            soTrang: soTrang
        });
    },

    LayDanhSachCategory_Search_NguoiDung: async function (req, res) {
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        const colProduct = db.collection(product);

        let arrCategory = await colCategory.find({ isDelete: false, lowerTen: { '$regex': search, '$options': '$i' } }).toArray();

        let arrCount = [];
        for (let index = 0; index < arrCategory.length; index++) {
            let arrProduct = await colProduct.find({ idCategory: arrCategory[index]._id.toString() }).toArray();
            arrCount.push(arrProduct.length);

        }
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrCategory,
            dataCount: arrCount
        });
    },

    ThemCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryThem = {
            idShow: 'CATE-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            lowerTen: BoDau(req.body.ten),
            icon: req.body.icon,
            ngayTao: new Date(),
            idParen: req.body.idparen,
            isLock: true,
            isDelete: false
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);

        let result2 = await colCategory.findOne({ lowerTen: categoryThem.lowerTen });

        if (result2 === null) {
            let result = await colCategory.insertOne(categoryThem);
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
                message: 'Tên danh mục này đã được đặt từ trước đó'
            })
        }


    },

    XoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categoryID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let result = await colCategory.updateOne({ _id: ObjectId(categoryID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    KhoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categoryID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let result = await colCategory.updateOne({ _id: ObjectId(categoryID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categoryID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let result = await colCategory.updateOne({ _id: ObjectId(categoryID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công !'
        });

    },

    SuaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categorySua = {
            _id: ObjectId(req.body._id),
            ten: req.body.ten,
            icon: req.body.icon
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection(category);
        let result = await colCategory.updateOne({ _id: ObjectId(categorySua._id) },
            {
                $set:
                {
                    ten: categorySua.ten,
                    icon: categorySua.icon
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}