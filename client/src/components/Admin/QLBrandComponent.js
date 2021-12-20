import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Select, Input, message, Button, Popconfirm } from 'antd';
import { ModalThemBrand, ModalChiTietBrand } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

export default function QLBrandComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataBrand, setDataBrand] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [pageNow, setPageNow] = useState(1);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var now = new Date();
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataBrandTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu thất bại");
        }
    }

    async function LayDataBrand_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu chưa khóa thất bại");
        }
    }

    async function LayDataBrand_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu đã khóa thất bại");
        }
    }

    async function LayDanhSachBrandSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu theo search thất bại");
        }
    }

    async function KhoaThuongHieu(id) {
        let res = await axios.put('hethong/brands-khoa', {
            id: id
        })

        if (res.data.status === 'success') {
            message.success('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Khóa thất bại !');
        }
    }

    async function MoKhoaThuongHieu(id) {
        let res = await axios.put('hethong/brands-mokhoa', {
            id: id
        })

        if (res.data.status === 'success') {
            message.success('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Mở khóa thất bại !');
        }
    }

    async function XoaThuongHieu(id) {
        let resData = await axios.put('hethong/brands-xoa', {
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
        LayDataBrandTheoTrang(pageNow - 1);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataBrandTheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataBrandTheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataBrand_ChuaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataBrand_DaKhoa_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalThemBrand></ModalThemBrand>
            <ModalChiTietBrand></ModalChiTietBrand>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên thương hiệu' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachBrandSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                </Button>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    dispatch({ type: 'SHOW_THEM_BRAND' });
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
                                <th>Hình ảnh</th>
                                <th>Xuất xứ</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái khóa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataBrand.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {

                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td style={{ width: 300 }}>{item.ten}</td>
                                            {
                                                item.img.length === 0 ? <td><Image src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td> :
                                                    <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            }
                                            <td>{item.xuatXu}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td><span style={{ color: item.isLock === false ? 'red' : 'blue' }}><strong>{item.isLock === false ? 'Chưa khóa' : 'Đã khóa'}</strong></span></td>
                                            <td style={{ width: 200, paddingTop: 40 }}>
                                                <center>
                                                    <Button type="default" icon={<EditOutlined />} size='large' onClick={() => {
                                                        dispatch({ type: 'SHOW_CHITIET_BRAND' });
                                                    }} />
                                                    <Button style={{ marginLeft: 25 }} size='large' type="primary" icon={item.isLock ? <UnlockOutlined /> : <LockOutlined />} onClick={() => {
                                                        if (item.isLock) {
                                                            MoKhoaThuongHieu(item._id);
                                                        } else {
                                                            KhoaThuongHieu(item._id);
                                                        }
                                                    }} />
                                                    <Popconfirm title="Bạn có chắc chắn muốn xóa" okText="Có" cancelText="Không" onConfirm={() => {
                                                        XoaThuongHieu(item._id);
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
                                LayDataBrandTheoTrang(page - 1);
                            }
                            if (trangThaiOption === 1) {
                                LayDataBrand_ChuaKhoa_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 2) {
                                LayDataBrand_DaKhoa_TheoTrang(page - 1);
                            }
                        } else {
                            LayDanhSachBrandSearch(page - 1);
                        }

                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
