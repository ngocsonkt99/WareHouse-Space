const { DbUrl, DbName, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');

module.exports = {
    LayDanhSachAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colLocal = db.collection(local);
        let allLocal = await colLocal.find({}).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: allLocal,
        });
    },

    LayQuanTheoIDThanhPho: async function (req, res) {
        var thanhPhoID = req.query.idThanhPho
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colLocal = db.collection(local);
        let result = await colLocal.find({ id: thanhPhoID }).next();
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
                data: result.districts
            });
        }
    },

    LayPhuongTheoIDQuan: async function (req, res) {
        var thanhPhoID = req.query.idThanhPho;
        var quanID = req.query.idQuan;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colLocal = db.collection(local);
        let resultThanhPho = await colLocal.find({ id: thanhPhoID }).next();
        var resultPhuong;
        client.close();
        if (resultThanhPho === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu cho Thành Phố'
            })
        } else {
            console.log('có dữ liệu thành phố')
            for (let index = 0; index < resultThanhPho.districts.length; index++) {
                if (resultThanhPho.districts[index].id === quanID) {
                    console.log('catch');
                    resultPhuong = resultThanhPho.districts[index];
                    // resultPhuong = resultThanhPho.districts[index].wards;
                }
            }
        }

        if (resultPhuong === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu'
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: resultPhuong.wards
            })
        }
    },

    LayTenThanhPhoQuanPhuongTheoID: async function (req, res) {
        var thanhPhoID = req.query.idThanhPho;
        var quanID = req.query.idQuan;
        var phuongID = req.query.idPhuong;

        var tenThanhPho = '';
        var tenQuan = '';
        var tenPhuong = '';

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colLocal = db.collection(local);
        let resultThanhPho = await colLocal.find({ id: thanhPhoID }).next();
        var resultPhuong = [];
        client.close();
        if (resultThanhPho === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu Thành Phố'
            })
        } else {
            tenThanhPho = resultThanhPho.name;
            for (let index = 0; index < resultThanhPho.districts.length; index++) {
                if (resultThanhPho.districts[index].id === quanID) {
                    tenQuan = resultThanhPho.districts[index].name;
                    resultPhuong = resultThanhPho.districts[index].wards;
                }
            }

            if (tenQuan.length === 0) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Không có dữ liệu Quận'
                })
            } else {
                for (let index = 0; index < resultPhuong.length; index++) {
                    if (resultPhuong[index].id === phuongID) {
                        console.log('catch Phường');
                        tenPhuong = resultPhuong[index].name;
                    }
                }

                if (tenPhuong.length === 0) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Không có dữ liệu Tổng'
                    })
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: 'Lấy dữ liệu thành công',
                        tenThanhPho: tenThanhPho,
                        tenQuan: tenQuan,
                        tenPhuong: tenPhuong
                    })
                }
            }
        }
    }
}