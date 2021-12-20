import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, DatePicker, message } from 'antd';
import { axios } from '../../config/constant';
import moment from 'moment';

export default function ModalThemMaGiamGia() {
    const { RangePicker } = DatePicker;
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const showModalThemMaGiamGiaReducer = useSelector(state => state.showModalThemVoucher);
    const [spinnerThemMaGiamGia, setSpinnerThemMaGiamGia] = useState(-1);
    const dispatch = useDispatch();
    const [dataThem, setDataThem] = useState({
        idShow: '',
        ten: '',
        loaiGiamGia: 0,
        giaTriGiam: 0,
        ngayBatDau: '',
        ngayKetThuc: ''
    });

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    function KiemTraDuLieuNhap(data) {
        var regNum = /^\d+$/;
        if (data.idShow.trim().length === 0 || data.ten.trim().length === 0 || data.giaTriGiam === '' || data.ngayBatDau === '' || data.ngayKetThuc === '') {
            setStatusMessageError(0);
        } else {
            if (!regNum.test(data.giaTriGiam)) {
                setStatusMessageError(1);
            } else {
                ThemMaGiamGia();
                setStatusMessageError(-1);
            }
        }
    }

    async function ThemMaGiamGia() {
        setSpinnerThemMaGiamGia(1);
        let res = await axios.post('hethong/vouchers-them', {
            idShow: dataThem.idShow,
            ten: dataThem.ten,
            loaiGiamGia: dataThem.loaiGiamGia,
            giaTriGiam: dataThem.giaTriGiam,
            ngayBatDau: dataThem.ngayBatDau,
            ngayKetThuc: dataThem.ngayKetThuc
        });

        if (res.data.status === 'success') {
            message.success("Thêm thành công");
            dispatch({ type: 'CLOSE_THEM_VOUCHER' });
            dispatch({ type: 'RELOAD_DATABASE' });
            setSpinnerThemMaGiamGia(0);
        } else {
            message.error("Thêm thất bại");
            setSpinnerThemMaGiamGia(0);
            dispatch({ type: 'CLOSE_THEM_VOUCHER' });
        }
    }

    return (
        <Modal show={showModalThemMaGiamGiaReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_VOUCHER' });
        }}
            onShow={() => {
                setStatusMessageError(-1);
                setDataThem({
                    idShow: '',
                    ten: '',
                    loaiGiamGia: 0,
                    giaTriGiam: 0,
                    ngayBatDau: '',
                    ngayKetThuc: ''
                })
            }}>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>

                <Form.Item
                    label="ID Voucher"
                    name="id"
                    rules={[{ required: true, message: 'Vui lòng nhập tên ID voucher' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            idShow: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Tên"
                    name="ten"
                    rules={[{ required: true, message: 'Vui lòng nhập tên Voucher' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            ten: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Giá trị giảm giá"
                    name="giatrigiam"
                    rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm voucher' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            giaTriGiam: parseInt(e.target.value)
                        })
                    }} />(Nếu giá trị nhập nhỏ hơn 100 thì hệ thống sẽ tự động giảm theo %)
                </Form.Item>

                <Form.Item
                    label="Ngày bắt đầu - Ngày kết thúc"
                    name="ngay"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu và ngày kết thúc voucher' }]}>
                    <RangePicker style={{ width: '100%' }} format="DD-MM-YYYY" disabledDate={disabledDate} onChange={(dates, dateStrings) => {
                        if (dates !== null) {
                            setDataThem({
                                ...dataThem,
                                ngayBatDau: new Date(dates[0]),
                                ngayKetThuc: new Date(dates[1])
                            })
                        }
                    }} />
                </Form.Item>

                <Form.Item>
                    {
                        statusMessageError === 0 && (
                            <p style={{ color: 'red', lineHeight: 1.5 }}>Thông tin tạo mới danh mục sản phẩm không hợp lệ. Vui lòng kiểm tra lại</p>
                        )
                    }

                    {
                        statusMessageError === 1 && (
                            <p style={{ color: 'red', lineHeight: 1.5 }}>Giá trị giảm giá không hợp lệ</p>
                        )
                    }
                    <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }}
                        onMouseOver={() => {
                            if (dataThem.giaTriGiam < 100) {
                                setDataThem({
                                    ...dataThem,
                                    loaiGiamGia: 1
                                })
                            }
                        }}
                        onClick={() => {
                            KiemTraDuLieuNhap(dataThem)
                        }}>
                        {
                            spinnerThemMaGiamGia === 1 ?
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner> : "Thêm"

                        }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
