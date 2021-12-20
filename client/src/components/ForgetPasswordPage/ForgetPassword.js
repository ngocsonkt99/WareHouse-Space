import React, { useState, Fragment, useEffect } from 'react';
import { Navbar, Button, Row, Col, Nav, Form } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import { axios } from '../../config/constant';
import { message } from 'antd';
import { useDispatch } from 'react-redux';


export default function ForgetPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    async function GuiMailDoiMatKhau() {
        console.log(email + ' + client');
        let res = await axios.post('hethong/auth/forget-password', {
            email: email
        });

        if (res.data.status === 'success') {
            message.success(res.data.message);
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
                                    <Form.Control type="text" placeholder="Nhập địa chỉ email để đổi lại mật khẩu" onChange={(e) => {
                                        setEmail(e.target.value);
                                    }} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col >
                                    <Button variant="primary" style={{ width: '50%' }} onClick={(e) => {
                                        GuiMailDoiMatKhau();
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
