import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select, message } from 'antd';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';
import { QuillEditor } from '../allJS';

export default function ModalThemBaiViet() {
    const { Option } = Select;
    const [files, setFiles] = useState([])
    const [firstTime, setFirstTime] = useState(true);
    const [dataProduct, setDataProduct] = useState([]);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const showModalThemBaiViet = useSelector(state => state.showModalThemBaiViet);
    const [spinnerThemBaiViet, setSpinnerThemBaiViet] = useState(-1);
    const dispatch = useDispatch();
    const [dataThem, setDataThem] = useState({
        tieuDe: "",
        img: "",
        ngayTao: new Date(),
        loaiBaiViet: -1,
        idProducts: [],
        content: '',
        luotXem: 0,
        isLock: false,
        isDelete: false
    })

    const onEditorChange = (value) => {
        setDataThem({
            ...dataThem,
            content: value
        })
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }
    console.log(dataThem);

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
        if (data.tieuDe.trim().length === 0 || data.img === '' || data.loaiBaiViet === -1 || data.content.trim().length === 0) {
            setStatusMessageError(0);
        } else {
            ThemBaiViet()
            setStatusMessageError(-1);
        }
    }

    async function ThemBaiViet() {
        setSpinnerThemBaiViet(1);
        setDataThem({
            ...dataThem,
            content: ''
        });

        let res = await axios.post('hethong/baiviet-them', {
            data: dataThem
        });

        if (res.data.status === 'success') {
            message.success('Đã tạo bài viết mới thành công');
            dispatch({ type: 'CLOSE_THEM_BAIVIET' });
            dispatch({ type: 'RELOAD_DATABASE' });
            setSpinnerThemBaiViet(0);
        } else {
            message.error(res.data.message);
            dispatch({ type: 'CLOSE_THEM_BAIVIET' });
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setSpinnerThemBaiViet(0);
        }
    }

    async function LayDataSanPham() {
        let res = await axios.get('hethong/products');

        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
        } else {
            message.error('Lấy data sản phẩm thất bại !');
        }
    }

    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                message.success('Vui lòng chọn ảnh đại diện cho bài viết')
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    message.error('Upload ảnh đại diện bài viết thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong])

    console.log(dataThem);
    console.log(dataProduct);

    return (
        <Modal show={showModalThemBaiViet} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_BAIVIET' });
        }}
            onShow={() => {
                LayDataSanPham();
                setImageAsFile([]);
                setFirstTime(true);
                setStatusMessageError(-1);
                setCountAnhDaUploadThanhCong(0);
                setDataThem({
                    tieuDe: "",
                    img: "",
                    ngayTao: new Date(),
                    loaiBaiViet: -1,
                    idProducts: [],
                    content: '',
                    luotXem: 0,
                    isLock: false,
                    isDelete: false
                })
            }}>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Tiêu Đề"
                    name="tieude"
                    rules={[{ required: true, message: 'Vui lòng nhập tên tiêu đề bài viết ' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            tieuDe: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Ảnh đại diện"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                    <input type='file'
                        onChange={(e) => {
                            handleChange(e);
                            setCountAnhDaUploadThanhCong(0);
                            setFirstTime(false);
                        }}>
                    </input>
                </Form.Item>

                <Form.Item>
                    {
                        dataThem.img === '' ? <Image alt="ảnh show" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" style={{ width: 300, height: 200 }}></Image> : <Image alt="ảnh show" src={dataThem.img} style={{ width: 300, height: 200 }}></Image>
                    }
                </Form.Item>

                <Form.Item
                    label="Loại bài viết"
                    name="loaibaiviet"
                    rules={[{ required: true, message: 'Vui lòng chọn loại bài viết' }]}>
                    <Select value={dataThem.loaiBaiViet} onChange={(value) => {
                        setDataThem({
                            ...dataThem,
                            loaiBaiViet: value
                        })
                    }}>
                        <Option value={-1}>Chọn loại bài viết</Option>
                        <Option value={0}>Bài viết về chương trình/sự kiện</Option>
                        <Option value={1}>Bài viết giới thiệu</Option>
                    </Select>
                </Form.Item>

                {
                    dataThem.loaiBaiViet === 0 && (
                        <Form.Item
                            label="Các sản phẩm liên quan đến chương trình/sự kiện"
                            name="sanphams"
                            rules={[{ required: true, message: 'Vui lòng chọn các sản phẩm' }]}>
                            <Select
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Chọn sản phẩm"
                                onChange={(value) => {
                                    setDataThem({
                                        ...dataThem,
                                        idProducts: value
                                    })
                                }}>
                                {
                                    dataProduct.map((item, i) => {
                                        return <Option key={item._id} value={item._id}>
                                            {item.ten}
                                        </Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    )
                }

                <Form.Item
                    label="Nội dung"
                    name="noidung">

                    <QuillEditor
                        placeholder={"Nhập nội dung"}
                        onEditorChange={onEditorChange}
                        onFilesChange={onFilesChange} />

                </Form.Item>

                <Form.Item>
                    {
                        statusMessageError === 0 && (
                            <p style={{ color: 'red', lineHeight: 1.5 }}>Vui lòng nhập đủ dữ liệu cần thiết</p>
                        )
                    }
                    <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                        KiemTraDuLieuNhap(dataThem);
                    }}>
                        {
                            spinnerThemBaiViet === 1 ?
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
