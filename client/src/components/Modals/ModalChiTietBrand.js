import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalChiTietBrand() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const showChiTietBrandReducer = useSelector(state => state.showChiTietBrand);
    const setSpinnerChiTietBrand = useSelector(state => state.setSpinnerChiTietBrand);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [imageAsUrl, setImageAsUrl] = useState([]);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const [firstTime, setFirstTime] = useState(true);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerSuaBrand, setSpinnerSuaBrand] = useState(-1);
    const [brandNow, setBrandNow] = useState({
        _id: '',
        ten: '',
        xuatXu: '',
        img: '',
        ngayTao: '',
        isLock: ''
    });
    const [brandSua, setBrandSua] = useState({
        ten: '',
        xuatXu: '',
        img: ''
    });

    const handleChangeIMG = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile(listFile);

        if (listFile.length === 0) {
            console.log('Không có file nào được upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                setBrandSua({
                                    ...brandSua,
                                    img: fireBaseUrl
                                });
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl(listUrl);
    }

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    function KiemTraDuLieuNhap() {
        if (brandSua.ten.trim().length === 0 || brandSua.xuatXu.trim().length === 0) {
            setStatusMessageError(0);
        } else {
            SuaBrand(brandNow._id);
            setStatusMessageError(-1);
        }
    }

    async function SuaBrand(brandID) {
        //dispatch({ type: 'SPINNER_SUACAROUSEL' });
        setSpinnerSuaBrand(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/brands-sua', {
                _id: brandID,
                ten: brandSua.ten,
                xuatXu: brandSua.xuatXu,
                img: brandSua.img
            });

            if (resData.data.status === 'success') {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaBrand(-1);
                message.success("Sửa thành công");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_BRAND' });
            }
            else {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                setSpinnerSuaBrand(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                message.error("Sửa thất bại");
            }

        } else {
            dispatch({ type: 'CLOSE_CHITIET_BRAND' });
            dispatch({ type: 'RELOAD_DATABASE' });
        }
    }

    async function LayBrandTheoID(brandID) {
        dispatch({ type: 'SPINNER_CHITIETBRAND' });
        let resData = await axios.get('hethong/brands-item/?id=' + brandID);
        if (resData.data.status === 'success') {
            setBrandNow({
                _id: resData.data.data._id,
                ten: resData.data.data.ten,
                xuatXu: resData.data.data.xuatXu,
                img: resData.data.data.img,
                ngayTao: resData.data.data.ngayTao,
                isLock: resData.data.data.isLock
            });
            dispatch({ type: 'NO_SPINNER_CHITIETBRAND' });
        } else {
            message.error("Lấy data thương hiệu thất bại");
            dispatch({ type: 'NO_SPINNER_CHITIETBRAND' });
            dispatch({ type: 'CLOSE_CHITIET_BRAND' });
        }
    }

    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                setStatusMessageError(1);
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    setStatusMessageError(-1);
                }
            }
        }
    }, [countAnhDaUploadThanhCong])

    useEffect(() => {
        if (statusSua === 1) {
            setShowButtonHuy(true)
        } else {
            setShowButtonHuy(false)
        }
    }, [statusSua])

    return (
        <Modal show={showChiTietBrandReducer} size="lg" animation={false}
            onHide={() => {
                dispatch({ type: 'CLOSE_CHITIET_BRAND' });
            }}
            onShow={() => {
                setDisableOptions(false);
                setStatusSua(0);
                LayBrandTheoID(objectIDDuocChonReducer);
                setStatusMessageError(-1);
            }}>
            {
                setSpinnerChiTietBrand === 1 && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                setSpinnerChiTietBrand === 0 && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên ' }]}>
                            <Input disabled={!disableOptions} defaultValue={brandNow.ten} onChange={(e) => {
                                setBrandSua({
                                    ...brandSua,
                                    ten: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Xuất xứ"
                            name="xuatXu"
                            rules={[{ required: true, message: 'Vui lòng nhập nguồn gốc xuất xứ ' }]}>
                            <Input disabled={!disableOptions} defaultValue={brandNow.xuatXu} onChange={(e) => {
                                setBrandSua({
                                    ...brandSua,
                                    xuatXu: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="anhchinh">
                            <input type='file'
                                disabled={!disableOptions}
                                onChange={(e) => {
                                    handleChangeIMG(e);
                                    setCountAnhDaUploadThanhCong(0);
                                    setFirstTime(false);
                                }}>
                            </input>
                        </Form.Item>

                        <Form.Item
                            name='showanhchinh'
                            label="Show ảnh đại diện">
                            {
                                statusSua === 0 && (
                                    <img style={{ marginLeft: 20 }} src={brandNow.img === '' ? "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" : brandNow.img} alt={'ảnh'} width='200' height='150'></img>
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={hamChuyenDoiNgay(new Date(brandNow.ngayTao))} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái khóa">
                            <Select disabled={true} defaultValue={brandNow.isLock === false ? "nolock" : "lock"}>
                                <Option key="lock">Có</Option>
                                <Option key="nolock">Không</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            {
                                statusMessageError === 0 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Thông tin sửa không hợp lệ. Vui lòng kiểm tra lại</p>
                                )
                            }
                            <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                if (statusSua === 0) {
                                    setStatusSua(1);
                                    setDisableOptions(true);
                                } else {
                                    KiemTraDuLieuNhap();
                                }
                                if (statusSua === 0) {
                                    setBrandSua({
                                        ten: brandNow.ten,
                                        xuatXu: brandNow.xuatXu,
                                        img: brandNow.img
                                    });
                                }
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaBrand === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaBrand === 1 && (
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
