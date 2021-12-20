const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { DbUrl, DbName, soItemMoiPageAdmin, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');

module.exports = {
    LayDanhSachPhanLoaiTheoIDProduct: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productID = req.query.id_product;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const col = db.collection(producttype);
        let arr = await col.find({ idProduct: productID }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arr
        });
    },

    LayDanhSachPhanLoaiTheoIDProduct_MauSac: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productID = req.query.id_product;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const col = db.collection(producttype);
        let arr = await col.find({ idProduct: productID, nhomPhanLoai: 0 }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arr
        });
    },

    LayDanhSachPhanLoaiTheoIDProduct_Size: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productID = req.query.id_product;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const col = db.collection(producttype);
        let arr = await col.find({ idProduct: productID, nhomPhanLoai: 1 }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arr
        });
    },
}