const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau, shuffle, sapXepTuLonDenBe } = require('../functionHoTro/index');

module.exports = {
    ThemCauHoi: async function (req, res) {
        const cauHoiThem = {
            question: req.body.question,
            answer: '',
            luotThich: 0,
            idUsersThich: [],
            ngayTao: new Date(),
            ngayTraLoi: '',
            idProduct: req.body.id,
            isAccept: false
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        var cauHoiTrung = false;
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let arrQuestAnswer = await colQuestAnswer.find({ idProduct: cauHoiThem.idProduct }).toArray();
        for (let index = 0; index < arrQuestAnswer.length; index++) {
            if (cauHoiThem.question === arrQuestAnswer[index].question) {
                cauHoiTrung = true;
                break;
            }
        }

        if (cauHoiTrung) {
            client.close();
            res.status(200).json({
                status: 'fail',
                message: 'Câu hỏi này đã được hỏi trước đó'
            });
        } else {
            let result = await colQuestAnswer.insertOne(cauHoiThem);
            client.close();
            if (result.insertedCount > 0) {
                res.status(200).json({
                    status: 'success',
                    message: 'Thêm câu hỏi thành công'
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Gửi câu hỏi thất bại'
                });
            }
        }
    },

    LayCauHoiTheoIDSanPham_NguoiDung: async function (req, res) {
        const id = req.query.id;
        const idUser = req.query.idUser;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let arrQuestAnswer = await colQuestAnswer.find({ idProduct: id, isAccept: true }).sort({ luotThich: -1 }).toArray();
        let arrLuotThich = [];
        if (idUser !== undefined) {
            for (let index = 0; index < arrQuestAnswer.length; index++) {
                var temp = 0
                for (let index2 = 0; index2 < arrQuestAnswer[index].idUsersThich.length; index2++) {
                    if (arrQuestAnswer[index].idUsersThich[index2] === idUser) {
                        arrLuotThich.push(1);
                        temp = 1;
                        break;
                    }
                }

                if (temp === 0) {
                    arrLuotThich.push(0);
                }
            }
        }

        console.log(arrLuotThich);
        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrQuestAnswer,
            dataThich: arrLuotThich
        });

    },

    LayCauHoiTheoIDSanPham_Admin: async function (req, res) {
        const page = req.params.page;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let allQuestAnswer = await colQuestAnswer.find({}).toArray();
        let arrQuestAnswer = await colQuestAnswer.find({}).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allQuestAnswer.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrQuestAnswer,
            soTrang: soTrang
        });

    },

    LayCauHoiTheoIDSanPham_TheoSearch_Admin: async function (req, res) {
        const page = req.params.page;
        const search = req.query.search;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let allQuestAnswer = await colQuestAnswer.find({
            idProduct: {
                '$regex': search,
                '$options': '$i'
            }
        }).toArray();

        let arrQuestAnswer = await colQuestAnswer.find({
            idProduct: {
                '$regex': search,
                '$options': '$i'
            }
        }).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allQuestAnswer.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrQuestAnswer,
            soTrang: soTrang
        });

    },

    LayCauHoiTheoIDSanPham_ChuaDuyet_Admin: async function (req, res) {
        const page = req.params.page;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let allQuestAnswer = await colQuestAnswer.find({ isAccept: false }).toArray();
        let arrQuestAnswer = await colQuestAnswer.find({ isAccept: false }).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allQuestAnswer.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrQuestAnswer,
            soTrang: soTrang
        });

    },

    LayCauHoiTheoIDSanPham_DaDuyet_Admin: async function (req, res) {
        const page = req.params.page;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let allQuestAnswer = await colQuestAnswer.find({ isAccept: true }).toArray();
        let arrQuestAnswer = await colQuestAnswer.find({ isAccept: true }).sort({ _id: -1 }).limit(4).skip(4 * page).toArray();

        let soTrang = Math.ceil(parseInt(allQuestAnswer.length) / 4);

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: arrQuestAnswer,
            soTrang: soTrang
        });

    },

    LayCauHoiTheoID: async function (req, res) {
        const id = req.query.id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let result = await colQuestAnswer.findOne({ _id: ObjectId(id) });

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

    SuaCauHoi: async function (req, res) {
        const answer = req.body.answer;
        const id = req.body._id;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let result = await colQuestAnswer.updateOne({ _id: ObjectId(id) }, {
            $set:
            {
                answer: answer,
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

    DuyetCauHoi: async function (req, res) {
        const id = req.body._id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let result = await colQuestAnswer.updateOne({ _id: ObjectId(id) }, {
            $set:
            {
                isAccept: true
            }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Duyệt thành công'
        });
    },

    CapNhatThich: async function (req, res) {
        const idCauHoi = req.body.idCauHoi;
        const idUser = req.body.idUser;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server QUESTANSWER");
        const db = client.db(DbName);
        const colQuestAnswer = db.collection(question);
        let result = await colQuestAnswer.updateOne({ _id: ObjectId(idCauHoi) }, {
            $push: { 'idUsersThich': idUser },
            $inc: { 'luotThich': 1 }
        });

        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Thích thành công'
        });
    },
}