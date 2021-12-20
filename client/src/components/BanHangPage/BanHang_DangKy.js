import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Dropdown, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { storage } from "../../firebase/firebase";
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';

export default function BanHang_DangKy() {
    const [cookie, setCookie, removeCookies] = useCookies();
    const userID = cookie.userID;
    const [countAnhDaUploadThanhCong_Logo, setCountAnhDaUploadThanhCong_Logo] = useState(0);
    const [firstTime1, setFirstTime1] = useState(true);
    const [imageAsFile_Logo, setImageAsFile_Logo] = useState([]);
    const [imageAsUrl_Logo, setImageAsUrl_Logo] = useState([]);
    const [dataTaoShop, setDataTaoShop] = useState({
        ten: '',
        moTa: '',
        diaChi: '',
        logoShop: '',
        keyPaypal: '',
        viShop: '',
        ngayTao: new Date()
    })
    const [dataEmail, setDataEmail] = useState('');

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 12,
        },
    };

    const dispatch = useDispatch();

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const menu = (
        <Menu>
            <Menu.Item >
                Đổi mật khẩu
          </Menu.Item>
            <Menu.Item onClick={() => {
                removeCookies('token');
                removeCookies('userID');
                window.location.pathname = '/';
            }}>
                Đăng xuất
          </Menu.Item>
        </Menu>
    );

    const handleChangeIMG_Logo = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Logo(listFile);

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
                                listUrl.push(fireBaseUrl)
                                setDataTaoShop({
                                    ...dataTaoShop,
                                    logoShop: fireBaseUrl
                                })
                            })
                    })
            }
        }
        setImageAsUrl_Logo(listUrl);
    }

    function KiemTraDuLieuNhap() {
        if (dataTaoShop.ten.trim().length === 0) {
            message.error('Tên gian hàng không hợp lệ');
        } else {
            TaoShop();
        }

    }

    async function LayEmailTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        if (resData.data.status === 'success') {
            setDataEmail(resData.data.data.email);
        } else {
            message.error("Lấy email thất bại");
        }
    }

    async function TaoShop() {
        let resData = await axios.put('hethong/users-taoshop', {
            _id: userID,
            ten: dataTaoShop.ten.trim(),
            diaChi: dataTaoShop.diaChi,
            logoShop: dataTaoShop.logoShop,
            keyPaypal: dataTaoShop.keyPaypal,
            viShop: '',
            ngayTao: dataTaoShop.ngayTao,
            moTa: dataTaoShop.moTa
        });
        if (resData.data.status === 'success') {
            message.success('Đăng ký gian hàng thành công. Chờ duyệt nhé');
            setTimeout(() => {
                window.location.pathname = '/';
            }, 2000);
        } else {
            message.error(resData.data.message);
        }
    }

    useEffect(() => {
        LayEmailTheoIDUser(userID);
        dispatch({ type: 'CLOSE_HEADER' });
    }, [])

    useEffect(() => {
        if (firstTime1 === false) {
            if (imageAsFile_Logo.length === 0) {
                message.error('Vui lòng chọn Logo cho shop')
            } else {
                if (countAnhDaUploadThanhCong_Logo === imageAsFile_Logo.length) {
                    message.success('Upload logo shop thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Logo])

    return (
        <Fragment>
            <div className='col'>
                <div className='row' style={{ float: 'right', marginRight: 20 }}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button size='large' style={{ marginTop: 15 }}>
                            <img alt="" src='/logoshop.png' width="30" height="30" /> &nbsp; {dataEmail} <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className='container' style={{ marginTop: 50 }}>
                    <div className='col'>
                        <br></br>
                        <center><h2>ĐĂNG KÝ GIAN HÀNG</h2></center>
                        <div>
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                            >
                                <Form.Item
                                    label="Tên gian hàng"
                                    name="ten"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên gian hàng',
                                        },
                                    ]}
                                >
                                    <Input onChange={(e) => {
                                        setDataTaoShop({
                                            ...dataTaoShop,
                                            ten: e.target.value
                                        })
                                    }} />
                                </Form.Item>

                                <Form.Item
                                    label="Địa chỉ"
                                    name="diachi"
                                >
                                    <Input onChange={(e) => {
                                        setDataTaoShop({
                                            ...dataTaoShop,
                                            diaChi: e.target.value
                                        })
                                    }} />
                                </Form.Item>

                                <Form.Item
                                    label="Mô tả"
                                    name="mota"
                                >
                                    <Input onChange={(e) => {
                                        setDataTaoShop({
                                            ...dataTaoShop,
                                            moTa: e.target.value
                                        })
                                    }} />
                                </Form.Item>
                                <Form.Item
                                    label="Key Paypal"
                                    name="keypaypal"
                                >
                                    <Input onChange={(e) => {
                                        setDataTaoShop({
                                            ...dataTaoShop,
                                            keyPaypal: e.target.value
                                        })
                                    }} />
                                </Form.Item>

                                <Form.Item
                                    label="Logo"
                                    name="logo">
                                    <input type='file'
                                        onChange={(e) => {
                                            handleChangeIMG_Logo(e);
                                            setCountAnhDaUploadThanhCong_Logo(0);
                                            setFirstTime1(false);
                                        }}>
                                    </input>
                                </Form.Item>

                                <Form.Item
                                    name='showlogo'
                                    label="Show ảnh logo">
                                    {
                                        imageAsUrl_Logo.map((src, i) => {
                                            return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                        })
                                    }
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" style={{ width: 300 }}
                                        onClick={() => {
                                            KiemTraDuLieuNhap();
                                        }}>
                                        Xác nhận
                                                </Button>
                                </Form.Item>

                                <Link to='/' style={{ marginLeft: '43%' }}>
                                    Trở về Trang Chủ
                                </Link>

                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
