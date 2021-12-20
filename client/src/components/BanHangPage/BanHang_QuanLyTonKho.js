import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Pagination, Select, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { ModalCapNhatKho } from '../Modals/index';
import { useCookies } from 'react-cookie';

export default function BanHang_QuanLyTonKho() {
    const [cookies, setCookie] = useCookies();
    const [shopID, setShopID] = useState(cookies.shopID);
    const { TabPane } = Tabs;
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);



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

    async function LayDataProductTheoIDShop_ConTrongKho(idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-kho?idShop=' + idShop + '&option=' + 1);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm còn trong kho thất bại");
        }
    }

    async function LayDataProductTheoIDShop_DaHetHang(idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-kho?idShop=' + idShop + '&option=' + 2);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm đã hết hàng thất bại");
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
            message.error("Lấy data sản phẩm theo serach thất bại");
        }
    }

    useEffect(() => {
        LayDataProductTheoIDShop_TheoTrang(0, shopID);
    }, [shopID])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataProductTheoIDShop_TheoTrang(currentPage - 1, shopID);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataProductTheoIDShop_TheoTrang(0, shopID);
        }
        if (trangThaiOption === 1) {
            LayDataProductTheoIDShop_ConTrongKho(shopID);
        }
        if (trangThaiOption === 2) {
            LayDataProductTheoIDShop_DaHetHang(shopID);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalCapNhatKho></ModalCapNhatKho>
            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="Quản lý kho">
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
                                        <Button variant="primary" style={{ width: 200, background: "#17a2b8" }} onClick={() => {
                                            LayDataProductSearch(dataSearch, 0, shopID);
                                        }}>
                                            <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                            setTrangThaiOption(value);
                                        }}>
                                            <Option value={0}>Tất cả</Option>
                                            <Option value={1}>Còn trong kho</Option>
                                            <Option value={2}>Đã bán hết</Option>

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
                                        <th>Tổng số hàng</th>
                                        <th>Số lượng đã bán</th>
                                        <th>Trạng thái</th>
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
                                                    <td style={{ width: 300 }}>{item.ten}</td>
                                                    <td><Image src={item.img.chinh} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                                    <td style={{ width: 200 }}>{item.soLuong}</td>
                                                    <td>{item.soLuongDaBan}</td>
                                                    <td style={{ fontWeight: 'bold' }}>
                                                        {item.soLuongDaBan < item.soLuong ? (<span style={{ color: 'blue', fontWeight: 'bold' }}>Còn hàng</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}>Hết hàng</span>)}
                                                    </td>
                                                    <td>
                                                        <Button  style={{ width: 200, background: "#17a2b8" }} onClick={() => {
                                                            dispatch({ type: 'SHOW_CAPNHATKHO' })
                                                        }}>Nhập hàng</Button>
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
                            {
                                trangThaiOption === 0 && (
                                    <Pagination defaultPageSize={1} current={currentPage} total={tongSoTrang} onChange={(page) => {
                                        setCurrentPage(page);
                                        dispatch({ type: 'SPINNER_DATABASE' });
                                        LayDataProductTheoIDShop_TheoTrang(page - 1, shopID);
                                    }}>
                                    </Pagination>
                                )
                            }

                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}
