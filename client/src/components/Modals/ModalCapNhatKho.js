import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalCapNhatKho() {
    const showModalCapNhatKho = useSelector(state => state.showModalCapNhatKho);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [soLuongThem, setSoLuongThem] = useState(0);
    const [isNumber, setIsNumber] = useState(true);
    const dispatch = useDispatch();

    function KiemTraKieuDuLieuNhap() {
        var filterSoLuong = /^\d+$/;

        if (filterSoLuong.test(soLuongThem) && soLuongThem > 0) {
            setIsNumber(true);
            CapNhatSoLuongTrongKho()
        } else {
            setIsNumber(false);
        }
    }

    async function CapNhatSoLuongTrongKho() {
        let res = await axios.put('hethong/products-capnhatsoluong', {
            id: objectIDDuocChonReducer,
            soLuongThem: soLuongThem
        })

        if (res.data.status === 'success') {
            message.success('Cập nhật số lượng thành công');
            dispatch({ type: 'CLOSE_CAPNHATKHO' });
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Cập nhật số lượng thất bại');
        }
    }

    return (
        <Modal show={showModalCapNhatKho} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CAPNHATKHO' });
            setIsNumber(true);
        }}>
            <Form name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Số lượng mới"
                    name="soluong">
                    <Input onChange={(e) => {
                        setSoLuongThem(parseInt(e.target.value));
                        setIsNumber(true);
                    }} />
                </Form.Item>
                {
                    isNumber === false && (
                        <span style={{ color: 'red' }}>Dữ liệu không hợp lệ</span>
                    )
                }
                <Form.Item>
                    <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                        KiemTraKieuDuLieuNhap()
                    }}>Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
