import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';

export default function ModalChiTietDonHang_ChuShop(props) {
    const dataShowChiTietDonHang = props.dataShowChiTietDonHang;
    const dataNguoiMua = props.dataNguoiMua;
    const { Option } = Select;
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const showChiTietDonHang_ChuShop = useSelector(state => state.showChiTietDonHang_ChuShop);
    const [spinnerChiTietDonHang, setSpinnerChiTietDonHang] = useState(0);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerSuaChiTietDonHang, setSpinnerSuaChiTietDonHang] = useState(-1);
    const [chiTietNow, setChiTietNow] = useState({
        idShow: '',
        ten: '',
        thanhTien: '',
        soLuong: '',
        mauSac: '',
        size: '',
        ghiChu: '',
        trangThai: ''
    });
    const [chiTietSua, setChiTietSua] = useState({
        trangThai: '',
        ghiChu: ''
    });

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    async function CapNhatLichSu(idOrderDetail, trangThai) {
        let result = await axios.put('hethong/lichsu-capnhat', {
            idOrderDetail: idOrderDetail,
            trangThai: trangThai
        });

        if (result.data.status === 'success') {
            dispatch({ type: 'RELOAD_DATABASE' });
            setStatusSua(0);
            setSpinnerSuaChiTietDonHang(-1);
            message.success("Cập nhật trạng thái thành công");
            dispatch({ type: 'CLOSE_CHITIET_DONHANG_CHUSHOP' });
            setDisableOptions(false);
        } else {
            message.error('Cập nhật trạng thái thất bại');
            dispatch({ type: 'CLOSE_CHITIET_DONHANG_CHUSHOP' });
        }
    }

    async function SuaChiTietDonHang(idOrderDetail) {
        setSpinnerSuaChiTietDonHang(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/order-details-sua', {
                id: idOrderDetail,
                trangThai: chiTietSua.trangThai,
                ghiChu: chiTietSua.ghiChu
            });

            if (resData.data.status === 'success') {
                CapNhatLichSu(idOrderDetail, chiTietSua.trangThai);
            }
            else {
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                message.error("Sửa thất bại");
            }

        } else {
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            dispatch({ type: 'CLOSE_CHITIET_DONHANG_CHUSHOP' });
        }
    }

    useEffect(() => {
        setChiTietNow({
            idShow: dataShowChiTietDonHang.idShow,
            ten: dataShowChiTietDonHang.ten,
            thanhTien: dataShowChiTietDonHang.thanhTien,
            soLuong: dataShowChiTietDonHang.soLuong,
            mauSac: dataShowChiTietDonHang.mauSac,
            size: dataShowChiTietDonHang.size,
            ghiChu: dataShowChiTietDonHang.ghiChu,
            trangThai: dataShowChiTietDonHang.trangThai
        });
    }, [dataShowChiTietDonHang])

    useEffect(() => {
        if (statusSua === 1) {
            setShowButtonHuy(true)
        } else {
            setShowButtonHuy(false)
        }
    }, [statusSua])

    return (
        <Modal show={showChiTietDonHang_ChuShop} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_DONHANG_CHUSHOP' });
        }}
            onShow={() => {
                setDisableOptions(false);
                setStatusSua(0);
                setStatusMessageError(-1);
            }}>
            {
                spinnerChiTietDonHang === 1 && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                spinnerChiTietDonHang === 0 && (
                    <Fragment>
                        <h3 style={{ padding: 20 }}>Phần thông tin đơn hàng</h3>
                        <Form
                            name="basic"
                            layout='vertical'
                            initialValues={{ remember: true }}
                            style={{ padding: 20 }}>
                            <Form.Item
                                label="Tên sản phẩm"
                                name='tensanpham'>
                                <Input disabled={true} defaultValue={chiTietNow.ten} />
                            </Form.Item>

                            <Form.Item
                                label="Màu sắc"
                                name="mausac">
                                <Input disabled={true} defaultValue={chiTietNow.mauSac === '' ? 'Không có' : chiTietNow.mauSac} />
                            </Form.Item>

                            <Form.Item
                                label="Size"
                                name="size">
                                <Input disabled={true} defaultValue={chiTietNow.size === '' ? 'Không có' : chiTietNow.size} />
                            </Form.Item>

                            <Form.Item
                                label="Số lượng"
                                name="soluong">
                                <Input disabled={true} defaultValue={chiTietNow.soLuong} />
                            </Form.Item>

                            <Form.Item
                                label="Tổng tiền"
                                name="tongtien">
                                <Input disabled={true} defaultValue={format_curency(chiTietNow.thanhTien.toString())} />
                            </Form.Item>

                            <Form.Item
                                label="Trạng thái đơn hàng"
                                name="trangthai">
                                <Select style={{ width: 300 }} disabled={!disableOptions} size='large' defaultValue={chiTietNow.trangThai} onChange={(value) => {
                                    setChiTietSua({
                                        ...chiTietSua,
                                        trangThai: value
                                    })
                                }}>
                                    <Option value={0}><span style={{ color: 'blue' }}><strong>Chờ duyệt</strong></span></Option>
                                    <Option value={1}><span style={{ color: 'red' }}><strong>Đã duyệt</strong></span></Option>
                                    <Option value={2}><span style={{ color: '#CC00FF' }}><strong>Đang vận chuyển</strong></span></Option>
                                    <Option value={3}><span style={{ color: '#006600' }}><strong>Khách đã nhận hàng</strong></span></Option>
                                    <Option value={4}><span style={{ color: 'green' }}><strong>Hoàn thành</strong></span></Option>
                                    <Option value={5}><span style={{ color: 'black' }}><strong>Hủy</strong></span></Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Ghi chú"
                                name="ghichu">
                                <textarea style={{ width: '100%' }} rows={3} cols={50} disabled={!disableOptions} defaultValue={chiTietNow.ghiChu} onChange={(e) => {
                                    setChiTietSua({
                                        ...chiTietSua,
                                        ghiChu: e.target.value
                                    })
                                }}></textarea>
                            </Form.Item>
                        </Form>
                        <h3 style={{ padding: 20 }}>Phần thông tin người mua</h3>
                        <Form
                            name="basic"
                            layout='vertical'
                            initialValues={{ remember: true }}
                            style={{ padding: 20 }}>
                            <Form.Item
                                label="Tên người mua"
                                name="tennguoimua">
                                <Input disabled={true} defaultValue={dataNguoiMua.ten} />
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="sdt">
                                <Input disabled={true} defaultValue={dataNguoiMua.sdt} />
                            </Form.Item>
                            <Form.Item
                                label="Địa chỉ"
                                name="diachi">
                                <Input disabled={true} defaultValue={dataNguoiMua.diaChi} />
                            </Form.Item>

                            <Form.Item>
                                {
                                    statusMessageError === 0 && (
                                        <p style={{ color: 'red', lineHeight: 1.5 }}>Không thể cập nhật lại trạng thái đã có từ trước đó</p>
                                    )
                                }
                                <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                    if (statusSua === 0) {
                                        setStatusSua(1);
                                        setDisableOptions(true);
                                    } else {
                                        if (chiTietSua.trangThai < chiTietNow.trangThai) {
                                            setStatusMessageError(0);
                                        } else {
                                            setStatusMessageError(-1);
                                            SuaChiTietDonHang(chiTietNow.idShow);
                                        }
                                    }
                                    if (statusSua === 0) {
                                        setChiTietSua({
                                            trangThai: chiTietNow.trangThai,
                                            ghiChu: chiTietNow.ghiChu
                                        });
                                    }

                                }}>
                                    {
                                        statusSua === 0 && spinnerSuaChiTietDonHang === -1 ? "Sửa" : "Lưu"
                                    }
                                    {
                                        spinnerSuaChiTietDonHang === 1 && (
                                            <Spinner animation="border" role="status" style={{ marginLeft: 40 }}>
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        )
                                    }
                                </Button>
                            </Form.Item>
                            {
                                showButtonHuy === true && (
                                    <Form.Item>
                                        <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                            setDisableOptions(false);
                                            setStatusSua(0);
                                        }}>Hủy</Button>
                                    </Form.Item>
                                )
                            }
                        </Form>
                    </Fragment>
                )
            }
        </Modal>
    )
}
