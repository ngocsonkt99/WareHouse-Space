import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message, Button } from 'antd';
import { ModalThemVoucher } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

export default function QLMaGiamGiaComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataVoucher, setDataVoucher] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [pageNow, setPageNow] = useState(1);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataVoucherTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-admin/' + page);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data mã giảm giá thất bại");
        }
    }

    async function LayDanhSachVoucherSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data mã giảm giá theo search thất bại");
        }
    }

    async function LayDataVoucher_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-admin-chuakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data mã giảm giá chưa khóa thất bại");
        }
    }

    async function LayDataVoucher_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-admin-dakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi đã duyệt thất bại");
        }
    }

    async function KhoaVoucher(cauHoiID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.put('hethong/vouchers-khoa', {
            _id: cauHoiID
        });
        if (resData.data.status === 'success') {
            message.success("Khóa thành công");
            dispatch({ type: 'RELOAD_DATABASE' })
        } else {
            message.error("Khóa thất bại");
            dispatch({ type: 'NO_RELOAD_DATABASE' })
        }
    }

    async function MoKhoaVoucher(cauHoiID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.put('hethong/vouchers-mokhoa', {
            _id: cauHoiID
        });
        if (resData.data.status === 'success') {
            message.success("Mở khóa thành công");
            dispatch({ type: 'RELOAD_DATABASE' })

        } else {
            message.error("Mở khóa thất bại");
            dispatch({ type: 'NO_RELOAD_DATABASE' })

        }
    }

    useEffect(() => {
        LayDataVoucherTheoTrang(pageNow - 1);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataVoucherTheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataVoucherTheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataVoucher_ChuaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataVoucher_DaKhoa_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalThemVoucher></ModalThemVoucher>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID voucher' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachVoucherSearch(0);
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
                                    dispatch({ type: 'SHOW_THEM_VOUCHER' });
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
                                <th>Loại giảm</th>
                                <th>Giá trị giảm</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái khóa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataVoucher.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.ten}</td>
                                            <td>{item.loaiGiamGia === 0 ? 'Theo thành tiền' : 'Theo phần trăm'}</td>
                                            {
                                                item.loaiGiamGia === 0 && (
                                                    <td>{format_curency(item.giaTriGiam.toString())} đ</td>
                                                )
                                            }
                                            {
                                                item.loaiGiamGia === 1 && (
                                                    <td>{item.giaTriGiam}%</td>
                                                )
                                            }
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayBatDau))}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayKetThuc))}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td style={{ width: 150 }}><span style={{ color: item.isLock === false ? 'red' : 'blue' }}><strong>{item.isLock === false ? 'Chưa khóa' : 'Đã khóa'}</strong></span></td>
                                            <td style={{ width: 100, paddingTop: 15 }}>
                                                <center>
                                                    <Button size='large' type="primary" icon={item.isLock ? <UnlockOutlined /> : <LockOutlined />} onClick={() => {
                                                        if (item.isLock) {
                                                            MoKhoaVoucher(item._id);
                                                        } else {
                                                            KhoaVoucher(item._id);
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
                        if (dataSearch === '') {
                            if (trangThaiOption === 0) {
                                LayDataVoucherTheoTrang(page - 1);
                            }
                            if (trangThaiOption === 1) {
                                LayDataVoucher_ChuaKhoa_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 2) {
                                LayDataVoucher_DaKhoa_TheoTrang(page - 1);
                            }
                        } else {
                            LayDanhSachVoucherSearch(page - 1);
                        }

                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
