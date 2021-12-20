const { vnp_TmnCode, vnp_HashSecret, vnp_Url, vnp_ReturnUrl, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const sgMail = require('@sendgrid/mail');
var nodemailer = require('nodemailer');
sgMail.setApiKey(process.env.MAIL_KEY);

module.exports = {
    ThemDonHang_VNPAY: function (req, res) {
        console.log('ok');
        var ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;



        var dateFormat = require('dateformat');



        var tmnCode = vnp_TmnCode;
        var secretKey = vnp_HashSecret;
        var vnpUrl = vnp_Url;
        var returnUrl = vnp_ReturnUrl;



        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'HHmmss');
        var amount = req.body.amount;
        var bankCode = req.body.bankCode;
        var orderInfo = req.body.orderDescription;
        var orderType = req.body.orderType;
        var locale = req.body.language;

        console.log(amount);
        console.log(bankCode);
        console.log(orderInfo);
        console.log(orderType);
        console.log(locale);

        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }
        console.log('ok2');


        vnp_Params = sortObject(vnp_Params);


        var querystring = require('qs');
        var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });

        var sha256 = require('sha256');

        var secureHash = sha256(signData);

        vnp_Params['vnp_SecureHashType'] = 'SHA256';
        vnp_Params['vnp_SecureHash'] = secureHash;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: true });



        //Neu muon dung Redirect thi dong dong ben duoi
        //res.status(200).json({status:'success', data: vnpUrl})
        //Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
        console.log(vnpUrl);
        //res.redirect(vnpUrl);
        res.status(200).json({ code: '00', data: vnpUrl })

    },

    TestSendMail: async function (req, res) {
        var arr = [
            {
                ten: 'Giày',
                gia: 20000,
                mauSac: '',
                size: '',
                soLuong: 2,
                img: 'https://kenh14cdn.com/zoom/460_289/2020/6/23/callmexxu96138588240390200367157319795092234551135n-1592900493688220103338-crop-15929005021622094281129.jpg'

            },

            {
                ten: 'Áo',
                gia: 30000,
                mauSac: 'Đỏ',
                size: 'M',
                soLuong: 1,
                img: 'https://kenh14cdn.com/zoom/460_289/2020/6/23/callmexxu96138588240390200367157319795092234551135n-1592900493688220103338-crop-15929005021622094281129.jpg'
            },

            {
                ten: 'Quần',
                gia: 100000,
                mauSac: '',
                size: 'XL',
                soLuong: 5,
                img: 'https://kenh14cdn.com/zoom/460_289/2020/6/23/callmexxu96138588240390200367157319795092234551135n-1592900493688220103338-crop-15929005021622094281129.jpg'
            },
        ];
        var html = '<h3>DANH SÁCH SẢN PHẨM</h3>';

        for (let index = 0; index < arr.length; index++) {
            html += `
                    <img src=${arr[index].img} alt="ảnh" width="120" height="140">
                    <p><b>Tên sản phẩm: </b>${arr[index].ten}</p>
                    <p><b>Số lượng: </b>${arr[index].soLuong}</p>
                    <p><b>Giá: </b>${format_curency(arr[index].gia.toString())}đ</p>
                    <p><b>Màu sắc: </b>${arr[index].mauSac === '' ? 'Không' : arr[index].mauSac}</p>
                    <p><b>Size: </b>${arr[index].size === '' ? 'Không' : arr[index].size}</p>
                    <br></br>
                    `
        }

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: 'yenlinh9a6@gmail.com',
            subject: 'WareHouse đã nhận đơn hàng ...',
            html: html
        }

        await sgMail.send(emailData).then(sent => {
            console.log('ok')
            res.status(200).json({
                status: 'success',
                message: `Email đã được gửi`
            })
        }).catch(err => {
            res.status(200).json({
                status: 'fail'
            })
        })
    }
}

function sortObject(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function format_curency(a) {
    a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
}