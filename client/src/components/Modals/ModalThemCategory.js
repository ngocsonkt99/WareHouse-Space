import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, message, Select } from 'antd';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalThemCategory() {
    const { Option } = Select;
    const [firstTime, setFirstTime] = useState(true);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const showModalThemCategoryReducer = useSelector(state => state.showModalThemCategory);
    const [spinnerThemCategory, setSpinnerThemCategory] = useState(-1);
    const [dataCategory, setDataCategory] = useState([]);
    const dispatch = useDispatch();
    const [dataThem, setDataThem] = useState({
        ten: '',
        icon: '',
        img: '',
        idparen: '',
    });


    const handleChange = (e) => {
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
                                setDataThem({
                                    ...dataThem,
                                    img: fireBaseUrl
                                })
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong(countPrev => countPrev + 1);
                            })
                    })
            }
        }
    }

    function KiemTraDuLieuNhap(data) {
        if (data.ten.trim().length === 0) {
            setStatusMessageError(0);
        } else {
            ThemCategory()
            setStatusMessageError(-1);
        }
    }

    async function LayDataCategoryAll() {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/categorys');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data danh mục sản phẩm thất bại");
        }
    }

    async function ThemCategory() {
        setSpinnerThemCategory(1);
        let res = await axios.post('hethong/categorys-them', {
            ten: dataThem.ten,
            icon: dataThem.icon,
            img: dataThem.img,
            idparen: dataThem.idparen,
        });

        if (res.data.status === 'success') {
            message.success("Thêm thành công");
            dispatch({ type: 'CLOSE_THEM_CATEGORY' });
            dispatch({ type: 'RELOAD_DATABASE' });
            setSpinnerThemCategory(0);
        } else {
            message.error(res.data.message);
            dispatch({ type: 'CLOSE_THEM_CATEGORY' });
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setSpinnerThemCategory(0);
        }
    }

    useEffect(() => {
        LayDataCategoryAll();

    }, []);

    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                message.error('Vui lòng chọn ảnh cho Category')
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    message.success('Upload ảnh category thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong])
    return (

        <Modal show={showModalThemCategoryReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_CATEGORY' });
        }}
            onShow={() => {
                setImageAsFile([]);
                setFirstTime(true);
                setCountAnhDaUploadThanhCong(0);
                setStatusMessageError(-1);
                setDataThem({
                    ten: '',
                    icon: '',
                    img: '',
                    idparen: '',
                })
            }}>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Tên"
                    name="ten"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục cho sản phẩm' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            ten: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Icon"
                    name="icon">
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            icon: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Nhóm sản phẩm"
                    name="idparen"
                    // rules={[{ required: true, message: 'Vui lòng chọn nhóm sản phẩm' }]}
                    >
                    <Select value={dataThem.idparen} onChange={(value) => {
                        setDataThem({
                            ...dataThem,
                            idparen: value,
                        })
                        console.log(value);
                    }}>
                        <Option value = "">Danh mục chính</Option>
                        {dataCategory.map((item, i) => {
                            var result = (item.idParen === '') ?
                                (
                                    <Option key ={item._id} value={item._id}>{item.ten}</Option>
                                ) : ''
                            return result;
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ảnh đại diện"
                    name="username">
                    <input type='file'
                        onChange={(e) => {
                            handleChange(e);
                            setCountAnhDaUploadThanhCong(0);
                            setFirstTime(false);

                        }}
                    //onClick={() => { console.log(dataCategory) }}
                    >
                    </input>
                </Form.Item>

                <Form.Item>
                    {
                        dataThem.img === '' ? <Image alt="ảnh show" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" style={{ width: 300, height: 200 }}></Image> : <Image alt="ảnh show" src={dataThem.img} style={{ width: 300, height: 200 }}></Image>
                    }
                </Form.Item>

                <Form.Item>
                    {
                        statusMessageError === 0 && (
                            <p style={{ color: 'red', lineHeight: 1.5 }}>Thông tin tạo mới danh mục sản phẩm không hợp lệ. Vui lòng kiểm tra lại</p>
                        )
                    }
                    <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                        KiemTraDuLieuNhap(dataThem)
                    }}>
                        {
                            spinnerThemCategory === 1 ?
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
