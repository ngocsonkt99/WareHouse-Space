import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { Form, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';


export default function ModalChiTietCauHoi(props) {
    const traLoi = props.traLoi;
    const dispatch = useDispatch();
    const showChiTietCauHoi = useSelector(state => state.showChiTietCauHoi);
    const [spinnerChiTietCauHoi, setSpinnerChiTietCauHoi] = useState(false);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [showButtonHuy, setShowButtonHuy] = useState(false)
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerSuaCauHoi, setSpinnerSuaCauHoi] = useState(-1);
    const [statusError, setStatusError] = useState(-1);
    const [cauHoiNow, setCauHoiNow] = useState({
        _id: '',
        idProduct: '',
        question: '',
        answer: '',
        luotThich: '',
        ngayTao: '',
        ngayTraLoi: '',
        isAccept: '',
    });
    const [cauHoiSua, setCauHoiSua] = useState({
        answer: ''
    });

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function SuaCauHoi(cauHoiID) {
        setSpinnerSuaCauHoi(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/questanswer-sua', {
                _id: cauHoiID,
                answer: cauHoiSua.answer
            });

            if (resData.data.status === 'success') {
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaCauHoi(-1);
                message.success("Sửa thành công");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_CAUHOI' });
            }
            else {
                setSpinnerSuaCauHoi(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                dispatch({ type: 'CLOSE_CHITIET_CAUHOI' });
                message.error("Sửa thất bại");
            }

        } else {
            dispatch({ type: 'CLOSE_CHITIET_CAUHOI' });
            dispatch({ type: 'RELOAD_DATABASE' });
        }
    }

    async function LayCauHoiTheoID(cauHoiID) {
        setSpinnerChiTietCauHoi(true);
        let resData = await axios.get('hethong/questanswer-item-admin?id=' + cauHoiID);
        if (resData.data.status === 'success') {
            setCauHoiNow({
                _id: resData.data.data._id,
                idProduct: resData.data.data.idProduct,
                question: resData.data.data.question,
                answer: resData.data.data.answer,
                luotThich: resData.data.data.luotThich,
                ngayTao: resData.data.data.ngayTao,
                ngayTraLoi: resData.data.data.ngayTraLoi,
                isAccept: resData.data.data.isAccept
            });
            setSpinnerChiTietCauHoi(false);
        } else {
            message.error("Lấy data câu hỏi thất bại");
            setSpinnerChiTietCauHoi(false);
            dispatch({ type: 'CLOSE_CHITIET_CAUHOI' });
        }
    }

    async function DuyetCauHoi(cauHoiID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.put('hethong/questanswer-duyet', {
            _id: cauHoiID
        });
        if (resData.data.status === 'success') {
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error("Duyệt câu hỏi thất bại");
            dispatch({ type: 'NO_RELOAD_DATABASE' });
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
        <Modal show={showChiTietCauHoi} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_CAUHOI' });
        }}
            onShow={() => {
                setDisableOptions(false);
                LayCauHoiTheoID(objectIDDuocChonReducer);
                if (traLoi) {
                    setStatusSua(1);
                    setDisableOptions(true);
                } else {
                    setStatusSua(0);
                    setDisableOptions(false);
                }
            }}>
            {
                spinnerChiTietCauHoi === true && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                spinnerChiTietCauHoi === false && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>

                        <Form.Item
                            label="ID sản phẩm"
                            name="id">
                            <Input disabled={true} defaultValue={cauHoiNow.idProduct} />
                        </Form.Item>

                        <Form.Item
                            label="Câu hỏi"
                            name="cauhoi">
                            <Input disabled={true} defaultValue={cauHoiNow.question} />
                        </Form.Item>

                        <Form.Item
                            label="Trả lời"
                            name="traloi"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}>
                            <textarea style={{ width: '100%' }} disabled={!disableOptions} rows="4" cols="50" defaultValue={cauHoiNow.answer} onChange={(e) => {
                                setCauHoiSua({
                                    ...cauHoiSua,
                                    answer: e.target.value
                                });
                            }}>
                            </textarea>
                        </Form.Item>

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={hamChuyenDoiNgay(new Date(cauHoiNow.ngayTao))} />
                        </Form.Item>

                        <Form.Item
                            label="Ngày trả lời"
                            name="ngaytraloi">
                            <Input disabled={true} defaultValue={cauHoiNow.ngayTraLoi === '' ? 'Chưa xác định' : hamChuyenDoiNgay(new Date(cauHoiNow.ngayTraLoi))} />
                        </Form.Item>

                        <Form.Item>
                            {
                                statusError === 0 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Nhập phần Trả lời trước khi lưu để được duyệt</p>
                                )
                            }
                            {
                                statusError === 1 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Phần trả lời không hợp lệ. Vui lòng kiểm tra lại</p>
                                )
                            }
                            <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }}
                                onClick={() => {

                                    if (statusSua === 0) {
                                        setStatusSua(1);
                                        setDisableOptions(true);
                                    } else {
                                        if (traLoi) {
                                            if (cauHoiSua.answer.trim().length === 0) {
                                                setStatusError(0); //Lỗi không cho duyệt khi chưa trả lời
                                            } else {
                                                SuaCauHoi(cauHoiNow._id);
                                                DuyetCauHoi(cauHoiNow._id);
                                            }
                                        } else {
                                            if (cauHoiSua.answer.trim().length !== 0) {
                                                setStatusError(1); //Câu trả lời không được rỗng
                                            } else {
                                                SuaCauHoi(cauHoiNow._id);
                                            }
                                        }
                                    }
                                    if (statusSua === 0) {
                                        setCauHoiSua({
                                            answer: cauHoiNow.answer,
                                            isAccept: cauHoiNow.isAccept
                                        });
                                    }
                                }}>

                                {
                                    statusSua === 0 && spinnerSuaCauHoi === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaCauHoi === 1 && (
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
