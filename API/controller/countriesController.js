const { DbUrl, DbName, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;

module.exports = {
    LayDanhSachCountriesAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCountry = db.collection(country);
        let allCountries = await colCountry.find({}).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: allCountries
        });
    }
}