import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Spinner } from 'react-bootstrap';
import { Pagination, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLDonHangComponent() {
    const dispatch = useDispatch();
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataDonHang, setDataDonHang] = useState([]);
    const [dataSearch, setDataSearch] = useState('');
    const [dataChiTietDonHang, setDataChiTietDonHang] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [trangThaiShow, setTrangThaiShow] = useState([]);
    const [pageNow, setPageNow] = useState(1);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataDonHangTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/orders/' + page);
        if (resData.data.status === 'success') {
            setDataDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data đơn hàng thất bại");
        }
    }

    async function LayDataChiTietDonHang_TheoIDDonHang(idDonHang) {
        let resData = await axios.get('hethong/order-details-all');
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
        } else {
            message.error("Lấy data chi tiết đơn hàng thất bại");
        }
    }

    async function LayDanhSachDonHangSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/orders-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data đơn hàng theo search thất bại");
        }
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    useEffect(() => {
        LayDataDonHangTheoTrang(pageNow);
    }, []);

    useEffect(() => {
        var array = [];
        for (let index = 0; index < dataDonHang.length; index++) {
            array.push(false);
        }
        setTrangThaiShow(array);
    }, [dataDonHang])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataDonHangTheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    return (
        <Fragment>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID Đơn hàng hoặc Tên khách hàng' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachDonHangSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                </Button>
                               
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>ID Đơn hàng</th>
                                <th>Tên người mua</th>
                                <th>ID tài khoản mua</th>
                                <th>Số lượng sản phẩm</th>
                                <th>Tổng tiền</th>
                                <th>Ngày tạo đơn</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataDonHang.map((item, i) => {
                                        return <Fragment key={i}>
                                            <tr style={{ backgroundColor: trangThaiShow[i] === true ? 'grey' : 'white' }}>
                                                <td>{item.idShow}</td>
                                                <td>{item.thongTinNguoiMua.ten}</td>
                                                <td>{item.idUser}</td>
                                                <td>{item.soLuongSanPham}</td>
                                                <td>{format_curency(item.tongTien.toString())}</td>
                                                <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                                <td>
                                                    <center>
                                                        <a style={{ color: trangThaiShow[i] === true ? 'white' : 'blue' }} href='/' onClick={(e) => {
                                                            e.preventDefault();
                                                            if (trangThaiShow[i] === true) {
                                                                trangThaiShow[i] = false;
                                                                setTrangThaiShow([
                                                                    ...trangThaiShow,
                                                                ])
                                                            } else {
                                                                trangThaiShow[i] = true;
                                                                setTrangThaiShow([
                                                                    ...trangThaiShow,
                                                                ])
                                                            }
                                                            LayDataChiTietDonHang_TheoIDDonHang(item.idShow);
                                                        }}>
                                                            {
                                                                trangThaiShow[i] === true ? (
                                                                    <strong>
                                                                        Đóng <i class="fa fa-angle-up"></i>
                                                                    </strong>
                                                                ) : (<strong>
                                                                    Xem chi tiết <i class="fa fa-angle-down"></i>
                                                                </strong>)
                                                            }

                                                        </a>
                                                    </center>
                                                </td>
                                            </tr>
                                            {
                                                trangThaiShow[i] === true && dataChiTietDonHang.length > 0 && (
                                                    <Fragment>
                                                        <tr style={{ backgroundColor: 'silver' }}>
                                                            <td style={{ fontWeight: 'bold', textAlign: 'center' }}>ID Chi tiết</td>
                                                            <td style={{ fontWeight: 'bold', textAlign: 'center' }} colSpan={2}>Tên sản phẩm</td>
                                                            <td style={{ fontWeight: 'bold', textAlign: 'center' }}>Màu sắc</td>
                                                            <td style={{ fontWeight: 'bold', textAlign: 'center' }}>Size</td>
                                                            <td style={{ fontWeight: 'bold', textAlign: 'center' }}>Số lượng</td>
                                                            <td style={{ fontWeight: 'bold', textAlign: 'center' }}>Thành tiền</td>
                                                            <td style={{ fontWeight: 'bold', textAlign: 'center' }}>Trạng thái</td>
                                                        </tr>
                                                        {
                                                            dataChiTietDonHang.map((item2, i2) => {
                                                                if (item2.idOrder === item.idShow) {
                                                                    return <tr key={i2} style={{ backgroundColor: 'silver' }}>
                                                                        <td >{item2.idShow}</td>
                                                                        <td colSpan={2}>{item2.ten}</td>
                                                                        <td >{item2.mauSac === '' ? 'Không có' : item2.mauSac}</td>
                                                                        <td >{item2.size === '' ? 'Không có' : item2.size}</td>
                                                                        <td >{item2.soLuong}</td>
                                                                        <td >{format_curency(item2.thanhTien.toString())}</td>
                                                                        <td >
                                                                            {
                                                                                item2.trangThai === 0 && (
                                                                                    <span style={{ color: 'blue' }}><strong>Chờ duyệt từ shop</strong></span>
                                                                                )
                                                                            }
                                                                            {
                                                                                item2.trangThai === 1 && (
                                                                                    <span style={{ color: 'red' }}><strong>Shop đã tiếp nhận</strong></span>
                                                                                )
                                                                            }
                                                                            {
                                                                                item2.trangThai === 2 && (
                                                                                    <span style={{ color: '#CC00FF' }}><strong>Đang vận chuyển</strong></span>
                                                                                )
                                                                            }
                                                                            {
                                                                                item2.trangThai === 3 && (
                                                                                    <span style={{ color: '#006600' }}><strong>Khách đã nhận hàng</strong></span>
                                                                                )
                                                                            }
                                                                            {
                                                                                item2.trangThai === 4 && (
                                                                                    <span style={{ color: 'green' }}><strong>Hoàn thành</strong></span>
                                                                                )
                                                                            }
                                                                            {
                                                                                item2.trangThai === 5 && (
                                                                                    <span style={{ color: 'black' }}><strong>Hủy</strong></span>
                                                                                )
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                }
                                                            })
                                                        }
                                                    </Fragment>
                                                )
                                            }
                                        </Fragment>
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
                            LayDataDonHangTheoTrang(page - 1);
                        } else {
                            LayDanhSachDonHangSearch(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
