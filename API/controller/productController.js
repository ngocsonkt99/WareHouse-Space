const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, soItemMoiPageCategory,voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau, shuffle, sapXepTuLonDenBe } = require('../functionHoTro/index');

module.exports = {
    LayDanhSachProductTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPageAdmin);
        let arrProduct = await colProduct.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayDanhSachProduct_Search_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({
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

        let arrProduct = await colProduct.find({
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
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPham_Search_NguoiDung_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const search = BoDau(req.query.search);
        const order = req.query.order;
        const rating = req.query.rating;
        const price = req.query.price;

        console.log(search);
        console.log(order);
        console.log(rating);
        console.log(price);

        var prices = price.split(',');

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct;
        let arrProduct;
        let soTrang;

        if (order === 'newest' || order === 'top_seller' || order === 'price_asc' || order === 'price_desc') {
            allProduct = await colProduct.find({
                isDelete: false, isLock: false, isAccept: true, lowerTen: { '$regex': search, '$options': '$i' }
            }).toArray();

            if (order === 'newest') {
                arrProduct = await colProduct.find({
                    isDelete: false, isLock: false, isAccept: true, lowerTen: { '$regex': search, '$options': '$i' }
                }).sort({ _id: -1 }).limit(16).skip(16 * page).toArray();
            }

            if (order === 'top_seller') {
                arrProduct = await colProduct.find({
                    isDelete: false, isLock: false, isAccept: true, lowerTen: { '$regex': search, '$options': '$i' }
                }).sort({ soLuongDaBan: -1 }).limit(16).skip(16 * page).toArray();
            }

            if (order === 'price_asc') {
                arrProduct = await colProduct.find({
                    isDelete: false, isLock: false, isAccept: true, lowerTen: { '$regex': search, '$options': '$i' }
                }).limit(16).skip(16 * page).toArray();
                arrProduct.sort(sapXepTheoGiaCuoiCungThapDenCao);

            }

            if (order === 'price_desc') {
                arrProduct = await colProduct.find({
                    isDelete: false, isLock: false, isAccept: true, lowerTen: { '$regex': search, '$options': '$i' }
                }).limit(16).skip(16 * page).toArray();
                arrProduct.sort(sapXepTheoGiaCuoiCungCaoDenThap);
            }
        }

        if (order === 'discount') {
            allProduct = await colProduct.find({
                isDelete: false, isLock: false, isAccept: true, giaTriGiamGia: { $ne: 0 }, lowerTen: { '$regex': search, '$options': '$i' }
            }).toArray();

            arrProduct = await colProduct.find({
                isDelete: false, isLock: false, isAccept: true, giaTriGiamGia: { $ne: 0 }, lowerTen: { '$regex': search, '$options': '$i' }
            }).sort({ _id: -1 }).limit(16).skip(16 * page).toArray();
        }

        if (rating !== 'undefined' && price === 'undefined') {
            let allProduct2 = allProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating);
            let arrProduct2 = arrProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating);

            allProduct = allProduct2;
            arrProduct = arrProduct2;
        } else {
            if (rating === 'undefined' && price !== 'undefined') {
                let allProduct2 = allProduct.filter(data => data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));
                let arrProduct2 = arrProduct.filter(data => data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));

                allProduct = allProduct2;
                arrProduct = arrProduct2;
            } else {
                if (rating !== 'undefined' && price !== 'undefined') {
                    let allProduct2 = allProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating && data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));
                    let arrProduct2 = arrProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating && data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));
                    allProduct = allProduct2;
                    arrProduct = arrProduct2;
                }
            }
        }



        soTrang = Math.ceil(parseInt(allProduct.length) / 16);

        console.log(soTrang);

        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            dataAll: allProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoCategory_NguoiDung_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const id = req.query.id;
        const rating = req.query.rating;
        const price = req.query.price;

        console.log(id);
        console.log(rating);
        console.log(price);

        var prices = price.split(',');

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ idCategory: id, isDelete: false, isLock: false, isAccept: true }).toArray();;
        let arrProduct = await colProduct.find({ idCategory: id, isDelete: false, isLock: false, isAccept: true }).sort({ _id: -1 }).limit(16).skip(16 * page).toArray();
        let soTrang;


        if (rating !== 'undefined' && price === 'undefined') {
            let allProduct2 = allProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating);
            let arrProduct2 = arrProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating);

            allProduct = allProduct2;
            arrProduct = arrProduct2;
        } else {
            if (rating === 'undefined' && price !== 'undefined') {
                let allProduct2 = allProduct.filter(data => data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));
                let arrProduct2 = arrProduct.filter(data => data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));

                allProduct = allProduct2;
                arrProduct = arrProduct2;
            } else {
                if (rating !== 'undefined' && price !== 'undefined') {
                    let allProduct2 = allProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating && data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));
                    let arrProduct2 = arrProduct.filter(data => data.soSao > rating - 0.5 && data.soSao <= rating && data.giaCuoiCung >= parseInt(prices[0]) && data.giaCuoiCung <= parseInt(prices[1]));
                    allProduct = allProduct2;
                    arrProduct = arrProduct2;
                }
            }
        }

        soTrang = Math.ceil(parseInt(allProduct.length) / 16);

        // console.log(arrProduct);

        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayDanhSachProductTheoTrang_ShowPage: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPage);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPage);
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).sort({ _id: -1 }).limit(SoItemMoiPage).skip(SoItemMoiPage * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            status2: 'success2',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayDanhSachProduct_ShowPage_TheoTrang: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPageCategory);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPage);
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).sort({ _id: -1 }).limit(SoItemMoiPage).skip(SoItemMoiPage * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayDanhSachProductAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isAccept: true, isLock: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allProduct
        });
    },

    LayDanhSachProductTheoIDBaiViet: async function (req, res) {
        const id = req.query.id;
        const page = req.params.page
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        const colPost = db.collection(News);

        const result = await colPost.findOne({ idShow: id });
        let allProduct = await colProduct.find({ isDelete: false, isAccept: true, isLock: false }).toArray();
        client.close();
        let arrProduct = [];

        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy danh sách sản phẩm theo bài viết thất bại'
            });
        } else {
            for (let index = 0; index < result.idProducts.length; index++) {
                for (let index2 = 0; index2 < allProduct.length; index2++) {
                    if (result.idProducts[index] === allProduct[index2]._id.toString()) {
                        arrProduct.push(allProduct[index2]);
                        break;
                    }
                }
            }

            res.status(200).json({
                status: 'success',
                data: arrProduct,
                message: 'Lấy danh sách sản phẩm theo bài viết thất bại'
            });
        }



    },

    LayProductTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.find({ _id: ObjectId(productID) }).next();
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

    LayDanhSachProductDangGiamGia_ShowPage: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPage);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true, giaTriGiamGia: { $ne: 0 } }).sort({ _id: -1 }).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray();
        let soTrang = Math.ceil(parseInt(arrProduct.length) / SoItemMoiPage);
        client.close();
        res.status(200).json({
            status: 'success',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayDanhSachProductGiamGia_TheoShop: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const shopID = req.query.shopID;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID, giaTriGiamGia: { $ne: 0 } }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, giaTriGiamGia: { $ne: 0 } }).sort({ _id: -1 }).limit(SoItemMoiPage).skip(SoItemMoiPage * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPage);
        client.close();
        console.log(soTrang)
        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayDanhSachProductKhongGiamGia_TheoShop: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const shopID = req.query.shopID;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID, giaTriGiamGia: 0 }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, giaTriGiamGia: 0 }).sort({ _id: -1 }).limit(SoItemMoiPage).skip(SoItemMoiPage * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPage);
        client.close();
        console.log(soTrang)
        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayDanhSachProductDangGiamGia_ShowAll_TheoTrang: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPageCategory);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true, giaTriGiamGia: { $ne: 0 } }).sort({ _id: -1 }).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray();
        let soTrang = Math.ceil(parseInt(arrProduct.length) / SoItemMoiPage);
        client.close();
        res.status(200).json({
            status: 'success',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDCategoryTheoTrang: async function (req, res) {
        var SoItemMoiPageCategory = parseInt(soItemMoiPageCategory);
        const page = req.params.page;
        const categoryID = req.query.idCategory;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true, idCategory: categoryID }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPageCategory);
        let arrProduct = await colProduct.find({ isDelete: false, idCategory: categoryID, isLock: false, isAccept: true }).sort({ _id: -1 }).limit(soItemMoiPageCategory).skip(soItemMoiPageCategory * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShopTheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShopTheoTrang_ShowPage: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: true }).sort({ _id: -1 }).limit(soItemMoiPageCategory).skip(soItemMoiPageCategory * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageCategory);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_Search_ChuShop_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.shopID;
        const search = BoDau(req.query.search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({
            isDelete: false, idShop: shopID, $or: [
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

        let arrProduct = await colProduct.find({
            isDelete: false, idShop: shopID, $or: [
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
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_ChuaDuyet_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: false }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: false }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_DaDuyet_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: true }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: true }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_DaKhoa_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID, isLock: true }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isLock: true }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_TheoOptionKho_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const option = parseInt(req.query.option);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID, isLock: false }).toArray();
        let allProductConTrongKho = [];
        let allProductDaHetHang = [];
        for (let index = 0; index < allProduct.length; index++) {
            if (allProduct[index].soLuongDaBan < allProduct[index].soLuong) {
                allProductConTrongKho.push(allProduct[index]);
            } else {
                allProductDaHetHang.push(allProduct[index]);
            }
        }
        client.close();

        if (option === 1) {
            res.status(200).json({
                status: 'success',
                data: allProductConTrongKho
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: allProductDaHetHang
            });
        }
    },

    LayTatCaSanPhamTheoIDShop_ChuaKhoa_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID, isLock: false }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isLock: false }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPham_ChuaDuyet_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isAccept: false }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, isAccept: false }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPham_DaDuyet_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isAccept: true }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, isAccept: true }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPham_DaKhoa_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isLock: true }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, isLock: true }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPham_ChuaKhoa_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let allProduct = await colProduct.find({ isDelete: false, isLock: false }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    ThemProduct_ChuShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        var giaCuoiCung = 0;
        if (req.body.giaTriGiamGia > 100) {
            giaCuoiCung = req.body.gia - req.body.giaTriGiamGia;
        } else {
            giaCuoiCung = req.body.gia * (100 - req.body.giaTriGiamGia) / 100;
        }

        const arrMoTaClient = req.body.moTaNganGon;
        var arrMoTaNganGon = [];

        for (let index = 0; index < arrMoTaClient.length; index++) {
            if (arrMoTaClient[index] !== null) {
                arrMoTaNganGon.push(arrMoTaClient[index]);
            }

        }


        let productThem = {
            idShow: 'PRODU-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            lowerTen: BoDau(req.body.ten),
            img: {
                chinh: req.body.img.chinh,
                phu: req.body.img.phu,
                moTaChiTiet: req.body.img.moTaChiTiet
            },
            gia: req.body.gia,
            noiSanXuat: req.body.noiSanXuat,
            moTa: req.body.moTa,
            moTaNganGon: arrMoTaNganGon,
            soSao: req.body.soSao,
            giaTriGiamGia: req.body.giaTriGiamGia,
            giaCuoiCung: giaCuoiCung,
            soLuong: req.body.soLuong,
            soLuongDaBan: 0,
            thongTinBaoHanh: {
                baoHanh: req.body.thongTinBaoHanh.baoHanh,
                loaiBaoHanh: req.body.thongTinBaoHanh.loaiBaoHanh,
                thoiGianBaoHanh: req.body.thongTinBaoHanh.thoiGianBaoHanh,
                donViBaoHanh: req.body.thongTinBaoHanh.donViBaoHanh
            },
            ngayTao: new Date(req.body.ngayTao),
            idBrand: req.body.idBrand,
            idCategory: req.body.idCategory,
            idUser: [],
            idShop: req.body.idShop,
            idEvent: req.body.idEvent,
            isAccept: req.body.isAccept,
            isLock: req.body.isLock,
            isDelete: req.body.isDelete
        }

        let phanLoaiThem = {
            mauSac: {
                mauSac1: req.body.phanLoai.mauSac.mauSac1,
                mauSac2: req.body.phanLoai.mauSac.mauSac2,
                mauSac3: req.body.phanLoai.mauSac.mauSac3,
                mauSac4: req.body.phanLoai.mauSac.mauSac4
            },
            size: {
                size1: req.body.phanLoai.size.size1,
                size2: req.body.phanLoai.size.size2,
                size3: req.body.phanLoai.size.size3,
                size4: req.body.phanLoai.size.size4
            }
        }

        let dataPhanLoaiMauSac = [];
        let dataPhanLoaiSize = [];
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac1);
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac2);
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac3);
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac4);
        dataPhanLoaiSize.push(phanLoaiThem.size.size1);
        dataPhanLoaiSize.push(phanLoaiThem.size.size2);
        dataPhanLoaiSize.push(phanLoaiThem.size.size3);
        dataPhanLoaiSize.push(phanLoaiThem.size.size4);

        var countMauSac1 = 0;
        var countSize1 = 0;

        var countMauSac2 = 0;
        var countSize2 = 0;

        for (let index = 0; index < dataPhanLoaiMauSac.length; index++) {
            if (dataPhanLoaiMauSac[index].length > 0) {
                countMauSac2 += 1;
            }
        }

        for (let index = 0; index < dataPhanLoaiSize.length; index++) {
            if (dataPhanLoaiSize[index].length > 0) {
                countSize2 += 1;
            }
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        const colProductClassify = db.collection(producttype);
        const allProduct = await colProduct.find({}).toArray();

        var trungTen = false;

        for (let index = 0; index < allProduct.length; index++) {
            if (productThem.ten === allProduct[index].ten) {
                trungTen = true;
                break;
            }
        }

        if (trungTen) {
            client.close();
            res.status(200).json({
                status: 'fail',
                message: 'Tên sản phẩm này đã tồn tại'
            })
        } else {
            let result1 = await colProduct.insertOne(productThem);
            if (result1.insertedCount > 0) {
                console.log('Thêm sản phẩm thành công');
                for (let index = 0; index < dataPhanLoaiMauSac.length; index++) {
                    if (dataPhanLoaiMauSac[index].length > 0) {
                        await colProductClassify.insertOne({
                            'nhomPhanLoai': 0, 'tenPhanLoai': dataPhanLoaiMauSac[index], 'idProduct': productThem.idShow
                        })
                        countMauSac1 += 1;
                    }
                }

                for (let index = 0; index < dataPhanLoaiSize.length; index++) {
                    if (dataPhanLoaiSize[index].length > 0) {
                        await colProductClassify.insertOne({
                            'nhomPhanLoai': 1, 'tenPhanLoai': dataPhanLoaiSize[index], 'idProduct': productThem.idShow
                        })
                        countSize1 += 1;
                    }
                }

                client.close();

                if (countMauSac1 === countMauSac2 && countSize1 === countSize2) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Thêm thành công'
                    })
                }
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Thêm thất bại!'
                })
            }
        }
    },

    XoaProduct_ChuShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let productID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.updateOne({ _id: ObjectId(productID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    CapNhatSoLuong: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let productID = req.body.id;
        let soLuongThem = req.body.soLuongThem;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.findOneAndUpdate({ _id: ObjectId(productID) }, { $inc: { "soLuong": soLuongThem } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Cập nhật thành công !'
        });

    },

    CapNhatGiaTriGiamGia: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        const productID = req.body.id;
        const giaTriGiamGia = req.body.giaTriGiamGia;
        const gia = req.body.gia;

        var giaCuoiCung = 0;

        if (giaTriGiamGia > 100) {
            giaCuoiCung = gia - giaTriGiamGia;
        } else {
            giaCuoiCung = gia * (100 - giaTriGiamGia) / 100;
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.updateOne({ _id: ObjectId(productID) }, { $set: { giaTriGiamGia: giaTriGiamGia, giaCuoiCung: giaCuoiCung } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Cập nhật thành công !'
        });

    },

    CapNhatNguoiXem: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        const productID = req.body.id;
        const userID = req.body.idUser;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result2 = await colProduct.findOne({ _id: ObjectId(productID), idUser: userID });
        if (result2 === null) {
            let result = await colProduct.updateOne({ _id: ObjectId(productID) }, { $push: { idUser: userID } });
            client.close();
            res.status(200).json({
                status: 'success',
                message: 'Cập nhật thành công'
            });
        } else {
            client.close();
            res.status(200).json({
                status: 'success',
                message: 'Đã cập nhật user này!'
            });
        }
    },

    DuyetSanPham: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let productID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.updateOne({ _id: ObjectId(productID) }, { $set: { isAccept: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Duyệt sản phẩm thành công !'
        });

    },

    KhoaSanPham: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let productID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.updateOne({ _id: ObjectId(productID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa sản phẩm thành công !'
        });

    },

    MoKhoaSanPham: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let productID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.updateOne({ _id: ObjectId(productID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa sản phẩm thành công !'
        });

    },

    SuaProduct_ChuShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productSua = {
            _id: ObjectId(req.body._id),
            ten: req.body.ten,
            img: {
                chinh: req.body.img.chinh,
                phu: req.body.img.phu,
                moTaChiTiet: req.body.img.moTaChiTiet
            },
            gia: req.body.gia,
            noiSanXuat: req.body.noiSanXuat,
            moTa: req.body.moTa,
            moTaNganGon: req.body.moTaNganGon,
            soSao: req.body.soSao,
            giaTriGiamGia: req.body.giaTriGiamGia,
            soLuong: req.body.soLuong,
            thongTinBaoHanh: {
                baoHanh: req.body.thongTinBaoHanh.baoHanh,
                loaiBaoHanh: req.body.thongTinBaoHanh.loaiBaoHanh,
                thoiGianBaoHanh: req.body.thongTinBaoHanh.thoiGianBaoHanh,
                donViBaoHanh: req.body.thongTinBaoHanh.donViBaoHanh
            },
            idBrand: req.body.idBrand,
            idCategory: req.body.idCategory,
            isLock: req.body.isLock,
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.updateOne({ _id: ObjectId(productSua._id) },
            {
                $set:
                {
                    ten: productSua.ten,
                    img: {
                        chinh: productSua.img.chinh,
                        phu: productSua.img.phu,
                        moTaChiTiet: productSua.img.moTaChiTiet
                    },
                    gia: productSua.gia,
                    noiSanXuat: productSua.noiSanXuat,
                    moTa: productSua.moTa,
                    moTaNganGon: productSua.moTaNganGon,
                    soSao: productSua.soSao,
                    giaTriGiamGia: productSua.giaTriGiamGia,
                    soLuong: productSua.soLuong,
                    thongTinBaoHanh: {
                        baoHanh: productSua.thongTinBaoHanh.baoHanh,
                        loaiBaoHanh: productSua.thongTinBaoHanh.loaiBaoHanh,
                        thoiGianBaoHanh: productSua.thongTinBaoHanh.thoiGianBaoHanh,
                        donViBaoHanh: productSua.thongTinBaoHanh.donViBaoHanh
                    },
                    idBrand: productSua.idBrand,
                    idCategory: productSua.idCategory,
                    isLock: productSua.isLock
                }
            });
        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    },

    KiemTraKho: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.query.id;
        console.log(id);
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.findOne({ idShow: id });
        client.close()
        if (result.soLuongDaBan < result.soLuong) {
            console.log('ok');
            res.status(200).json({
                status: 'success',
                message: 'Còn hàng'
            });
        } else {
            console.log('no');
            res.status(200).json({
                status: 'fail',
                message: 'Hết hàng'
            });
        }
    },

    LayDataProductDaXem_TheoIDUser: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const id = req.query.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        let result = await colProduct.find({ idUser: id, isDelete: false, isLock: false, isAccept: true }).toArray();
        client.close()
        res.status(200).json({
            status: 'success',
            message: 'Lấy data thành công',
            data: result
        });
    },

    Top10SanPhamBanChayNhatTheoDoanhThu: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colProduct.find({ idShop: shopID }).toArray();
        let result2 = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        let arrThongTin = [];

        for (let index1 = 0; index1 < result.length; index1++) {
            var thongTin = {
                tenSanPham: result[index1].ten,
                img: result[index1].img.chinh,
                tongTienBanDuoc: 0,
                soLuongDaBan: result[index1].soLuongDaBan,
                soDonHang: 0
            }
            for (let index2 = 0; index2 < result2.length; index2++) {
                if (result2[index2].ten === result[index1].ten) {
                    thongTin.tongTienBanDuoc += result2[index2].thanhTien;
                    thongTin.soDonHang += 1;
                }
            }
            arrThongTin.push(thongTin);
        }

        arrThongTin.sort(sapXepTheoDoanhThu);

        client.close();
        res.status(200).json({
            status: 'success',
            data: arrThongTin,
            message: 'Đã lấy được data top 10 sản phẩm bán chạy nhất theo doanh thu thành công'
        });
    },

    Top10SanPhamBanChayNhatTheoSanLuong: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colProduct.find({ idShop: shopID }).toArray();
        let result2 = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        let arrThongTin = [];

        for (let index1 = 0; index1 < result.length; index1++) {
            var thongTin = {
                tenSanPham: result[index1].ten,
                img: result[index1].img.chinh,
                tongTienBanDuoc: 0,
                soLuongDaBan: result[index1].soLuongDaBan,
                soDonHang: 0
            }
            for (let index2 = 0; index2 < result2.length; index2++) {
                if (result2[index2].ten === result[index1].ten) {
                    thongTin.tongTienBanDuoc += result2[index2].thanhTien;
                    thongTin.soDonHang += 1;
                }
            }
            arrThongTin.push(thongTin);
        }
        arrThongTin.sort(sapXepTheoSanLuong);
        client.close();
        res.status(200).json({
            status: 'success',
            data: arrThongTin,
            message: 'Đã lấy được data top 10 sản phẩm bán chạy nhất theo sản lượng thành công'
        });
    },

    Top10SanPhamBanChayNhatTheoSoLuongDonHang: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection(product);
        const colOrderDetail = db.collection(orderdetail);
        let result = await colProduct.find({ idShop: shopID }).toArray();
        let result2 = await colOrderDetail.find({ idShop: shopID, trangThai: 4 }).toArray();

        let arrThongTin = [];

        for (let index1 = 0; index1 < result.length; index1++) {
            var thongTin = {
                tenSanPham: result[index1].ten,
                img: result[index1].img.chinh,
                tongTienBanDuoc: 0,
                soLuongDaBan: result[index1].soLuongDaBan,
                soDonHang: 0
            }
            for (let index2 = 0; index2 < result2.length; index2++) {
                if (result2[index2].ten === result[index1].ten) {
                    thongTin.tongTienBanDuoc += result2[index2].thanhTien;
                    thongTin.soDonHang += 1;
                }
            }
            arrThongTin.push(thongTin);
        }
        arrThongTin.sort(sapXepTheoSoLuongDonHang);
        client.close();
        res.status(200).json({
            status: 'success',
            data: arrThongTin,
            message: 'Đã lấy được data top 10 sản phẩm bán chạy nhất theo số lượng đơn hàng thành công'
        });
    },
}

