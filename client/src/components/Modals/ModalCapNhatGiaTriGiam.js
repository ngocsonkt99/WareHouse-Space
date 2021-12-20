import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalCapNhatKho() {
    const showModalCapNhatGiaTriGiam = useSelector(state => state.showModalCapNhatGiaTriGiam);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [giaTriGiam, setGiaTriGiam] = useState(0);
    const [gia,setGia]=useState(0);
    const [isNumber, setIsNumber] = useState(true);
    const dispatch = useDispatch();

    function KiemTraKieuDuLieuNhap() {
        var filterGiaTriGiam = /^\d+$/;

        if (filterGiaTriGiam.test(giaTriGiam) && giaTriGiam >= 0) {
            setIsNumber(true);
            CapNhatGiaTriGiam()
        } else {
            setIsNumber(false);
        }
    }

    async function CapNhatGiaTriGiam() {
        let res = await axios.put('hethong/products-capnhatgiatrigiamgia', {
            id: objectIDDuocChonReducer,
            gia: gia,
            giaTriGiamGia: giaTriGiam
        })

        if (res.data.status === 'success') {
            message.success('Cập nhật giá trị giảm giá thành công');
            dispatch({ type: 'CLOSE_CAPNHATGIATRIGIAM' });
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Cập nhật giá trị giảm giá thất bại');
        }
    }

    async function LayGiaProductTheoID() {
        let res = await axios.get('hethong/products-item?id=' + objectIDDuocChonReducer);
        
        if(res.data.status ==='success'){
            setGia(res.data.data.gia);
        }else{
            message.error('Lấy data giá sản phẩm này thất bại');
        }
    }
    

    return (
        <Modal show={showModalCapNhatGiaTriGiam} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CAPNHATGIATRIGIAM' });
            setIsNumber(true);
        }}
        onShow={()=>{
            LayGiaProductTheoID();
        }}>
            <Form name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Giá trị giảm giá"
                    name="giatrigiam">
                    <Input onChange={(e) => {
                        setGiaTriGiam(parseInt(e.target.value));
                        setIsNumber(true);
                    }} /><br></br>
                    <span>(Nếu giá trị nhập nhỏ hơn 100 thì hệ thống sẽ tự động giảm theo %)</span>
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
