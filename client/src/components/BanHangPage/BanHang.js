import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Dropdown, message } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useHistory, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { BanHang_TrangChuComponent, BanHang_DanhSachSanPhamComponent, BanHang_DanhSachGiamGiaComponent, BanHang_BaoCaoBanHangTongHopComponent, BanHang_Top10SanPhamBanChayComponent, BanHang_TongHopDonHangComponent, BanHang_QuanLyTonKhoComponent, BanHang_TaoMoiSanPhamComponent, BanHang_DonHangComponent } from '../allJS'

export default function BanHang() {
    const { SubMenu } = Menu;
    const match = useRouteMatch();
    const [cookie, setCookie, removeCookies] = useCookies();

    const [dataUser, setDataUser] = useState({
        _id: '',
        email: '',
        thongTinShop: {
            idShop: '',
            ten: '',
            moTa: '',
            diaChi: '',
            logoShop: '',
            img: {
                carousel: [],
                banner1: '',
                banner2: ''
            }
        }
    });
    const dispatch = useDispatch();
    let history = useHistory();

    const menu = (
        <Menu>
            <Menu.Item >
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Item onClick={() => {
                removeCookies('token');
                removeCookies('userID');
                window.location.pathname = '/';
            }}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
    const idUser = cookie.userID;

    async function LayDataUserTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        if (resData.data.status === 'success') {
            setDataUser({
                _id: resData.data.data._id,
                email: resData.data.data.email,
                thongTinShop: {
                    idShop: resData.data.data.thongTinShop.idShop,
                    ten: resData.data.data.thongTinShop.ten,
                    moTa: resData.data.data.thongTinShop.moTa,
                    diaChi: resData.data.data.thongTinShop.diaChi,
                    logoShop: resData.data.data.thongTinShop.logoShop,
                    img: {
                        carousel: resData.data.data.thongTinShop.img.carousel,
                        banner1: resData.data.data.thongTinShop.img.banner1,
                        banner2: resData.data.data.thongTinShop.img.banner2
                    }
                }
            });
        } else {
            message.error("Lấy data user thất bại");
        }
    }

    useEffect(() => {
        LayDataUserTheoIDUser(idUser);
        dispatch({ type: 'CLOSE_HEADER' });
    }, [])

    useEffect(() => {
        setCookie('shopID', dataUser.thongTinShop.idShop);
    }, [dataUser])

    return (
        <div className='row' style={{ marginRight: 0 }}>
            <Fragment>
                <div className='col-sm-2'>
                    <div style={{ height: 70, width: 'auto', backgroundColor: '#17a2b8' }}>
                        <Link to='/'>
                            <div className='row' style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <img alt="" src='/logo2.png' width="60" height="60"  />
                                <span style={{ fontWeight: 'bold', color: 'yellow', fontSize: 28 }}> WareHouse</span>
                            </div>
                        </Link>
                    </div>
                    <Menu mode="inline" theme="light" style={{ width: 'auto', height: 1036 }}>
                        <Menu.Item key="0" onClick={() => {
                            history.push(`${match.url}/trang-chu`);
                        }}>Quản lý gian hàng</Menu.Item>
                        <Menu.Item key="1" onClick={() => {
                            history.push(`${match.url}/don-hang`);
                        }}>Quản lý đơn hàng</Menu.Item>
                        <SubMenu key="sub1" title="Quản lý sản phẩm">
                            <Menu.Item key="2" onClick={() => {
                                history.push(`${match.url}/san-pham/danh-sach-san-pham`);
                            }}>Danh sách sản phẩm</Menu.Item>
                            <Menu.Item key="3" onClick={() => {
                                history.push(`${match.url}/san-pham/tao-moi-san-pham`);
                            }}>Đăng sản phẩm mới</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="Thống kê">
                            <Menu.Item key="6" onClick={() => {
                                history.push(`${match.url}/thong-ke/tong-hop-don-hang`);
                            }}>Thống kê đơn hàng</Menu.Item>
                            <Menu.Item key="7" onClick={() => {
                                history.push(`${match.url}/thong-ke/top-10-san-pham-ban-chay-nhat`);
                            }}>Top sản phẩm bán nhiều</Menu.Item>
                            <Menu.Item key="8" onClick={() => {
                                history.push(`${match.url}/thong-ke/bao-cao-ban-hang-tong-hop`);
                            }}>Doanh số bán hàng</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="4" onClick={() => {
                            history.push(`${match.url}/quan-ly-kho`);
                        }}>Quản lý kho hàng</Menu.Item>
                        <SubMenu key="sub3" title="Chương trình - Sự kiện">
                            <Menu.Item key="5" onClick={() => {
                                history.push(`${match.url}/quang-cao/danh-sach-giam-gia`);
                            }}>Danh sách giảm giá</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='col-sm-10'>
                    <div className='col'>
                        <div className='row' style={{ float: 'right' }}>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <Button size='large' variant='info' style={{ marginTop: 15 }}>
                                    <img alt="" src='/shop.jpg' width="30" height="30" /> &nbsp; {dataUser.email} <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>

                        <div className='row' style={{ width: '95%', height: 'auto', marginLeft: 20 }}>
                            <Switch>
                                <Redirect exact from={match.url} to={`${match.url}/trang-chu`} />
                                <Route exact path={`${match.url}/trang-chu`} component={BanHang_TrangChuComponent}></Route>
                                <Route exact path={`${match.url}/don-hang`} component={BanHang_DonHangComponent}></Route>
                                <Route exact path={`${match.url}/san-pham/danh-sach-san-pham`} component={BanHang_DanhSachSanPhamComponent}></Route>
                                <Route exact path={`${match.url}/san-pham/tao-moi-san-pham`} component={BanHang_TaoMoiSanPhamComponent}></Route>
                                <Route exact path={`${match.url}/quan-ly-kho`} component={BanHang_QuanLyTonKhoComponent}></Route>
                                <Route exact path={`${match.url}/thong-ke/tong-hop-don-hang`} component={BanHang_TongHopDonHangComponent}></Route>
                                <Route exact path={`${match.url}/thong-ke/top-10-san-pham-ban-chay-nhat`} component={BanHang_Top10SanPhamBanChayComponent}></Route>
                                <Route exact path={`${match.url}/thong-ke/bao-cao-ban-hang-tong-hop`} component={BanHang_BaoCaoBanHangTongHopComponent}></Route>
                                <Route exact path={`${match.url}/quang-cao/danh-sach-giam-gia`} component={BanHang_DanhSachGiamGiaComponent}></Route>
                            </Switch>

                        </div>

                    </div>
                </div>
            </Fragment>
        </div>
    )
}