function sapXepTheoDoanhThu(a, b) {

    const doanhThuA = a.tongTienBanDuoc;
    const doanhThuB = b.tongTienBanDuoc;

    let comparison = 0;
    if (doanhThuA > doanhThuB) {
        comparison = -1;
    } else if (doanhThuA < doanhThuB) {
        comparison = 1;
    }
    return comparison;
}

function sapXepTheoGiaCuoiCungCaoDenThap(a, b) {
    var giaCuoiCungA;
    var giaCuoiCungB;

    if (a.giaTriGiamGia > 100) {
        giaCuoiCungA = a.gia - a.giaTriGiamGia;
    } else {
        giaCuoiCungA = a.gia * (100 - a.giaTriGiamGia) / 100;
    }

    if (b.giaTriGiamGia > 100) {
        giaCuoiCungB = b.gia - b.giaTriGiamGia;
    } else {
        giaCuoiCungB = b.gia * (100 - b.giaTriGiamGia) / 100;
    }

    let comparison = 0;
    if (giaCuoiCungA > giaCuoiCungB) {
        comparison = -1;
    } else if (giaCuoiCungA < giaCuoiCungB) {
        comparison = 1;
    }
    return comparison;
}

function sapXepTheoGiaCuoiCungThapDenCao(a, b) {
    var giaCuoiCungA;
    var giaCuoiCungB;

    if (a.giaTriGiamGia > 100) {
        giaCuoiCungA = a.gia - a.giaTriGiamGia;
    } else {
        giaCuoiCungA = a.gia * (100 - a.giaTriGiamGia) / 100;
    }

    if (b.giaTriGiamGia > 100) {
        giaCuoiCungB = b.gia - b.giaTriGiamGia;
    } else {
        giaCuoiCungB = b.gia * (100 - b.giaTriGiamGia) / 100;
    }

    let comparison = 0;
    if (giaCuoiCungA > giaCuoiCungB) {
        comparison = 1;
    } else if (giaCuoiCungA < giaCuoiCungB) {
        comparison = -1;
    }
    return comparison;
}

function sapXepTheoSanLuong(a, b) {

    const doanhThuA = a.soLuongDaBan;
    const doanhThuB = b.soLuongDaBan;

    let comparison = 0;
    if (doanhThuA > doanhThuB) {
        comparison = -1;
    } else if (doanhThuA < doanhThuB) {
        comparison = 1;
    }
    return comparison;
}

function sapXepTheoSoLuongDonHang(a, b) {

    const doanhThuA = a.soDonHang;
    const doanhThuB = b.soDonHang;

    let comparison = 0;
    if (doanhThuA > doanhThuB) {
        comparison = -1;
    } else if (doanhThuA < doanhThuB) {
        comparison = 1;
    }
    return comparison;
}