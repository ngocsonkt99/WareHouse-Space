import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Pagination, Select, Input, message, Popconfirm, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { ModalChiTietProduct_ChuShop } from '../Modals/index';
import { useCookies } from 'react-cookie';
import { CheckOutlined, EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

export default function BanHang_DanhSachSanPham() {
    const [cookies, setCookie] = useCookies();
    const [shopID, setShopID] = useState(cookies.shopID);
    const { TabPane } = Tabs;
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [pageNow, setPageNow] = useState(1);
    let history = useHistory();

    async function LayDataProductTheoIDShop_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm thất bại");
        }
    }

    async function LayDataProductTheoIDShop_ChuaDuyet_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-chuaduyet/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm chưa duyệt thất bại");
        }
    }

    async function LayDataProductTheoIDShop_DaDuyet_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-daduyet/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm đã duyệt thất bại");
        }
    }

    async function LayDataProductTheoIDShop_DaKhoa_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-dakhoa/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm đã khóa thất bại");
        }
    }

    async function LayDataProductTheoIDShop_ChuaKhoa_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-chuakhoa/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm chưa khóa thất bại");
        }
    }

    async function LayDataProductSearch(dataSearch, page, shopID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-search/' + page + '?search=' + dataSearch + '&shopID=' + shopID);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm theo search thất bại");
        }
    }

    async function XoaProduct(productID) {
        let resData = await axios.put('hethong/products-xoa', {
            id: productID
        });

        if (resData.data.status === 'success') {
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success("Xóa thành công");
        } else {
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            message.error("Xóa thất bại");
        }
    }

    async function KhoaProduct(productID) {
        let resData = await axios.put('hethong/products-khoasanpham', {
            id: productID
        });

        if (resData.data.status === 'success') {
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success("Khóa thành công");
        } else {
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            message.error("Khóa thất bại");
        }
    }

    async function MoKhoaProduct(productID) {
        let resData = await axios.put('hethong/products-mokhoasanpham', {
            id: productID
        });

        if (resData.data.status === 'success') {
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success("Mở khóa thành công");
        } else {
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            message.error("Mở khóa thất bại");
        }
    }

    useEffect(() => {
        LayDataProductTheoIDShop_TheoTrang(pageNow - 1, shopID);
    }, [shopID])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataProductTheoIDShop_TheoTrang(pageNow - 1, shopID);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataProductTheoIDShop_TheoTrang(pageNow - 1, shopID);
        }
        if (trangThaiOption === 1) {
            LayDataProductTheoIDShop_DaDuyet_TheoTrang(pageNow - 1, shopID);
        }
        if (trangThaiOption === 2) {
            LayDataProductTheoIDShop_ChuaDuyet_TheoTrang(pageNow - 1, shopID);
        }
        if (trangThaiOption === 3) {
            LayDataProductTheoIDShop_DaKhoa_TheoTrang(pageNow - 1, shopID);
        }
        if (trangThaiOption === 4) {
            LayDataProductTheoIDShop_ChuaKhoa_TheoTrang(pageNow - 1, shopID);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalChiTietProduct_ChuShop></ModalChiTietProduct_ChuShop>
            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="Danh sách sản phẩm">
                    <div className="col" style={{ padding: 20 }}>
                        <div className="col" style={{ width: '100%' }}>
                            <Form>
                                <Row>
                                    <Col>
                                        <Input size='large' placeholder='ID,Tên sản phẩm' onChange={(e) => {
                                            setDataSearch(e.target.value);
                                        }}></Input>
                                    </Col>
                                    <Col>
                                        <Button type="primary" style={{ width: 200, height: 40, background: "#17a2b8" }} onClick={() => {
                                            LayDataProductSearch(dataSearch, 0, shopID);
                                            setPageNow(1);
                                        }}>
                                            <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                            setTrangThaiOption(value);
                                        }}>
                                            <Option value={0}>Tất cả</Option>
                                            <Option value={1}>Đã duyệt</Option>
                                            <Option value={2}>Chưa duyệt</Option>
                                            <Option value={3}>Đã khóa</Option>
                                            <Option value={4}>Chưa khóa</Option>
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Button type="primary" style={{ width: 200, height: 40, background: "#17a2b8" }} onClick={() => {
                                            history.push('/banhang/san-pham/tao-moi-san-pham');
                                        }}>
                                            Tạo mới +
                                        </Button>
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
                                        <th>Hình ảnh chính</th>
                                        <th>Trạng thái khóa</th>
                                        <th>Trạng thái duyệt</th>
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
                                                    <td>{item.ten}</td>
                                                    <td><Image src={item.img.chinh} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                                    <td style={{ color: item.isLock === true ? 'blue' : 'red', fontWeight: 'bold' }}>{item.isLock === false ? "Chưa khóa" : "Đã khóa"}</td>
                                                    <td style={{ color: item.isAccept === true ? 'blue' : 'red', fontWeight: 'bold' }}>{item.isAccept === false ? "Chưa được Admin duyệt" : "Đã được Admin duyệt"}</td>
                                                    <td style={{ width: 300, paddingTop: 40 }}>
                                                        <center>
                                                            <Button type="default" icon={<EditOutlined />} size='large' onClick={() => {
                                                                dispatch({ type: 'SHOW_CHITIET_PRODUCT_CHUSHOP' });
                                                            }} />
                                                            <Button style={{ marginLeft: 25 }} size='large' type="primary" icon={item.isLock ? <UnlockOutlined /> : <LockOutlined />} onClick={() => {
                                                                if (item.isLock) {
                                                                    MoKhoaProduct(item._id);
                                                                } else {
                                                                    KhoaProduct(item._id);
                                                                }
                                                            }} />
                                                            <Popconfirm title="Bạn có chắc chắn muốn xóa" okText="Có" cancelText="Không" onConfirm={() => {
                                                                XoaProduct(item._id);
                                                            }}>
                                                                <Button style={{ marginLeft: 25 }} size='large' type="danger" icon={<DeleteOutlined />} />
                                                            </Popconfirm>

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
                                setPageNow(page)
                                if (dataSearch === '') {
                                    if (trangThaiOption === 0) {
                                        LayDataProductTheoIDShop_TheoTrang(page - 1, shopID);
                                    }
                                    if (trangThaiOption === 1) {
                                        LayDataProductTheoIDShop_DaDuyet_TheoTrang(page - 1, shopID);
                                    }
                                    if (trangThaiOption === 2) {
                                        LayDataProductTheoIDShop_ChuaDuyet_TheoTrang(page - 1, shopID);
                                    }
                                    if (trangThaiOption === 3) {
                                        LayDataProductTheoIDShop_DaKhoa_TheoTrang(page - 1, shopID);
                                    }
                                    if (trangThaiOption === 4) {
                                        LayDataProductTheoIDShop_ChuaKhoa_TheoTrang(page - 1, shopID);
                                    }
                                } else {
                                    LayDataProductSearch(dataSearch, page - 1, shopID);
                                }

                            }}>
                            </Pagination>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}
