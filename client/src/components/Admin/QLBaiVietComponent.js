import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Select, Input, message, Button, Popconfirm } from 'antd';
import { ModalThemBaiViet, ModalChiTietBaiViet } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { DeleteOutlined, EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';

export default function QLBaiVietComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [pageNow, setPageNow] = useState(1);
    const [dataBaiViet, setDataBaiViet] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataBaiViet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let res = await axios.get('hethong/baiviet-showadmin/' + page);

        if (res.data.status === 'success') {
            setDataBaiViet(res.data.data);
            setTongSoTrang(res.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error('Lấy data bài viết từ admin thất bại');
        }
    }

    async function LayDanhSachBaiVietSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/baiviet-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataBaiViet(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data bài viết theo search thất bại");
        }
    }

    async function LayDataBaiViet_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/baiviet-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBaiViet(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data bài viết chưa khóa thất bại");
        }
    }

    async function LayDataBaiViet_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/baiviet-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBaiViet(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data bài viết đã khóa thất bại");
        }
    }

    async function KhoaBaiViet(id) {
        let res = await axios.put('hethong/baiviet-khoa', {
            id: id
        })

        if (res.data.status === 'success') {
            message.success('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Khóa thất bại !');
        }
    }

    async function MoKhoaBaiViet(id) {
        let res = await axios.put('hethong/baiviet-mokhoa', {
            id: id
        })

        if (res.data.status === 'success') {
            message.success('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Mở khóa thất bại !');
        }
    }

    async function XoaBaiViet(baiVietID) {
        let resData = await axios.put('hethong/baiviet-xoa', {
            id: baiVietID
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
        LayDataBaiViet_TheoTrang(pageNow - 1);
    }, [])

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataBaiViet_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataBaiViet_ChuaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataBaiViet_DaKhoa_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataBaiViet_TheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    return (
        <Fragment>
            <ModalThemBaiViet ></ModalThemBaiViet>
            <ModalChiTietBaiViet></ModalChiTietBaiViet>
            <div >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tiêu đề bài viết' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachBaiVietSearch(0);
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
                                <Button  style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    dispatch({ type: 'SHOW_THEM_BAIVIET' });
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
                                <th>Tiêu đề</th>
                                <th>Hình ảnh</th>
                                <th>Loại bài viết</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái khóa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataBaiViet.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td style={{ width: 400 }}>{item.tieuDe}</td>
                                            <td style={{ width: 250 }}><Image src={item.img} style={{ width: 200, height: 100 }}></Image></td>
                                            <td>{item.loaiBaiViet === 0 ? "Chương trình/sự kiện" : "Giới thiệu"}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td><span style={{ color: item.isLock === false ? 'red' : 'blue' }}><strong>{item.isLock === false ? 'Chưa khóa' : 'Đã khóa'}</strong></span></td>
                                            <td style={{ width: 200, paddingTop: 45 }}>
                                                <center>
                                                    <Button type="default" icon={<EditOutlined />} size='large' onClick={() => {
                                                        dispatch({ type: 'SHOW_CHITIET_BAIVIET' });
                                                    }} />
                                                    <Button style={{ marginLeft: 25 }} size='large' type="primary" icon={item.isLock ? <UnlockOutlined /> : <LockOutlined />} onClick={() => {
                                                        if (item.isLock) {
                                                            MoKhoaBaiViet(item._id);
                                                        } else {
                                                            KhoaBaiViet(item._id);
                                                        }
                                                    }} />
                                                    <Popconfirm title="Bạn có chắc chắn muốn xóa" okText="Có" cancelText="Không" onConfirm={() => {
                                                        XoaBaiViet(item._id);
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
                                LayDataBaiViet_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 1) {
                                LayDataBaiViet_ChuaKhoa_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 2) {
                                LayDataBaiViet_DaKhoa_TheoTrang(page - 1);
                            }
                        } else {
                            LayDanhSachBaiVietSearch(page - 1);
                        }

                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
