import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';
import TextArea from 'antd/lib/input/TextArea';

export default function ModalChiTietBaiViet() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const showChiTietBaiViet = useSelector(state => state.showChiTietBaiViet);
    const [spinnerChiTietBaiViet, setSpinnerChiTietBaiViet] = useState(false);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [imageAsUrl, setImageAsUrl] = useState([]);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const [firstTime, setFirstTime] = useState(true);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerXoaBaiViet, setSpinnerXoaBaiViet] = useState(-1);
    const [spinnerSuaBaiViet, setSpinnerSuaBaiViet] = useState(-1);
    const [baiVietNow, setBaiVietNow] = useState({
        _id: '',
        tieuDe: '',
        img: '',
        ngayTao: '',
        loaiBaiViet: '',
        idProducts: '',
        content: '',
        isLock: '',
    });
    const [baiVietSua, setBaiVietSua] = useState({
        tieuDe: '',
        img: '',
        content: ''
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
            console.log('Kh??ng c?? file n??o ???????c upload');
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
                                setBaiVietSua({
                                    ...baiVietSua,
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
        if (baiVietSua.tieuDe.trim().length === 0 || baiVietSua.img === '') {
            setStatusMessageError(0);
        } else {
            SuaBaiViet(baiVietNow._id);
            setStatusMessageError(-1);
        }
    }

    async function SuaBaiViet(baiVietID) {
        setSpinnerSuaBaiViet(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/baiviet-sua', {
                _id: baiVietID,
                tieuDe: baiVietSua.tieuDe,
                img: baiVietSua.img,
                content: baiVietSua.content
            });

            if (resData.data.status === 'success') {
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaBaiViet(-1);
                message.success("S???a th??nh c??ng");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_BAIVIET' });
            }
            else {
                setSpinnerSuaBaiViet(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                dispatch({ type: 'CLOSE_CHITIET_BAIVIET' });
                message.error("S???a th???t b???i");
            }

        } else {
            dispatch({ type: 'CLOSE_CHITIET_BAIVIET' });
            dispatch({ type: 'RELOAD_DATABASE' });
        }
    }

    async function LayBaiVietTheoID(baiVietID) {
        setSpinnerChiTietBaiViet(true);
        let resData = await axios.get('hethong/baiviet-item-admin?id=' + baiVietID);
        if (resData.data.status === 'success') {
            setBaiVietNow({
                _id: resData.data.data._id,
                tieuDe: resData.data.data.tieuDe,
                img: resData.data.data.img,
                ngayTao: resData.data.data.ngayTao,
                loaiBaiViet: resData.data.data.loaiBaiViet,
                idProducts: resData.data.data.idProducts,
                content: resData.data.data.content,
                isLock: resData.data.data.isLock
            });
            setSpinnerChiTietBaiViet(false);
        } else {
            message.error("L???y data b??i vi???t th???t b???i");
            setSpinnerChiTietBaiViet(false);
            dispatch({ type: 'CLOSE_CHITIET_BAIVIET' });
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
        <Modal show={showChiTietBaiViet} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_BAIVIET' });
        }}
            onShow={() => {
                setDisableOptions(false);
                setStatusSua(0);
                LayBaiVietTheoID(objectIDDuocChonReducer);
                setStatusMessageError(-1);
            }}>
            {
                spinnerChiTietBaiViet === true && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                spinnerChiTietBaiViet === false && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Ti??u ?????"
                            name="tieude"
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n ' }]}>
                            <Input disabled={!disableOptions} defaultValue={baiVietNow.tieuDe} onChange={(e) => {
                                setBaiVietSua({
                                    ...baiVietSua,
                                    tieuDe: e.target.value
                                });
                            }} />
                        </Form.Item>


                        <Form.Item
                            label="???nh ?????i di???n"
                            name="anhchinh"
                            rules={[{ required: true, message: 'Vui l??ng ch???n ???nh' }]}>
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
                            label="Show ???nh ?????i di???n">
                            {
                                statusSua === 0 && (
                                    <img style={{ marginLeft: 20 }} src={baiVietNow.img} alt={'???nh'} width='200' height='150'></img>
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'???nh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="Lo???i b??i vi???t"
                            name="loaibaiviet"
                            rules={[{ required: true, message: 'Vui l??ng ch???n lo???i b??i vi???t' }]}>
                            <Select disabled={true} defaultValue={baiVietNow.loaiBaiViet}>
                                <Option value={-1}>Ch???n lo???i b??i vi???t</Option>
                                <Option value={0}>B??i vi???t v??? ch????ng tr??nh/s??? ki???n</Option>
                                <Option value={1}>B??i vi???t gi???i thi???u</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="N???i dung"
                            name="noidung"
                            rules={[{ required: true, message: 'Vui l??ng nh???p n???i dung' }]}>
                            <textarea style={{ width: '100%' }} disabled={!disableOptions} rows="4" cols="50" defaultValue={baiVietNow.content} onChange={(e) => {
                                setBaiVietSua({
                                    ...baiVietSua,
                                    content: e.target.value
                                });
                            }}>
                            </textarea>
                        </Form.Item>

                        <Form.Item
                            label="Ng??y t???o"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={hamChuyenDoiNgay(new Date(baiVietNow.ngayTao))} />
                        </Form.Item>

                        <Form.Item
                            label="Tr???ng th??i kh??a">
                            <Select disabled={true} defaultValue={baiVietNow.isLock === false ? "nolock" : "lock"}>
                                <Option value="lock">C??</Option>
                                <Option value="nolock">Kh??ng</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            {
                                statusMessageError === 0 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Th??ng tin s???a kh??ng h???p l???. Vui l??ng ki???m tra l???i</p>
                                )
                            }
                            <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }}
                                onClick={() => {
                                    if (statusSua === 0) {
                                        setStatusSua(1);
                                        setDisableOptions(true);
                                    } else {
                                        KiemTraDuLieuNhap();
                                    }
                                    if (statusSua === 0) {
                                        setBaiVietSua({
                                            tieuDe: baiVietNow.tieuDe,
                                            img: baiVietNow.img,
                                            content: baiVietNow.content
                                        });
                                    }
                                }}>

                                {
                                    statusSua === 0 && spinnerSuaBaiViet === -1 ? "S???a" : "L??u"
                                }
                                {
                                    spinnerSuaBaiViet === 1 && (
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
