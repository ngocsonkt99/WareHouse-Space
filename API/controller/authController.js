const { DbUrl, DbName, voucher, user, product, order, producttype, orderdetail, comment, orderhistorydetail,
    News, brands, question, category, datasearch, country, local } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const { BoDau } = require('../functionHoTro/index');
var nodemailer = require('nodemailer');
sgMail.setApiKey('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');

module.exports = {
    KiemTraAccount: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        var tenTaiKhoan = req.body.tenTaiKhoan;
        var matKhau = req.body.matKhau;

        await client.connect(async function (error, client) {
            assert.equal(null, error);
            console.log("Connected correctly to server");
            const col = client.db(DbName).collection(user);
            var resultUser = await col.find({ "taiKhoan.tenTaiKhoan": tenTaiKhoan }).next();
            if (resultUser === null) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Tài khoản không tồn tại'
                });
            } else {
                if (resultUser.isLock === true) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Tài khoản này đã bị khóa'
                    });
                } else {
                    bcrypt.compare(matKhau, resultUser.taiKhoan.matKhau, function (err, result) {
                        if (result == true) {
                            var secretKey = process.env.SECRET_KEY;
                            var payload = {
                                // name:resultUser.ten,
                                userID: resultUser._id,
                                vaiTro: resultUser.vaiTro
                            };

                            //7 ngày hết hạn token
                            var token = jwt.sign({ payload }, secretKey, { expiresIn: 60 * 1220 * 7 });
                            console.log(JSON.stringify(payload));
                            res.status(200).json({
                                status: 'success',
                                message: 'Đăng nhập thành công !',
                                userID: resultUser._id,
                                tenTaiKhoan: resultUser.taiKhoan.tenTaiKhoan,
                                email: resultUser.email,
                                vaiTro: resultUser.vaiTro,
                                token: token
                            });
                        } else {
                            res.status(200).json({
                                status: "fail",
                                message: "Tài khoản hoặc mật khẩu không hợp lệ",
                            });
                        }
                    })
                }
            }
        });
    },

    DangKyAccount: async function (req, res) {
        let userThem = {
            ten: req.body.ten,
            lowerTen: BoDau(req.body.ten),
            email: req.body.email,
            sdt: req.body.sdt,
            cmnd: req.body.cmnd,
            ngaySinh: new Date(req.body.ngaySinh),
            gioiTinh: req.body.gioiTinh,
            taiKhoan: {
                tenTaiKhoan: req.body.taiKhoan.tenTaiKhoan,
                matKhau: req.body.taiKhoan.matKhau
            },
            thongTinShop: {
                ten: '',
                lowerTen: '',
                diaChi: '',
                idShop: '',
                logoShop: '',
                keyPaypal: '',
                viShop: '',
                ngayTao: '',
                moTa: '',
                img: {
                    carousel: [],
                    banner1: '',
                    banner2: ''
                }
            },
            vaiTro: req.body.vaiTro,
            isLock: req.body.isLock,
            isDelete: req.body.isDelete
        }
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        // const allUser = await colUser.find({ isDelete: false }).toArray();
        let trungTaiKhoan = await colUser.findOne({ email: userThem.email });

        let result;

        if (trungTaiKhoan === null) {
            const token = jwt.sign(userThem, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '15m' });

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.PASS_EMAIL
                }
            });
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: userThem.email,
                subject: 'Kích hoạt tài khoản WareHouse',
                html: `
                    <h1>Vui lòng nhấn vào link dưới đây để kích hoạt tài khoản</h1>
                    <p>${process.env.CLIENT_URL_LOCAL}/users/activate/${token}</p>
                    <hr/>
                    <p>Email này chứa những thông tin nhạy cảm và sẽ hết hạn trong vòng 15 phút</p>
                    <p>${process.env.CLIENT_URL_LOCAL}</p>
                `
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Gửi email xác thực thất bại !'
                    })
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: `Email đã được gửi đến ${userThem.email}`
                    })
                }
            })
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Email này đã tồn tại. Vui lòng chọn email khác để đăng ký tài khoản',
            })
        }
    },
    QuenPassword: async function (req, res) {
        let userEmail = {
            email: req.body.email
        };
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection(user);
        let trungTaiKhoan = await colUser.findOne({ email: userEmail.email });

        let result;

        if (trungTaiKhoan === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Email này không tồn tại trong hệ thống WareHouse',
            })
        } else {
            const token = jwt.sign(userEmail, process.env.JWT_RESET_PASS, { expiresIn: '15m' });

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_FROM,
                    pass: process.env.PASS_EMAIL
                }
            });
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: userEmail.email,
                subject: 'Xác nhận đổi mật khẩu tài khoản WareHouse',
                html: `
                    <h1>Vui lòng nhấn vào link dưới đây để đổi mật khẩu tài khoản WareHouse</h1>
                    <p>${process.env.CLIENT_URL_LOCAL}/users/password/reset/${token}</p>
                    <hr/>
                    <p>Email này chứa những thông tin nhạy cảm và sẽ hết hạn trong vòng 15 phút</p>
                    <p>${process.env.CLIENT_URL_LOCAL}</p>
                `
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Gửi email xác thực thất bại !'
                    })
                } else {
                    res.status(200).json({
                        status: 'success',
                        message: `Email đã được gửi đến ${userEmail.email}`
                    })
                }
            })
        }
    },


    TaoAccount: async function (req, res) {
        const token = req.body.token;
        console.log(process.env.JWT_ACCOUNT_ACTIVATION);
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
            if (err) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Token hết hạn. Vui lòng đăng ký lại'
                })
            } else {
                const userThem = jwt.decode(token);
                const saltRounds = 10;
                const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const colUser = db.collection(user);
                bcrypt.hash(userThem.taiKhoan.matKhau, saltRounds, async function (err, hash) {
                    userThem.taiKhoan.matKhau = hash;
                    let result = await colUser.insertOne(userThem);
                    client.close();
                    if (result.insertedCount > 0) {
                        res.status(200).json({
                            status: 'success',
                            message: 'Thêm user thành công',
                        })
                    } else {
                        res.status(200).json({
                            status: 'fail',
                            message: 'Thêm user thất bại',
                        });
                    }

                });
            }
        })

    },

    // ResetPassword: async function (req, res) {
    //     const token = req.body.token;
    //     const passwordNew = req.body.password;
    //     jwt.verify(token, process.env.JWT_RESET_PASS, async (err, decoded) => {
    //         if (err) {
    //             res.status(200).json({
    //                 status: 'fail',
    //                 message: 'Token hết hạn. Vui lòng đổi mật khẩu lại'
    //             })

    //         } else {
    //             const email = jwt.decode(token).email;
    //             const saltRounds = 10;
    //             const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    //             await client.connect();
    //             console.log("Connected correctly to server");
    //             const db = client.db(DbName);
    //             const colUser = db.collection(user);
    //             const userPassword = await colUser.findOne({ email: email });
    //             if (userPassword === null) {
    //                 res.status(200).json({
    //                     status: 'fail',
    //                     message: 'Đổi mật khẩu mới thất bại',
    //                 });
    //             } else {
    //                 bcrypt.hash(passwordNew, saltRounds, async function (err, hash) {
    //                     let result = await colUser.findOneAndUpdate({ email: email }, {
    //                         $set:
    //                         {
    //                             'taiKhoan.matKhau': hash
    //                         }
    //                     });

    //                     client.close();
    //                     res.status(200).json({
    //                         status: 'success',
    //                         message: 'Đổi mật khẩu mới thành công',
    //                     })
    //                 })
    //             }

    //         }
    //     })

    // },
    ResetPassword: async function (req, res) {
        const token = req.body.token;
        const passwordNew = req.body.password;
        console.log(passwordNew);

        jwt.verify(token, process.env.JWT_RESET_PASS, async (err, decoded) => {
            if (err) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Token hết hạn. Vui lòng đổi mật khẩu lại'
                })

            } else {
                const email = jwt.decode(token).email;
                const saltRounds = 10;
                const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const colUser = db.collection(user);
                const userPassword = await colUser.findOne({ email: email });
                if (userPassword === null) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Đổi mật khẩu mới thất bại' + email,
                    });
                } else {
                    bcrypt.hash(passwordNew, saltRounds, async function (err, hash) {
                        let result = await colUser.findOneAndUpdate({ email: email }, {
                            $set:
                            {
                                'taiKhoan.matKhau': hash
                            }
                        });

                        client.close();
                        res.status(200).json({
                            status: 'success',
                            message: 'Đổi mật khẩu mới thành công',
                        })
                    })
                }

            }
        })

    },

    KiemTraTokenAdmin: async function (req, res, next) {
        var token = req.header('token');
        let resultToken = await jwt.verify(token, process.env.SECRET_KEY);
        if (resultToken.payload.vaiTro === 0) {
            res.status(200).json({
                status: "success",
                message: 'Token hợp lệ',
            });
        } else {
            res.status(200).json({
                status: "fail",
                message: 'Token không hợp lệ !',
            });
        }
    },

    KiemTraTokenChuShop: function (req, res, next) {
        var token = req.header('token');
        jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
            if (payload.payload.vaiTro === 1) {
                res.status(200).json({
                    status: "success",
                    message: 'Token hợp lệ',
                });
                next();
            } else {
                res.status(200).json({
                    status: "fail",
                    message: 'Token không hợp lệ !',
                });
            }
        });
    },

    KiemTraTokenNormal: function (req, res, next) {
        var token = req.header('token');
        jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
            if (payload.payload.vaiTro === 2) {
                next();
            } else {
                res.status(200).json({
                    status: "fail",
                    message: 'Token không hợp lệ !',
                });
            }
        });
    },

}