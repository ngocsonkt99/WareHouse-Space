import React, { useState, Fragment, useEffect } from 'react';
import { Navbar, Button, Row, Col, Nav, Form } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import { axios } from '../../config/constant';
import { message } from 'antd';
import { useDispatch } from 'react-redux';


export default function ResetPassword(props) {
    const token = props.match.params.token;
    const dispatch = useDispatch();
    const [password, setPassword] = useState({
        newPassword1: '',
        newPassword2: ''
    });
    const [error, setError] = useState(0);

    function KiemTraDuLieuNhap() {
        if (password.newPassword1 !== password.newPassword2) {
            setError(1);
        } else {
            DoiMatKhauMoi();
            setError(0);
        }
    }

    async function DoiMatKhauMoi() {
        let res = await axios.put('hethong/auth/reset-password', {
            token: token,
            password: password.newPassword1
        });

        if (res.data.status === 'success') {
            message.success(res.data.message);
            setTimeout(() => {
                window.location.pathname = '/';
            }, 2000);
        } else {
            message.error(res.data.message);
        }
    }

    useEffect(() => {
        dispatch({ type: 'CLOSE_HEADER' });
    }, []);

    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src='/logo.png'
                        width="40"
                        height="40"
                        style={{ marginRight: 5 }}
                        className="d-inline-block"
                    />
                    <span style={{ fontWeight: 'bold', color: 'orange' }}>WareHouse</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Trang Chủ</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container" style={{ marginTop: 100, height: 'auto', padding: 20 }}>
                <div className='col'>
                    <center>
                        <Form style={{ fontSize: 14, padding: 0, margin: 0 }}>

                            <Form.Group as={Row} controlId="formBasicPassword">
                                <Col >
                                    <Form.Control type="password" placeholder="Nhập mật khẩu mới" onChange={(e) => {
                                        setPassword({
                                            ...password,
                                            newPassword1: e.target.value
                                        })
                                    }} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formBasicPassword">
                                <Col >
                                    <Form.Control type="password" placeholder="Xác nhận lại mật khẩu" onChange={(e) => {
                                        setPassword({
                                            ...password,
                                            newPassword2: e.target.value
                                        })
                                    }} />
                                </Col>
                            </Form.Group>
                            {
                                error === 1 && (
                                    <Form.Group as={Row} controlId="formBasicPassword">
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>Mật khẩu không trùng khớp. Vui lòng kiểm tra lại</p>
                                    </Form.Group>
                                )
                            }
                            <Form.Group as={Row}>
                                <Col >
                                    <Button variant="primary" style={{ width: '50%' }} onClick={(e) => {
                                        KiemTraDuLieuNhap();
                                    }}>
                                        Xác nhận
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </center>
                </div>
            </div>
        </Fragment>

    )
}
