import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';

export default function ModalChiTietCategory() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietCategoryReducer = useSelector(state => state.showChiTietCategory);
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const setSpinnerChiTietCategory = useSelector(state => state.setSpinnerChiTietCategory);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerSuaCategory, setSpinnerSuaCategory] = useState(-1);
    const [cateogryNow, setCategoryNow] = useState({
        _id: '',
        ten: '',
        icon: '',
        ngayTao: '',
        isLock: ''
    });
    const [categorySua, setCategorySua] = useState({
        ten: '',
        icon: ''
    });

    function KiemTraDuLieuNhap() {
        if (categorySua.ten.trim().length === 0) {
            setStatusMessageError(0);
        } else {
            SuaCategory(cateogryNow._id);
            setStatusMessageError(-1);
        }
    }

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function SuaCategory(categoryID) {
        dispatch({ type: 'SPINNER_CHITIETCATEGORY' });
        setSpinnerSuaCategory(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/categorys-sua', {
                _id: categoryID,
                ten: categorySua.ten,
                icon: categorySua.icon
            });

            if (resData.data.status === 'success') {
                dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaCategory(-1);
                message.success("S???a th??nh c??ng");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
            }
            else {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                setSpinnerSuaCategory(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                message.error("S???a th???t b???i");
                dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
            }

        } else {
            dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }


    async function LayCategoryTheoID(categoryID) {
        dispatch({ type: 'SPINNER_CHITIETCATEGORY' });
        let resData = await axios.get('hethong/categorys-item/?id=' + categoryID);
        if (resData.data.status === 'success') {
            setCategoryNow({
                _id: resData.data.data._id,
                ten: resData.data.data.ten,
                icon: resData.data.data.icon,
                ngayTao: resData.data.data.ngayTao,
                isLock: resData.data.data.isLock
            });
            dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
        } else {
            message.error("L???y data danh m???c th???t b???i");
            dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
            dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
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
        <Modal show={showChiTietCategoryReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
        }}
            onShow={() => {
                setDisableOptions(false);
                setStatusSua(0);
                LayCategoryTheoID(objectIDDuocChonReducer);
                setStatusMessageError(-1);
            }}>
            {
                setSpinnerChiTietCategory === 1 && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                setSpinnerChiTietCategory === 0 && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="T??n"
                            name="ten"
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n ' }]}>
                            <Input disabled={!disableOptions} defaultValue={cateogryNow.ten} onChange={(e) => {
                                setCategorySua({
                                    ...categorySua,
                                    ten: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Icon"
                            name="icon">
                            <Input disabled={!disableOptions} defaultValue={cateogryNow.icon} onChange={(e) => {
                                setCategorySua({
                                    ...categorySua,
                                    icon: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Ng??y t???o"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={hamChuyenDoiNgay(new Date(cateogryNow.ngayTao))} />
                        </Form.Item>

                        <Form.Item
                            label="Tr???ng th??i kh??a">
                            <Select disabled={true} defaultValue={cateogryNow.isLock === false ? "nolock" : "lock"}>
                                <Option key="lock">C??</Option>
                                <Option key="nolock">Kh??ng</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            {
                                statusMessageError === 0 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Th??ng tin s???a kh??ng h???p l???. Vui l??ng ki???m tra l???i</p>
                                )
                            }
                            <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                if (statusSua === 0) {
                                    setStatusSua(1);
                                    setDisableOptions(true);
                                } else {
                                    KiemTraDuLieuNhap()
                                }
                                if (statusSua === 0) {
                                    setCategorySua({
                                        ten: cateogryNow.ten,
                                        icon: cateogryNow.icon
                                    });
                                }
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaCategory === -1 ? "S???a" : "L??u"
                                }
                                {
                                    spinnerSuaCategory === 1 && (
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
                                    }}>H???y</Button>
                                </Form.Item>
                            )
                        }
                    </Form>
                )
            }
        </Modal>
    )
}
