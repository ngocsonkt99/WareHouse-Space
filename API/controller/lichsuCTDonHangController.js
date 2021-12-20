const { DbUrl, DbName, soItemMoiPageAdmin, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau } = require('../functionHoTro/index');

module.exports = {
    LayLichSuCTDonHang: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colLichSu = db.collection(orderhistorydetail);
        let allLichSu = await colLichSu.find({}).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allLichSu
        });
    },

    CapNhatLichSu: async function (req, res) {
        const idOrderDetail = req.body.idOrderDetail;
        const trangThai = req.body.trangThai;

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colLichSu = db.collection(orderhistorydetail);
        var ketqua = 0;
        //const dataLichSu = colLichSu.find({ idOrderDetail: idOrderDetail, trangThai: trangThai }).next();
        //console.log(dataLichSu);
        // if (dataLichSu.ngayThucHien === '') {

        // }
        if (trangThai === 1) {
            await colLichSu.updateOne({ idOrderDetail: idOrderDetail, trangThai: 1 }, {
                $set:
                {
                    ngayThucHien: new Date()
                }
            });
            ketqua += 1;
        } else {
            if (trangThai === 2) {
                await colLichSu.updateOne({ idOrderDetail: idOrderDetail, trangThai: 2 }, {
                    $set:
                    {
                        ngayThucHien: new Date()
                    }
                });
                ketqua += 1;
            } else {
                if (trangThai === 3) {
                    await colLichSu.updateOne({ idOrderDetail: idOrderDetail, trangThai: 3 }, {
                        $set:
                        {
                            ngayThucHien: new Date()
                        }
                    });
                    ketqua += 1;
                } else {
                    if (trangThai === 4) {
                        await colLichSu.updateOne({ idOrderDetail: idOrderDetail, trangThai: 4 }, {
                            $set:
                            {
                                ngayThucHien: new Date()
                            }
                        });
                        ketqua += 1;
                    } else {
                        await colLichSu.updateOne({ idOrderDetail: idOrderDetail, trangThai: 5 }, {
                            $set:
                            {
                                ngayThucHien: new Date()
                            }
                        });
                        ketqua += 1;
                    }
                }
            }
        }
        client.close();

        if (ketqua === 1) {
            res.status(200).json({
                status: 'success'
            });
        }
    }
}