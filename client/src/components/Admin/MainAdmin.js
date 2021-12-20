import React, { Fragment, useState, useEffect } from 'react';
import { ListGroup, Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { axios } from '../../config/constant';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { QLBaiVietComponent, QLGianHangComponent, QLNhanXetComponent, QLMaGiamGiaComponent, QLNguoiDungComponent, QLDoanhThuComponent, QLCauHoiComponent, QLCategoryComponent, QLBrandComponent, QLProductComponent, QLDonHangComponent } from '../allJS';
import { Dropdown, Menu, message } from 'antd';


export default function MainAdmin() {
    const [cookies, setCookies, removeCookies] = useCookies();
    const isAdminReducer = useSelector(state => state.isAdmin);
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const [disable, setDisable] = useState(false)


    async function KiemTraTokenAdmin() {
        await axios.get('hethong/auth/token-admin', { headers: { 'token': cookies.token } }).then(function (res) {
            if (res.data.status === "fail") {
                dispatch({ type: 'NO_ADMIN' });
            } else {
                dispatch({ type: 'ADMIN' });
            }
        }).catch(function (err) {
            console.log(err);
        });
    }

    useEffect(() => {
        KiemTraTokenAdmin();
        dispatch({ type: 'SHOW_HEADER' });
    }, [])



    return (
        <Fragment>
            <div className="container-fluid" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-sm-2" style={{ height: 800, backgroundColor: '#041527', borderRadius: 10, position: 'relative', display: disable ? 'none' : '' }}>
                        <span style={{ position: 'absolute', top: '15px', right: '10px', fontSize: '22px', color: '#fff' }}
                            onClick={() => {
                                setDisable(true)
                            }}
                        ><i class="fas fa-angle-double-left"></i>
                        </span>
                        <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
                            <h5 style={{ color: 'white', }}>Chức năng Admin</h5>
                        </div>
                        <div>
                            <ListGroup>
                                <Link to={`${match.url}/qlbaiviet`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Bài viết
                                    </ListGroup.Item>
                                </Link>


                                <Link to={`${match.url}/qlcategory`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Loại sản phẩm
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlbrand`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Thương hiệu
                                    </ListGroup.Item>
                                </Link>


                                <Link to={`${match.url}/qlproduct`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Sản phẩm
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qldonhang`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Đơn hàng
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlgianhang`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Gian hàng
                                    </ListGroup.Item>
                                </Link>
                                <Link to={`${match.url}/qlnguoidung`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Người dùng
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlvoucher`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Mã giảm giá
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlcauhoi`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Câu hỏi khách hàng
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlnhanxet`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Bình luận khách hàng
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qldoanhthu`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        message.error("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            message.error("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Doanh thu
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </div>
                    </div>

                    <div className={disable ? "col-sm-12" : "col-sm-10"} style={{ padding: 20, position: 'relative', }} >
                        <span style={{ fontSize: '22px', position: 'absolute', top: '20px', left: '5px', display: !disable ? 'none' : '' }}
                            onClick={() => {
                                setDisable(false)
                            }}
                        >
                            <i class="fas fa-angle-double-right"></i>
                        </span>
                        {
                            isAdminReducer === true && (
                                <Switch>
                                    <Route exact path={`${match.url}/qlcategory`} component={QLCategoryComponent}></Route>
                                    <Route exact path={`${match.url}/qlbrand`} component={QLBrandComponent}></Route>
                                    <Route exact path={`${match.url}/qlproduct`} component={QLProductComponent}></Route>
                                    <Route exact path={`${match.url}/qldonhang`} component={QLDonHangComponent}></Route>
                                    <Route exact path={`${match.url}/qlgianhang`} component={QLGianHangComponent}></Route>
                                    <Route exact path={`${match.url}/qlnguoidung`} component={QLNguoiDungComponent}></Route>
                                    <Route exact path={`${match.url}/qlbaiviet`} component={QLBaiVietComponent}></Route>
                                    <Route exact path={`${match.url}/qlcauhoi`} component={QLCauHoiComponent}></Route>
                                    <Route exact path={`${match.url}/qlnhanxet`} component={QLNhanXetComponent}></Route>
                                    <Route exact path={`${match.url}/qldoanhthu`} component={QLDoanhThuComponent}></Route>
                                    <Route exact path={`${match.url}/qlvoucher`} component={QLMaGiamGiaComponent}></Route>
                                </Switch>
                            )
                        }
                    </div>

                </div>
            </div>
        </Fragment >
    )
}
