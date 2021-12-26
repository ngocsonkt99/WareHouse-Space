import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message, Button, Popconfirm } from 'antd';
import { ModalChiTietProduct_Admin } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { EyeOutlined, LockOutlined, UnlockOutlined, CheckOutlined } from '@ant-design/icons';

export default function QLProductComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [pageNow, setPageNow] = useState(1);

    async function LayDataProductTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm thất bại");
        }
    }

    async function LayDataProduct_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm chưa khóa thất bại");
        }
    }

    async function LayDataProduct_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm đã khóa thất bại");
        }
    }

    async function LayDataProduct_ChuaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-chuaduyet/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm chưa duyệt thất bại");
        }
    }

    async function LayDataProduct_DaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-daduyet/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm đã duyệt thất bại");
        }
    }

    async function DuyetSanPham(idProduct) {
        let res = await axios.put('hethong/products-duyetsanpham', {
            id: idProduct
        });
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (res.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success('Duyệt sản phẩm thành công');
        } else {
            message.error("Duyệt sản phẩm thất bại");
        }
    }

    async function KhoaSanPham(idProduct) {
        let res = await axios.put('hethong/products-khoasanpham', {
            id: idProduct
        });
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (res.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success('Khóa sản phẩm thành công');
        } else {
            message.error("Khóa sản phẩm thất bại !");
        }
    }

    async function MoKhoaSanPham(idProduct) {
        let res = await axios.put('hethong/products-mokhoasanpham', {
            id: idProduct
        });
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (res.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success('Mở khóa sản phẩm thành công');
        } else {
            message.error("Mở khóa sản phẩm thất bại !");
        }
    }

    async function LayDanhSachBrandSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-search-admin/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu thất bại");
        }
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    useEffect(() => {
        LayDataProductTheoTrang(pageNow - 1);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataProductTheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataProductTheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataProduct_ChuaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataProduct_DaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 3) {
            LayDataProduct_ChuaDuyet_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 4) {
            LayDataProduct_DaDuyet_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalChiTietProduct_Admin></ModalChiTietProduct_Admin>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên sản phẩm' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    LayDanhSachBrandSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' value={trangThaiOption} onChange={(value) => {
                                    setTrangThaiOption(value);
                                    setPageNow(1);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa khóa</Option>
                                    <Option value={2}>Đã khóa</Option>
                                    <Option value={3}>Chưa duyệt</Option>
                                    <Option value={4}>Đã duyệt</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Hình ảnh</th>
                                <th>Giá</th>
                                <th>Trạng thái duyệt</th>
                                <th>Trạng thái khóa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataProduct.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td style={{ width: 250 }}>{item.ten}</td>
                                            <td><Image src={item.img.chinh} style={{ width: 150, height: 120, marginLeft: 30 }}></Image></td>
                                            <td>{format_curency(item.gia.toString())}</td>
                                            <td><span style={{ color: item.isAccept === false ? 'red' : 'blue' }}><strong>{item.isAccept === false ? 'Chưa duyệt' : 'Đã duyệt'}</strong></span></td>
                                            <td><span style={{ color: item.isLock === false ? 'red' : 'blue' }}><strong>{item.isLock === false ? 'Chưa khóa' : 'Đã khóa'}</strong></span></td>
                                            <td style={{ width: 200, paddingTop: 40 }}>
                                                <center>
                                                    <Button type="default" icon={<EyeOutlined />} size='large' onClick={() => {
                                                        dispatch({ type: 'SHOW_CHITIET_PRODUCT_ADMIN' });
                                                    }} />
                                                    <Button style={{ marginLeft: 25 }} size='large' type="primary" icon={item.isLock ? <UnlockOutlined /> : <LockOutlined />} onClick={() => {
                                                        if (item.isLock) {
                                                            MoKhoaSanPham(item._id);
                                                        } else {
                                                            KhoaSanPham(item._id);
                                                        }
                                                    }} />
                                                    {
                                                        item.isAccept === false && (
                                                            <Button style={{ marginLeft: 25 }} size='large' type="primary" icon={<CheckOutlined />} onClick={() => {
                                                                DuyetSanPham(item._id);
                                                            }} />
                                                        )
                                                    }
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
                        if (trangThaiOption === 0) {
                            LayDataProductTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataProduct_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataProduct_DaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 3) {
                            LayDataProduct_ChuaDuyet_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 4) {
                            LayDataProduct_DaDuyet_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
