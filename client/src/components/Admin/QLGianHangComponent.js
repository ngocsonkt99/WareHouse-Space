import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Spinner, Image } from 'react-bootstrap';
import { Pagination, Input, Select, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default function QLGianHangComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataShop, setDataShop] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [pageNow, setPageNow] = useState(1);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataShopTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop/' + page);
        if (resData.data.status === 'success') {
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data gian hàng thất bại");
        }
    }

    async function LayDataShop_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop-chuakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data gian hàng chưa khóa thất bại");
        }
    }

    async function LayDataShop_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop-dakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data gian hàng đã khóa thất bại");
        }
    }

    async function LayDanhSachGianHangSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data gian hàng theo search thất bại");
        }
    }

    async function KhoaShop(shopID) {
        let res = await axios.put('hethong/users/shop-khoashop', {
            id: shopID
        })

        if (res.data.status === 'success') {
            message.success('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Khóa thất bại !');
        }
    }

    async function MoKhoaShop(shopID) {
        let res = await axios.put('hethong/users/shop-mokhoashop', {
            id: shopID
        })

        if (res.data.status === 'success') {
            message.success('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Mở khóa thất bại !');
        }
    }

    useEffect(() => {
        LayDataShopTheoTrang(pageNow - 1);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataShopTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataShopTheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataShop_ChuaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataShop_DaKhoa_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên shop' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachGianHangSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                    setTrangThaiOption(value);
                                    setPageNow(1);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa khóa</Option>
                                    <Option value={2}>Đã khóa</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên gian hàng</th>
                                <th>Logo</th>
                                <th>Địa chỉ</th>
                                <th>Mô tả gian hàng</th>
                                <th>Ngày tạo</th>
                                {/* <th>Ví WareHouse</th> */}
                                <th>Trạng thái khóa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataShop.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{item.thongTinShop.idShop}</td>
                                            <td>{item.thongTinShop.ten}</td>
                                            <td><Image src={item.thongTinShop.logoShop === '' ? "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" : item.thongTinShop.logoShop} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            <td>{item.thongTinShop.diaChi}</td>
                                            <td>{item.thongTinShop.moTa}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.thongTinShop.ngayTao))}</td>
                                            {/* <td>{item.thongTinShop.viShop}<br></br>
                                                <PaypalExpressBtn
                                                    
                                                />
                                            </td> */}
                                            <td style={{ width: 150 }}><span style={{ color: item.thongTinShop.isLock === false ? 'red' : 'blue' }}><strong>{item.thongTinShop.isLock === false ? 'Chưa khóa' : 'Đã khóa'}</strong></span></td>
                                            <td style={{ width: 100, paddingTop: 45 }}>
                                                <center>
                                                    <Button size='large' type="primary" icon={item.thongTinShop.isLock ? <UnlockOutlined /> : <LockOutlined />} onClick={() => {
                                                        if (item.thongTinShop.isLock) {
                                                            MoKhoaShop(item.thongTinShop.idShop);
                                                        } else {
                                                            KhoaShop(item.thongTinShop.idShop);
                                                        }
                                                    }} />
                                                </center>
                                            </td>
                                        </tr>
                                    })
                                )
                            }
                        </tbody>
                    </Table>
                    {
                        setSpinnerReducer === 1 && (
                            <Spinner animation="border" role="status" style={{ marginLeft: 700 }}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )
                    }
                    <Pagination defaultPageSize={1} current={pageNow} total={tongSoTrang} onChange={(page) => {
                        dispatch({ type: 'SPINNER_DATABASE' });
                        setPageNow(page);
                        if (dataSearch === '') {
                            if (trangThaiOption === 0) {
                                LayDataShopTheoTrang(page - 1);
                            }
                            if (trangThaiOption === 1) {
                                LayDataShop_ChuaKhoa_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 2) {
                                LayDataShop_DaKhoa_TheoTrang(page - 1);
                            }
                        } else {
                            LayDanhSachGianHangSearch(page - 1);
                        }

                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
