import React, { useState, Fragment, useEffect } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import { axios } from '../../config/constant';
import { message } from 'antd';


export default function ActivationAccount(props) {
    const token = props.match.params.token;
    const [userThem, setUserThem] = useState('');

    async function TaoTaiKhoan() {
        let res = await axios.post('hethong/auth/create-account', {
            token: token
        });

        if (res.data.status === 'success') {
            message.success('Tạo tài khoản thành công');
            setTimeout(() => {
                window.location.pathname = '/';
            }, 2000);
        } else {
            message.error(res.data.message);
        }
    }

    useEffect(() => {
        setUserThem(jwt.decode(token));
    }, [])

    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src='/logo2.png'
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
                        <h5><b>Welcome {userThem.ten}</b></h5>
                        <Button onClick={() => {
                            TaoTaiKhoan();
                        }}>Nhấn để kích hoạt tài khoản</Button>
                    </center>
                </div>
            </div>
        </Fragment>

    )
}
