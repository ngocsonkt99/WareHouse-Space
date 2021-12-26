import React, { Fragment, useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

export default function UserComponent() {
    const [cookies, setCookies, removeCookie] = useCookies();
    const isAdminReducer = useSelector(state => state.isAdmin);
    const [dataEmail, setDataEmail] = useState('');
    var history = useHistory();

    async function LayDataUserTheoID(userID) {
        let res = await axios.get('hethong/users-item?idUser=' + userID);
        if (res.data.status === 'success') {
            setDataEmail(res.data.data.ten);
        } else {
            message.error('Lấy data user thất bại');
        }
    }


    useEffect(() => {
        LayDataUserTheoID(cookies.userID);
    }, [])

    return (
        <Fragment>
            <span style={{ fontSize: 25, color: '#fff' }}> <i className="fas fa-user-alt" style={{ marginTop: 15 }}></i></span>
            <NavDropdown title={dataEmail.length > 0 ? dataEmail : ''} id="basic-nav-dropdown">
                {
                    isAdminReducer && (
                        <NavDropdown.Item onClick={() => {
                            history.push('/admin');
                        }}>Trang quản lý</NavDropdown.Item>
                    )
                }
                <NavDropdown.Item onClick={() => {
                    history.push('/customer/account');
                    
                }}>Tài khoản của tôi</NavDropdown.Item>
                {
                    !isAdminReducer && (
                        <Fragment>
                            <NavDropdown.Item onClick={() => {
                                history.push('/customer/order');
                            }}>Đơn hàng của tôi</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                history.push('/customer/payment');
                            }}>Thông tin thanh toán</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                history.push('/customer/comment');
                            }}>Nhận xét của tôi</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {
                                history.push('/customer/san-pham-da-xem');
                            }}>Sản phẩm đã xem</NavDropdown.Item>
                        </Fragment>
                    )
                }
                <NavDropdown.Item onClick={() => {
                    removeCookie('token');
                    removeCookie('userID');
                    localStorage.setItem('email', 'undefined');
                    window.location.pathname = '/';
                }}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
        </Fragment>
    )
}
