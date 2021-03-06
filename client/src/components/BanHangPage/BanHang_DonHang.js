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
            message.error("L???y data th???t b???i");
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
            message.error("L???y data ????n h??ng th???t b???i");
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
            message.error("L???y data chi ti???t ????n h??ng th???t b???i");
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
            message.error("L???y data chi ti???t ????n h??ng ch??? duy???t th???t b???i");
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
            message.error("L???y data chi ti???t ????n h??ng ???? duy???t th???t b???i");
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
            message.error("L???y data chi ti???t ????n h??ng ??ang v???n chuy???n th???t b???i");
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
            message.error("L???y data chi ti???t ????n h??ng kh??ch ???? nh???n h??ng th???t b???i");
        }
    }

    async function SuaTrangThaiThanh_DaDuyet(id) {
        let result = await axios.put('hethong/order-details-sua-daduyet', {
            id: id
        });

        if (result.data.status === 'success') {
            CapNhatLichSu(id, 1);
        } else {
            message.error('S???a tr???ng th??i th???t b???i');
        }
    }

    async function CapNhatLichSu(idOrderDetail, trangThai) {
        let result = await axios.put('hethong/lichsu-capnhat', {
            idOrderDetail: idOrderDetail,
            trangThai: trangThai
        });

        if (result.data.status === 'success') {
            message.success('???? c???p nh???t tr???ng th??i th??nh c??ng');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('C???p nh???t tr???ng th??i th???t b???i')
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
            message.error("L???y data chi ti???t ????n h??ng ???? ho??n th??nh th???t b???i");
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
            message.error("L???y data chi ti???t ????n h??ng ???? h???y th???t b???i");
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
                <TabPane key={1} tab="????n h??ng">
                    <div className="col" style={{ padding: 20 }}>
                        <div className="col" style={{ width: '100%' }}>
                            <Form>
                                <Row>
                                    <Col>
                                        <Input size='large'  placeholder='T??m theo m?? ????n h??ng ho???c t??n ng?????i mua' onChange={(e) => {

                                        }}></Input>
                                    </Col>
                                    <Col>
                                        <Button type="primary" style={{ width: 200, height: 40, background: "#17a2b8" }} onClick={() => {
                                            console.log(dataChiTietDonHang)
                                        }}>
                                            <i className="fa fa-search"></i> &nbsp; T??m ki???m
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                            setTrangThaiOption(value);
                                        }}>
                                            <Option value={0}>T???t c???</Option>
                                            <Option value={1}>Ch??? duy???t</Option>
                                            <Option value={2}>???? duy???t</Option>
                                            <Option value={3}>??ang v???n chuy???n</Option>
                                            <Option value={4}>Kh??ch ???? nh???n h??ng</Option>
                                            <Option value={5}>Ho??n th??nh</Option>
                                            <Option value={6}>H???y</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className="col" style={{ width: '100%', marginTop: 20 }}>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID ????n h??ng</th>
                                        <th>ID Chi ti???t</th>
                                        <th>T??n s???n ph???m</th>
                                        <th>T???ng ti???n</th>
                                        <th>Ng??y ?????t</th>
                                        <th>Tr???ng th??i</th>
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
                                                                <span style={{ color: 'red' }}><strong>Ch??a duy???t</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 1 && (
                                                                <span style={{ color: 'blue' }}><strong>???? duy???t</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 2 && (
                                                                <span style={{ color: '#CC00FF' }}><strong>??ang v???n chuy???n</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 3 && (
                                                                <span style={{ color: '#006600' }}><strong>Kh??ch ???? nh???n h??ng</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 4 && (
                                                                <span style={{ color: 'green' }}><strong>Ho??n th??nh</strong></span>
                                                            )
                                                        }
                                                        {
                                                            item.trangThai === 5 && (
                                                                <span style={{ color: 'black' }}><strong>H???y</strong></span>
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
