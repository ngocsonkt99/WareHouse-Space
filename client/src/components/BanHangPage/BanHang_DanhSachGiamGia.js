import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Pagination, Select, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { ModalCapNhatGiaTriGiamGia } from '../Modals/index';
import { useCookies } from 'react-cookie';

export default function BanHang_DanhSachGiamGia() {
    const [cookies, setCookie] = useCookies();
    const [shopID, setShopID] = useState(cookies.shopID);
    const { TabPane } = Tabs;
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
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

    async function LayDataProductGiamGiaTheoIdShop(page, shopID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-sale/' + page + '?shopID=' + shopID);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm giảm giá thất bại");
        }
    }

    async function LayDataProductKhongGiamGiaTheoIdShop(page, shopID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-shop-nosale/' + page + '?shopID=' + shopID);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm không giảm giá thất bại");
        }
    }

    useEffect(() => {
        LayDataProductGiamGiaTheoIdShop(0, shopID);
    }, [shopID])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            if (trangThaiOption === 0) {
                LayDataProductGiamGiaTheoIdShop(currentPage - 1, shopID);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                setTrangThaiOption(0);
            } else {
                LayDataProductKhongGiamGiaTheoIdShop(currentPage - 1, shopID);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                setTrangThaiOption(1);
            }
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataProductGiamGiaTheoIdShop(0, shopID);
        }
        if (trangThaiOption === 1) {
            LayDataProductKhongGiamGiaTheoIdShop(0, shopID);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalCapNhatGiaTriGiamGia></ModalCapNhatGiaTriGiamGia>
            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="Danh sách giảm giá">
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
                                        <Button variant="primary" style={{ width: 200, background: "#17a2b8"  }} onClick={() => {
                                            LayDataProductSearch(dataSearch, 0, shopID);
                                        }}>
                                            <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                            setTrangThaiOption(value);
                                        }}>
                                            <Option value={0}>Các sản phẩm giảm giá</Option>
                                            <Option value={1}>Các sản phẩm không giảm giá</Option>

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
                                        <th>Giá trị giảm</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        setSpinnerReducer === 0 && (
                                            dataProduct.map((item, i) => {
                                                return <tr key={item._id}>
                                                    <td>{item.idShow}</td>
                                                    <td style={{ width: 500 }}>{item.ten}</td>
                                                    <td><Image src={item.img.chinh} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                                    <td>{item.giaTriGiamGia < 100 ? item.giaTriGiamGia.toString() + '%' : format_curency(item.giaTriGiamGia.toString()) + ' đ'}</td>
                                                    <td>
                                                        <Button type="primary"  style={{ width: 200, background: "#17a2b8" }} onClick={() => {
                                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                                            dispatch({ type: 'SHOW_CAPNHATGIATRIGIAM' });
                                                        }}>Cập nhật giá sale</Button>
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

                            <Pagination defaultPageSize={1} current={currentPage} total={tongSoTrang} onChange={(page) => {
                                setCurrentPage(page);
                                dispatch({ type: 'SPINNER_DATABASE' });
                                if (trangThaiOption === 0) {
                                    LayDataProductGiamGiaTheoIdShop(page - 1, shopID);
                                } else {
                                    LayDataProductKhongGiamGiaTheoIdShop(page - 1, shopID);
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
