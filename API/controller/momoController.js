const uuid = require('uuid');
const crypto = require('crypto');
const https = require('https');

module.exports = {
    ThemDonHang_MOMO: function (req, res) {
        var partnerCode = "MOMO";
        var accessKey = "F8BBA842ECF85";
        var serectkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        var orderInfo = `WareHouse : Thanh toán hóa đơn ${req.body.orderInfo}`;
        var returnUrl = "https://momo.vn/return";
        var notifyurl = "https://callback.url/notify";
        var amount = req.body.amount;
        var orderId = uuid.v1();
        var requestId = uuid.v1();
        var requestType = "captureMoMoWallet";
        var extraData = "merchantName=;merchantId=";

        var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData;

        var signature = crypto.createHmac('sha256', serectkey).update(rawSignature).digest('hex');

        var body = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            returnUrl: returnUrl,
            notifyUrl: notifyurl,
            extraData: extraData,
            requestType: requestType,
            signature: signature
        })

        var options = {
            hostname: 'test-payment.momo.vn',
            port: 443,
            path: '/gw_payment/transactionProcessor',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        var ketqua;

        var request = https.request(options, (ress) => {
            ress.setEncoding('utf8');
            ress.on('data', (body) => {
                ketqua += body;
            });
            ress.on('end', () => {
                console.log(ketqua);
                console.log(ketqua.toString().substring(216, 519));

                res.status(200).json({
                    status: 'success',
                    data: ketqua.toString().substring(216, 520)
                });
            });
        });

        request.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        request.write(body);
        request.end();

    }
}