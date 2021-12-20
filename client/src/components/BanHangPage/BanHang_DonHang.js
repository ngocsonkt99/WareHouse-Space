import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Pagination, Select, Input, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Table, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { ModalChiTietDonHang_ChuShop } from '../Modals/index';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';


export default function BanHang_DonHang() {
    const [cookies, setCookie] = useCookies();
    const [shopID, setShopID] = useState(cookies.shopID);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const { TabPane } = Tabs;
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataChiTietDonHang, setDataChiTietDonHang] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [dataShowChiTietDonHang, setDataShowChiTietDonHang] = useState({
        idShow: '',
        ten: '',
        thanhTien: '',
        soLuong: '',
        mauSac: '',
        size: '',
        ghiChu: '',
        trangThai: ''
    })
    const [dataNguoiMua, setDataNguoiMua] = useState({
        ten: '',
        sdt: '',
        diaChi: ''
    })

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataChiTietDonHang_TheoIDShop_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/order-details-shop/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thất bại");
        }
    }

    async function LayDataDonHang(idOrder, idOrderDetail) {
        var ketqua = false;
        let resData = await axios.get('hethong/orders-item?idOrder=' + idOrder);
        if (resData.data.status === 'success') {
            ketqua = true;
            setDataNguoiMua({
                ten: resData.data.data.thongTinNguoiMua.ten,
                sdt: resData.data.data.thongTinNguoiMua.sdt,
                diaChi: resData.data.data.thongTinNguoiMua.diaChi
            })
        } else {
            message.error("Lấy data đơn hàng thất bại");
        }

        if (ketqua === true) {
            LayDataChiTietDonHangTheoIdChiTietDonHang(idOrderDetail);
        }
    }

    async function LayDataChiTietDonHangTheoIdChiTietDonHang(idOrderDetail) {
        var ketqua = false;
        let resData = await axios.get('hethong/order-details-item?idOrderDetail=' + idOrderDetail);
        if (resData.data.status === 'success') {
            ketqua = true;
            setDataShowChiTietDonHang({
                idShow: resData.data.data.idShow,
                ten: resData.data.data.ten,
                thanhTien: resData.data.data.thanhTien,
                soLuong: resData.data.data.soLuong,
                mauSac: resData.data.data.mauSac,
                size: resData.data.data.size,
                ghiChu: resData.data.data.ghiChu,
                trangThai: resData.data.data.trangThai
            });
        } else {
            message.error("Lấy data chi tiết đơn hàng thất bại");
        }

        if (ketqua === true) {
            dispatch({ type: 'SHOW_CHITIET_DONHANG_CHUSHOP' });
        }
    }

    async function LayDataChiTietDonHang_TheoIDShop_ChoDuyet_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/order-details-shop-choduyet/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data chi tiết đơn hàng chờ duyệt thất bại");
        }
    }

    async function LayDataChiTietDonHang_TheoIDShop_DaDuyet_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/order-details-shop-daduyet/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data chi tiết đơn hàng đã duyệt thất bại");
        }
    }

    async function LayDataChiTietDonHang_TheoIDShop_DangVanChuyen_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/order-details-shop-dangvanchuyen/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data chi tiết đơn hàng đang vận chuyển thất bại");
        }
    }

    async function LayDataChiTietDonHang_TheoIDShop_KhachNhanHang_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/order-details-shop-khachnhanhang/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data chi tiết đơn hàng khách đã nhận hàng thất bại");
        }
    }

    async function SuaTrangThaiThanh_DaDuyet(id) {
        let result = await axios.put('hethong/order-details-sua-daduyet', {
            id: id
        });

        if (result.data.status === 'success') {
            CapNhatLichSu(id, 1);
        } else {
            message.error('Sửa trạng thái thất bại');
        }
    }

    async function CapNhatLichSu(idOrderDetail, trangThai) {
        let result = await axios.put('hethong/lichsu-capnhat', {
            idOrderDetail: idOrderDetail,
            trangThai: trangThai
        });

        if (result.data.status === 'success') {
            message.success('Đã cập nhật trạng thái thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Cập nhật trạng thái thất bại')
        }
    }

    async function LayDataChiTietDonHang_TheoIDShop_HoanThanh_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/order-details-shop-hoanthanh/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data chi tiết đơn hàng đã hoàn thành thất bại");
        }
    }

    async function LayDataChiTietDonHang_TheoIDShop_Huy_TheoTrang(page, idShop) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/order-details-shop-huy/' + page + '?idShop=' + idShop);
        if (resData.data.status === 'success') {
            setDataChiTietDonHang(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data chi tiết đơn hàng đã hủy thất bại");
        }
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    useEffect(() => {
        LayDataChiTietDonHang_TheoIDShop_TheoTrang(0, shopID);
    }, [shopID]);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            if (trangThaiOption === 0) {
                LayDataChiTietDonHang_TheoIDShop_TheoTrang(currentPage - 1, shopID);
            }
            if (trangThaiOption === 1) {
                LayDataChiTietDonHang_TheoIDShop_ChoDuyet_TheoTrang(currentPage - 1, shopID);
            }
            if (trangThaiOption === 2) {
                LayDataChiTietDonHang_TheoIDShop_DaDuyet_TheoTrang(currentPage - 1, shopID);
            }
            if (trangThaiOption === 3) {
                LayDataChiTietDonHang_TheoIDShop_DangVanChuyen_TheoTrang(currentPage - 1, shopID);
            }
            if (trangThaiOption === 4) {
                LayDataChiTietDonHang_TheoIDShop_KhachNhanHang_TheoTrang(currentPage - 1, shopID);
            }
            if (trangThaiOption === 5) {
                LayDataChiTietDonHang_TheoIDShop_HoanThanh_TheoTrang(currentPage - 1, shopID);
            }
            if (trangThaiOption === 6) {
                LayDataChiTietDonHang_TheoIDShop_Huy_TheoTrang(currentPage - 1, shopID);
            }
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataChiTietDonHang_TheoIDShop_TheoTrang(0, shopID);
        }
        if (trangThaiOption === 1) {
            LayDataChiTietDonHang_TheoIDShop_ChoDuyet_TheoTrang(0, shopID);
        }
        if (trangThaiOption === 2) {
            LayDataChiTietDonHang_TheoIDShop_DaDuyet_TheoTrang(0, shopID);
        }
        if (trangThaiOption === 3) {
            LayDataChiTietDonHang_TheoIDShop_DangVanChuyen_TheoTrang(0, shopID);
        }
        if (trangThaiOption === 4) {
            LayDataChiTietDonHang_TheoIDShop_KhachNhanHang_TheoTrang(0, shopID);
        }
        if (trangThaiOption === 5) {
            LayDataChiTietDonHang_TheoIDShop_HoanThanh_TheoTrang(0, shopID);
        }
        if (trangThaiOption === 6) {
            LayDataChiTietDonHang_TheoIDShop_Huy_TheoTrang(0, shopID);
        }
    }, [trangThaiOption]);


    return (
        <Fragment>
            <ModalChiTietDonHang_ChuShop dataNguoiMua={dataNguoiMua} dataShowChiTietDonHang={dataShowChiTietDonHang}></ModalChiTietDonHang_ChuShop>
            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="Đơn hàng">
                    <div className="col" style={{ padding: 20 }}>
                        <div className="col" style={{ width: '100%' }}>
                            <Form>
                                <Row>
                                    <Col>
                                        <Input size='large'  placeholder='Tìm theo mã đơn hàng hoặc tên người mua' onChange={(e) => {

                                        }}></Input>
                                    </Col>
                                    <Col>
                                        <Button type="primary" style={{ width: 200, height: 40, background: "#17a2b8" }} onClick={() => {
                                            console.log(dataChiTietDonHang)
                                        }}>
                                            <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                            setTrangThaiOption(value);
                                        }}>
                                            <Option value={0}>Tất cả</Option>
                                            <Option value={1}>Chờ duyệt</Option>
                                            <Option value={2}>Đã duyệt</Option>
                                            <Option value={3}>Đang vận chuyển</Option>
                                            <Option value={4}>Khách đã nhận hàng</Option>
                                            <Option value={5}>Hoàn thành</Option>
                                            <Option value={6}>Hủy</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="col" style={{ width: '100%', marginTop: 20 }}>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID Đơn hàng</th>
                                        <th>ID Chi tiết</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Tổng tiền</th>
                                        <th>Ngày đặt</th>
                                        <th>Trạng thái</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        setSpinnerReducer === 0 && (
                                            dataChiTietDonHang.map((item, i) => {
                                                return <tr key={i}>
                                                    <td>{item.idOrder}</td>
                                                    <td>{item.idShow}</td>
                                                    <td style={{ width: 400 }}>{item.ten}</td>
                                                    <td>{format_curency(item.thanhTien.toString())}</td>
                                                    <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                                    <td>
                                                        {
                                                            item.trangThai === 0 && (
                                                                <span style={{ color: 'red' }}><strong>Chưa duyệt</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 1 && (
                                                                <span style={{ color: 'blue' }}><strong>Đã duyệt</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 2 && (
                                                                <span style={{ color: '#CC00FF' }}><strong>Đang vận chuyển</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 3 && (
                                                                <span style={{ color: '#006600' }}><strong>Khách đã nhận hàng</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 4 && (
                                                                <span style={{ color: 'green' }}><strong>Hoàn thành</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 5 && (
                                                                <span style={{ color: 'black' }}><strong>Hủy</strong></span>
                                                            )
                                                        }
                                                    </td>
                                                    <td style={{ width: 200, paddingTop: 10 }}>
                                                        <center>
                                                            <Button type="default" icon={<EditOutlined />} size='large' onClick={() => {
                                                                LayDataDonHang(item.idOrder, item.idShow);
                                                            }} />
                                                            {
                                                                item.trangThai === 0 && (
                                                                    <Button style={{ marginLeft: 25 }} size='large' type="danger" icon={<CheckOutlined />}
                                                                        onClick={() => {
                                                                            SuaTrangThaiThanh_DaDuyet(item.idShow);
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
                            <Pagination defaultPageSize={1} current={currentPage} total={tongSoTrang} onChange={(page) => {
                                setCurrentPage(page);
                                dispatch({ type: 'SPINNER_DATABASE' });
                                if (trangThaiOption === 0) {
                                    LayDataChiTietDonHang_TheoIDShop_TheoTrang(page - 1, shopID);
                                }
                                if (trangThaiOption === 1) {
                                    LayDataChiTietDonHang_TheoIDShop_ChoDuyet_TheoTrang(page - 1, shopID);
                                }
                                if (trangThaiOption === 2) {
                                    LayDataChiTietDonHang_TheoIDShop_DaDuyet_TheoTrang(page - 1, shopID);
                                }
                                if (trangThaiOption === 3) {
                                    LayDataChiTietDonHang_TheoIDShop_DangVanChuyen_TheoTrang(page - 1, shopID);
                                }
                                if (trangThaiOption === 4) {
                                    LayDataChiTietDonHang_TheoIDShop_KhachNhanHang_TheoTrang(page - 1, shopID);
                                }
                                if (trangThaiOption === 5) {
                                    LayDataChiTietDonHang_TheoIDShop_HoanThanh_TheoTrang(page - 1, shopID);
                                }
                                if (trangThaiOption === 6) {
                                    LayDataChiTietDonHang_TheoIDShop_Huy_TheoTrang(page - 1, shopID);
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
