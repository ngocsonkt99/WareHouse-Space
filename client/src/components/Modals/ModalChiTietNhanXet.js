import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';

export default function ModalChiTietNhanXet(props) {
    const traLoi = props.traLoi;
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietNhanXet = useSelector(state => state.showChiTietNhanXet);
    const [spinnerChiTietNhanXet, setSpinnerChiTietNhanXet] = useState(false);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [showButtonHuy, setShowButtonHuy] = useState(false)
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerSuaNhanXet, setSpinnerSuaNhanXet] = useState(-1);
    const [nhanXetNow, setNhanXetNow] = useState({
        _id: '',
        idProduct: '',
        soSao: '',
        tieuDe: '',
        noiDung: '',
        traLoi: '',
        ngayTao: '',
        ngayTraLoi: '',
        isAccept: '',
    });
    const [nhanXetSua, setNhanXetSua] = useState({
        traLoi: ''
    });

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function SuaNhanXet(nhanXetID) {
        setSpinnerSuaNhanXet(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/comments-sua', {
                _id: nhanXetID,
                traLoi: nhanXetSua.traLoi
            });

            if (resData.data.status === 'success') {
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaNhanXet(-1);
                message.success("Sửa thành công");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_COMMENT' });
            }
            else {
                setSpinnerSuaNhanXet(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                dispatch({ type: 'CLOSE_CHITIET_COMMENT' });
                message.error("Sửa thất bại");
            }

        } else {
            dispatch({ type: 'CLOSE_CHITIET_COMMENT' });
            dispatch({ type: 'RELOAD_DATABASE' });
        }
    }

    async function LayNhanXetTheoID(nhanXetID) {
        setSpinnerChiTietNhanXet(true);
        let resData = await axios.get('hethong/comments-item-admin?id=' + nhanXetID);
        if (resData.data.status === 'success') {
            setNhanXetNow({
                _id: resData.data.data._id,
                idProduct: resData.data.data.idProduct,
                soSao: resData.data.data.soSao,
                tieuDe: resData.data.data.tieuDe,
                noiDung: resData.data.data.noiDung,
                traLoi: resData.data.data.traLoi,
                ngayTao: resData.data.data.ngayTao,
                ngayTraLoi: resData.data.data.ngayTraLoi,
                isAccept: resData.data.data.isAccept,
            });
            setSpinnerChiTietNhanXet(false);
        } else {
            message.error("Lấy data nhận xét thất bại");
            setSpinnerChiTietNhanXet(false);
            dispatch({ type: 'CLOSE_CHITIET_COMMENT' });
        }
    }


    useEffect(() => {
        if (statusSua === 1) {
            setShowButtonHuy(true)
        } else {
            setShowButtonHuy(false)
        }
    }, [statusSua])


    return (
        <Modal show={showChiTietNhanXet} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_COMMENT' });
        }}
            onShow={() => {
                setDisableOptions(false);
                if (traLoi) {
                    setStatusSua(1);
                    setDisableOptions(true);
                } else {
                    setStatusSua(0);
                    setDisableOptions(false);
                }
                LayNhanXetTheoID(objectIDDuocChonReducer);
            }}>
            {
                spinnerChiTietNhanXet === true && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                spinnerChiTietNhanXet === false && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>

                        <Form.Item
                            label="ID sản phẩm"
                            name="id">
                            <Input disabled={true} defaultValue={nhanXetNow.idProduct} />
                        </Form.Item>

                        <Form.Item
                            label="Số sao"
                            name="sosao">
                            <Input disabled={true} defaultValue={nhanXetNow.soSao} />
                        </Form.Item>

                        <Form.Item
                            label="Tiêu đề"
                            name="tieude">
                            <Input disabled={true} defaultValue={nhanXetNow.tieuDe} />
                        </Form.Item>

                        <Form.Item
                            label="Nội dung"
                            name="noidung">
                            <textarea style={{ width: '100%' }} disabled={true} rows="4" cols="50" defaultValue={nhanXetNow.noiDung}>
                            </textarea>
                        </Form.Item>

                        <Form.Item
                            label="Trả lời"
                            name="traloi"
                            rules={[{ required: true, message: 'Vui lòng nhập câu trả lời cho khách hàng' }]}>
                            <textarea style={{ width: '100%' }} disabled={!disableOptions} rows="4" cols="50" defaultValue={nhanXetNow.traLoi} onChange={(e) => {
                                setNhanXetSua({
                                    ...nhanXetSua,
                                    traLoi: e.target.value
                                });
                            }}>
                            </textarea>
                        </Form.Item>

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={hamChuyenDoiNgay(new Date(nhanXetNow.ngayTao))} />
                        </Form.Item>

                        <Form.Item
                            label="Ngày trả lời"
                            name="ngaytraloi">
                            <Input disabled={true} defaultValue={nhanXetNow.ngayTraLoi === '' ? 'Chưa xác định' : hamChuyenDoiNgay(new Date(nhanXetNow.ngayTraLoi))} />
                        </Form.Item>

                        <Form.Item>
                            <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }}
                                onClick={() => {
                                    if (statusSua === 0) {
                                        setStatusSua(1);
                                        setDisableOptions(true);
                                    } else {
                                        SuaNhanXet(nhanXetNow._id);
                                    }
                                    if (statusSua === 0) {
                                        setNhanXetSua({
                                            traLoi: nhanXetNow.traLoi
                                        });
                                    }
                                }}>

                                {
                                    statusSua === 0 && spinnerSuaNhanXet === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaNhanXet === 1 && (
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
                )
            }
        </Modal>
    )
}
