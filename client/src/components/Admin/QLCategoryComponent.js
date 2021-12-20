import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message, Popconfirm, Button } from 'antd';
import { ModalThemCategory, ModalChiTietCategory } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

export default function QLCategoryComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataCategory, setDataCategory] = useState([]);
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

    async function LayDataCategoryTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/categorys/' + page);
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data danh mục sản phẩm thất bại");
        }
    }

    async function LayDanhSachCategorySearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/categorys-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data danh mục sản phẩm theo search thất bại");
        }
    }

    async function LayDataCategory_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/categorys-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataCategory(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data danh mục sản phẩm chưa khóa thất bại");
        }
    }

    async function LayDataCategory_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/categorys-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataCategory(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data danh mục sản phẩm đã khóa thất bại");
        }
    }

    async function KhoaDanhMuc(id) {
        let res = await axios.put('hethong/categorys-khoa', {
            id: id
        })

        if (res.data.status === 'success') {
            message.success('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Khóa thất bại !');
        }
    }

    async function MoKhoaDanhMuc(id) {
        let res = await axios.put('hethong/categorys-mokhoa', {
            id: id
        })

        if (res.data.status === 'success') {
            message.success('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Mở khóa thất bại !');
        }
    }

    async function XoaDanhMuc(id) {
        let resData = await axios.put('hethong/categorys-xoa', {
            id: id
        });

        if (resData.data.status === 'success') {
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success("Xóa thành công");
        } else {
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            message.error("Xóa thất bại");
        }
    }

    useEffect(() => {
        LayDataCategoryTheoTrang(pageNow - 1);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataCategoryTheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataCategoryTheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataCategory_ChuaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataCategory_DaKhoa_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalThemCategory></ModalThemCategory>
            <ModalChiTietCategory></ModalChiTietCategory>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên Category' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachCategorySearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' value={trangThaiOption} onChange={(value) => {
                                    setTrangThaiOption(value);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa khóa</Option>
                                    <Option value={2}>Đã khóa</Option>
                                </Select>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    dispatch({ type: 'SHOW_THEM_CATEGORY' });
                                }}>
                                    Thêm mới +
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
                                <th>Icon</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái khóa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataCategory.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.ten}</td>
                                            {
                                                item.icon.length === 0 ? <td>Không</td> : <td><i className={item.icon}></i></td>
                                            }
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td><span style={{ color: item.isLock === false ? 'red' : 'blue' }}><strong>{item.isLock === false ? 'Chưa khóa' : 'Đã khóa'}</strong></span></td>
                                            <td style={{ width: 200, paddingTop: 10 }}>
                                                <center>
                                                    <Button type="default" icon={<EditOutlined />} size='large' onClick={() => {
                                                        dispatch({ type: 'SHOW_CHITIET_CATEGORY' });
                                                    }} />
                                                    <Button style={{ marginLeft: 25 }} size='large' type="primary" icon={item.isLock ? <UnlockOutlined /> : <LockOutlined />} onClick={() => {
                                                        if (item.isLock) {
                                                            MoKhoaDanhMuc(item._id);
                                                        } else {
                                                            KhoaDanhMuc(item._id);
                                                        }
                                                    }} />
                                                    <Popconfirm title="Bạn có chắc chắn muốn xóa" okText="Có" cancelText="Không" onConfirm={() => {
                                                        XoaDanhMuc(item._id);
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
                        setPageNow(page);
                        if (dataSearch === '') {
                            if (trangThaiOption === 0) {
                                LayDataCategoryTheoTrang(page - 1);
                            }
                            if (trangThaiOption === 1) {
                                LayDataCategory_ChuaKhoa_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 2) {
                                LayDataCategory_DaKhoa_TheoTrang(page - 1);
                            }
                        } else {
                            LayDanhSachCategorySearch(page - 1);
                        }

                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
