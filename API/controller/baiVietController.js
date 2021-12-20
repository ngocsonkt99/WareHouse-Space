const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau, shuffle, sapXepTuLonDenBe } = require('../functionHoTro/index');

module.exports = {
    ThemBaiViet: async function (req, res) {
        const baiVietThem2 = req.body.data;
        const baiVietThem = {
            idShow: 'POST-' + ids.generate().toUpperCase(),
            lowerTieuDe: BoDau(baiVietThem2.tieuDe),
            ...baiVietThem2
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection(News);

        let result2 = await colPost.findOne({ lowerTieuDe: baiVietThem.lowerTieuDe });

        if (result2 === null) {
            let result = await colPost.insertOne(baiVietThem);
            client.close();
            if (result.insertedCount > 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'Thêm thành công'
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Tạo bài viết mới thất bại !'
                })
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Tiêu đề bài viết này đã được đặt trước đó'
            })
        }
    },

    CapNhatLuotXemBaiViet: async function (req, res) {
        const id = req.body.id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection(News);

        let result = await colPost.findOneAndUpdate({ idShow: id }, { $inc: { "luotXem": 1 } })
        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Cập nhật thành công'
        });
    },

    LayBaiVietTheoID: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection(News);

        let result = await colPost.findOne({ idShow: id });
        client.close();

        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy dữ liệu thất bại'
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },

    LayBaiVietTheoID_Admin: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection(News);

        let result = await colPost.findOne({ _id: ObjectId(id) });
        client.close();

        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy dữ liệu thất bại'
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },

    LayBaiViet_ShowTrangChu: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection(News);

        let result = await colPost.find({ isDelete: false, isLock: false }).sort({ luotXem: -1 }).limit(18).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy dữ liệu thành công',
            data: result
        });
    },

    LayBaiViet_ShowAdmin: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const page = req.params.page;

        console.log(page)

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection(News);

        let allPost = await colPost.find({ isDelete: false }).toArray();
        let arrPost = await colPost.find({ isDelete: false }).sort({ _id: -1 }).limit(4).skip(page * 4).toArray();
        let soTrang = Math.ceil(parseInt(allPost.length) / 4);
        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy dữ liệu thành công',
            data: arrPost,
            soTrang: soTrang
        });
    },

    LayDanhSachBaiViet_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colPost = db.collection(News);
        let allPost = await colPost.find({
            isDelete: false, $or: [
                {
                    idShow: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    lowerTieuDe: {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).toArray();

        let arrPost = await colPost.find({
            isDelete: false, $or: [
                {
                    idShow: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    lowerTieuDe: {
                        '$regex': search,
                        '$options': '$i'
                    }
                }
            ]
        }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allPost.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrPost,
            soTrang: soTrang
        });
    },

    LayDanhSachBaiViet_ChuaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colPost = db.collection(News);
        let allPost = await colPost.find({ isDelete: false, isLock: false }).toArray();
        let soTrang = Math.ceil(parseInt(allPost.length) / SoItemMoiPageAdmin);
        let arrPost = await colPost.find({ isDelete: false, isLock: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrPost,
            soTrang: soTrang
        });
    },

    LayDanhSachBaiViet_DaKhoa_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colPost = db.collection(News);
        let allPost = await colPost.find({ isDelete: false, isLock: true }).toArray();
        let soTrang = Math.ceil(parseInt(allPost.length) / SoItemMoiPageAdmin);
        let arrPost = await colPost.find({ isDelete: false, isLock: true }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrPost,
            soTrang: soTrang
        });
    },

    XoaBaiViet: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let baiVietID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colPost = db.collection(News);
        let result = await colPost.updateOne({ _id: ObjectId(baiVietID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    KhoaBaiViet: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let baiVietID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colPost = db.collection(News);
        let result = await colPost.updateOne({ _id: ObjectId(baiVietID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaBaiViet: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let baiVietID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colPost = db.collection(News);
        let result = await colPost.updateOne({ _id: ObjectId(baiVietID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công !'
        });

    },

    SuaBaiViet: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let baiVietSua = {
            _id: ObjectId(req.body._id),
            tieuDe: req.body.tieuDe,
            lowerTieuDe: BoDau(req.body.tieuDe),
            img: req.body.img,
            content: req.body.content
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colPost = db.collection(News);
        let result = await colPost.updateOne({ _id: baiVietSua._id },
            {
                $set:
                {
                    tieuDe: baiVietSua.tieuDe,
                    lowerTieuDe: baiVietSua.lowerTieuDe,
                    img: baiVietSua.img,
                    content: baiVietSua.content
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}