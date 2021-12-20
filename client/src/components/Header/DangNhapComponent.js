import React, { Fragment, useState, useEffect } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { message, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

export default function DangNhapComponent() {
    const [taiKhoan, setTaiKhoan] = useState({
        tenTaikhoan: "",
        matKhau: ""
    });

    const [statusMessageError, setStatusMessageError] = useState(-1);

    const [cookies, setCookies] = useCookies();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    function KiemTraDuLieuNhap() {
        var regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (taiKhoan.tenTaikhoan === '' || taiKhoan.matKhau === '') {
            setStatusMessageError(0);
        } else {
            if (!regEmail.test(taiKhoan.tenTaikhoan)) {
                setStatusMessageError(1);
            } else {
                XuLyDangNhap();
            }
        }

    }

    async function XuLyDangNhap() {
        setLoading(true);
        await axios.post('hethong/auth', {
            tenTaiKhoan: taiKhoan.tenTaikhoan,
            matKhau: taiKhoan.matKhau
        }).then(function (res) {
            if (res.data.status === "success") {
                setLoading(false);
                localStorage.setItem('email', res.data.email);
                setCookies('userID', res.data.userID, { path: '/' });
                setCookies('token', res.data.token, { path: '/' });
                if (res.data.vaiTro === 0) {
                    window.location.pathname = "/admin";
                } else {
                    window.location.reload();
                }
            } else {
                setLoading(false);
                message.error(res.data.message);
                dispatch({ type: 'CLOSE_MODAL_DANGNHAP_DANGKY' });
            }
        }).catch(function (error) {
            console.log(error);
        })

    }

    useEffect(() => {
        setStatusMessageError(-1);
    }, [])

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-4" style={{ height: 'auto', padding: 40 }}>
                    <h3>Đăng Nhập</h3>
                    <span style={{ color: 'grey' }}>Đăng nhập quản lý - mua sắm cùng WareHouse ngay nào!</span>
                </div>
                <div className="col-sm-8" style={{ height: 'auto', padding: 40 }}>
                    <Form style={{ fontSize: 14, padding: 0, margin: 0 }}>
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nhập email" onChange={(e) => {
                                    setTaiKhoan({
                                        ...taiKhoan,
                                        tenTaikhoan: e.target.value
                                    });
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPassword">
                            <Form.Label column sm={3}>Mật khẩu</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => {
                                    setTaiKhoan({
                                        ...taiKhoan,
                                        matKhau: e.target.value
                                    });
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicCheckbox">
                            <Form.Label column sm={3}></Form.Label>
                            <Col sm={9}>
                                <Link to='users/password/forget' onClick={() => {
                                    dispatch({ type: 'CLOSE_MODAL_DANGNHAP_DANGKY' });
                                }}>Quên mật khẩu</Link>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}></Form.Label>
                            <Col sm={9}>
                                {
                                    statusMessageError === 0 && (
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại thông tin</p>
                                    )
                                }

                                {
                                    statusMessageError === 1 && (
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>Dữ liệu email không hợp lệ</p>
                                    )
                                }
                                <Button variant="primary" block onClick={(e) => {
                                    KiemTraDuLieuNhap();
                                }}>
                                    {loading === false ? "Đăng Nhập" : (<Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>)}
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Fragment>

    )
}
