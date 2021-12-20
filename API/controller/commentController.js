const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau, shuffle, sapXepTuLonDenBe } = require('../functionHoTro/index');
const { all } = require('../routes/heThong');

module.exports = {
    ThemComment: async function (req, res) {
        const commentThem = {
            soSao: req.body.soSao,
            tieuDe: req.body.tieuDe,
            noiDung: req.body.noiDung,
            traLoi: '',
            idUser: req.body.idUser,
            idProduct: req.body.idProduct,
            ngayTao: new Date(),
            ngayTraLoi: '',
            isAccept: false
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let result2 = await colComment.findOne({ idProduct: commentThem.idProduct, idUser: commentThem.idUser });
        if (result2 === null) {
            let result = await colComment.insertOne(commentThem);

            if (result.insertedCount > 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'Thêm thành công',
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Gửi nhận xét thất bại!',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Bạn đã nhận xét sản phẩm này trước đó',
            });
        }

    },

    LayCommentTheoIDSanPham_NguoiDung: async function (req, res) {
        const id = req.query.id;
        const option = parseInt(req.query.option);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        const colUser = db.collection(user);
        let allUser = await colUser.find({ vaiTro: { $ne: 0 } }).toArray();
        let arrComment;

        if (option === 0) {
            arrComment = await colComment.find({ idProduct: id, isAccept: true }).sort({ _id: -1 }).toArray();
        }

        if (option === 1) {
            arrComment = await colComment.find({ idProduct: id, isAccept: true, soSao: 5 }).sort({ _id: -1 }).toArray();
        }

        if (option === 2) {
            arrComment = await colComment.find({ idProduct: id, isAccept: true, soSao: 4 }).sort({ _id: -1 }).toArray();
        }

        if (option === 3) {
            arrComment = await colComment.find({ idProduct: id, isAccept: true, soSao: 3 }).sort({ _id: -1 }).toArray();
        }

        if (option === 4) {
            arrComment = await colComment.find({ idProduct: id, isAccept: true, soSao: 2 }).sort({ _id: -1 }).toArray();
        }

        if (option === 5) {
            arrComment = await colComment.find({ idProduct: id, isAccept: true, soSao: 1 }).sort({ _id: -1 }).toArray();
        }

        let arrUser = [];

        for (let index = 0; index < arrComment.length; index++) {
            for (let index2 = 0; index2 < allUser.length; index2++) {
                if (arrComment[index].idUser === allUser[index2]._id.toString()) {
                    arrUser.push(allUser[index2].ten);
                    break;
                }
            }
        }



        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrComment,
            dataUser: arrUser
        });

    },

    LayCommentTheoIDUser: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        const colProduct = db.collection(product);
        let arrComment = await colComment.find({ idUser: id }).sort({ _id: -1 }).toArray();

        let result = await colProduct.find({ isAccept: true, isDelete: false, isLock: false }).toArray();

        let arrProduct = [];

        for (let index = 0; index < arrComment.length; index++) {
            for (let index2 = 0; index2 < result.length; index2++) {
                if (result[index2].idShow === arrComment[index].idProduct) {
                    var thongTinThem = {
                        ten: result[index2].ten,
                        _id: result[index2]._id.toString(),
                        img: result[index2].img.chinh
                    }
                    arrProduct.push(thongTinThem);
                    break;
                }
            }
        }

        client.close();

        if (arrProduct.length === arrComment.length) {
            res.status(200).json({
                status: 'success',
                message: 'Lấy data thành công',
                data: arrComment,
                dataProduct: arrProduct
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy data thất bại'
            });
        }


    },

    LayDataSoSaoTheoIDSanPham: async function (req, res) {
        const id = req.query.id;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let arrComment = await colComment.find({ idProduct: id, isAccept: true }).toArray();

        var tongSao = 0;

        var count5sao = 0;
        var count4sao = 0;
        var count3sao = 0;
        var count2sao = 0;
        var count1sao = 0;

        for (let index = 0; index < arrComment.length; index++) {
            tongSao += arrComment[index].soSao;
            if (arrComment[index].soSao === 5) {
                count5sao += 1;
            }

            if (arrComment[index].soSao === 4) {
                count4sao += 1;
            }

            if (arrComment[index].soSao === 3) {
                count3sao += 1;
            }

            if (arrComment[index].soSao === 2) {
                count2sao += 1;
            }

            if (arrComment[index].soSao === 1) {
                count1sao += 1;
            }
        }

        var tbSao = tongSao / arrComment.length;

        var phanTram5sao = 0;
        var phanTram4sao = 0;
        var phanTram3sao = 0;
        var phanTram2sao = 0;
        var phanTram1sao = 0;

        if (count1sao > 0) {
            phanTram1sao = (count1sao / arrComment.length * 100).toFixed(1);
        }

        if (count2sao > 0) {
            phanTram2sao = (count2sao / arrComment.length * 100).toFixed(1);
        }

        if (count3sao > 0) {
            phanTram3sao = (count3sao / arrComment.length * 100).toFixed(1);
        }

        if (count4sao > 0) {
            phanTram4sao = (count4sao / arrComment.length * 100).toFixed(1);
        }

        if (count5sao > 0) {
            phanTram5sao = (count5sao / arrComment.length * 100).toFixed(1);
        }

        var arrPhanTram = [];
        arrPhanTram.push(phanTram5sao, phanTram4sao, phanTram3sao, phanTram2sao, phanTram1sao);

        client.close();

        res.status(200).json({
            status: 'success',
            data: arrComment,
            tbSao: tbSao,
            arrPhanTram: arrPhanTram
        });

    },

    LayCommentTheoIDSanPham_Admin: async function (req, res) {
        const page = req.params.page;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let allComment = await colComment.find({}).toArray();
        let arrComment = await colComment.find({}).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allComment.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrComment,
            soTrang: soTrang
        });

    },

    LayCommentTheoIDSanPham_TheoSearch_Admin: async function (req, res) {
        const page = req.params.page;
        const search = req.query.search;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let allComment = await colComment.find({
            idProduct: {
                '$regex': search,
                '$options': '$i'
            }
        }).toArray();

        let arrComment = await colComment.find({
            idProduct: {
                '$regex': search,
                '$options': '$i'
            }
        }).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allComment.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrComment,
            soTrang: soTrang
        });

    },

    LayCommentTheoIDSanPham_ChuaDuyet_Admin: async function (req, res) {
        const page = req.params.page;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let allComment = await colComment.find({ isAccept: false }).toArray();
        let arrComment = await colComment.find({ isAccept: false }).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allComment.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrComment,
            soTrang: soTrang
        });

    },

    LayCommentTheoIDSanPham_DaDuyet_Admin: async function (req, res) {
        const page = req.params.page;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let allComment = await colComment.find({ isAccept: true }).toArray();
        let arrComment = await colComment.find({ isAccept: true }).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allComment.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrComment,
            soTrang: soTrang
        });

    },

    LayCommentTheoID: async function (req, res) {
        const id = req.query.id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let result = await colComment.findOne({ _id: ObjectId(id) });

        client.close();

        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy data thất bại',
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy data thành công',
                data: result
            });
        }
    },

    SuaComment: async function (req, res) {
        const traLoi = req.body.traLoi;
        const id = req.body._id;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        let result = await colComment.updateOne({ _id: ObjectId(id) }, {
            $set:
            {
                traLoi: traLoi,
                ngayTraLoi: new Date()
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công',
            data: result
        });
    },

    DuyetComment: async function (req, res) {
        const id = req.body._id;
        const idProduct = req.body.idProduct;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server COMMENTS");
        const db = client.db(DbName);
        const colComment = db.collection(comment);
        const colProduct = db.collection(product);
        let result = await colComment.updateOne({ _id: ObjectId(id) }, {
            $set:
            {
                isAccept: true
            }
        });

        let arrComment = await colComment.find({ idProduct: idProduct, isAccept: true }).toArray();

        var tongSao = 0;

        for (let index = 0; index < arrComment.length; index++) {
            tongSao += arrComment[index].soSao;
        }

        var tbSao = tongSao / arrComment.length;

        tbSao = tbSao.toFixed(1);



        let result2 = await colProduct.updateOne({ idShow: idProduct }, {
            $set:
            {
                soSao: tbSao
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Duyệt thành công'
        });
    },
}