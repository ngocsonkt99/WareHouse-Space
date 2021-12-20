import React, { useState, useEffect, Fragment } from 'react';
import { Form, Input, Checkbox, Radio, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';

export default function Account() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [cookies, setCookie, removeCookie] = useCookies();
    const [valueCheckbox, setValueCheckbox] = useState(false);
    const dataNgay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const dataThang = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const dataNam = [];
    // const [dataUser, setDataUser] = useState({
    //     _id:'',
    //     ten:'',
    //     lowerTen:'',
    //     email:'',
    //     sdt:'',
    //     cmnd:'',
    //     ngaySinh:'',
    //     gioTinh:'',
    //     taiKhoan:{
    //         tenTaiKhoan:'',
    //         matKhau:''
    //     }
    // });

    const [dataUser, setDataUser] = useState({});
    let maxOffset = 120;
    let thisYear = (new Date()).getFullYear();
    for (let x = 0; x <= maxOffset; x++) {
        dataNam.push(thisYear - x)
    }

    const [thongTinSua, setThongTinSua] = useState({
        hoTen: '',
        gioiTinh: '',
        ngaySinh: {
            ngay: 0,
            thang: -1,
            nam: 0
        },
        matKhauCu: '',
        matKhauMoi: '',
        nhapLai: ''
    })

    const layout = {
        labelCol: {
            span: 3,
        },
        wrapperCol: {
            span: 12,
        },
    };

    const tailLayout = {
        wrapperCol: {
            offset: 3,
            span: 12,
        },
    };

    function KiemTraDuLieuHopLe() {
        if (thongTinSua.hoTen === '') {
            message.error('Vui lòng nhập tên', 3);
        } else {
            if (valueCheckbox === true) {
                if (thongTinSua.matKhauMoi !== thongTinSua.nhapLai) {
                    message.error('Mật khẩu mới không trùng khớp khi nhập lại', 3);
                } else {
                    KiemTraMatKhau(cookies.userID);
                }
            } else {
                CapNhatTaiKhoan(cookies.userID);
            }
        }
    }

    async function KiemTraMatKhau(userID) {
        let res = await axios.get('hethong/users-kiemtra-doimatkhau?idUser=' + userID + '&matKhauCu=' + thongTinSua.matKhauCu + '&matKhauMoi=' + thongTinSua.matKhauMoi);
        if (res.data.status === 'success') {
            CapNhatTaiKhoan(cookies.userID);
        } else {
            message.error(res.data.message, 3);
        }
    }

    async function LayDataUserTheoID(userID) {
        let res = await axios.get('hethong/users-item?idUser=' + userID);
        if (res.data.status === 'success') {
            setDataUser(res.data.data);
        } else {
            message.error('Lấy data user thất bại');
        }
    }

    async function CapNhatTaiKhoan(userID) {
        let res = await axios.put('hethong/users-capnhat-taikhoan', {
            _id: userID,
            hoTen: thongTinSua.hoTen,
            gioiTinh: thongTinSua.gioiTinh,
            ngaySinh: new Date(thongTinSua.ngaySinh.nam, thongTinSua.ngaySinh.thang, thongTinSua.ngaySinh.ngay),
            matKhauMoi: thongTinSua.matKhauMoi,
            trangThaiCapNhatMatKhau: valueCheckbox
        });

        if (res.data.status === 'success') {
            message.success('Cập nhật thông tin tài khoản thành công', 3);
            window.location.reload();
        } else {
            message.error('Cập nhật thông tin tài khoản thất bại', 3);
        }
    }

    useEffect(() => {
        dispatch({ type: 'SHOW_HEADER' });
        LayDataUserTheoID(cookies.userID)
    }, [])

    useEffect(() => {
        setThongTinSua({
            ...thongTinSua,
            hoTen: dataUser.ten,
            gioiTinh: dataUser.gioiTinh,
            ngaySinh: {
                ngay: new Date(dataUser.ngaySinh).getDate(),
                thang: new Date(dataUser.ngaySinh).getMonth(),
                nam: new Date(dataUser.ngaySinh).getFullYear()
            }
        })
    }, [dataUser])

    return (
        <Fragment>
            <div className='col'>
                <span style={{ fontSize: 20 }}>Thông tin tài khoản</span>
                <br></br>
                <div style={{ backgroundColor: 'white', width: '100%', padding: 10, paddingTop: 20 }}>
                    <Form {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}>
                        <Form.Item
                            label="Họ tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                            <Input value={thongTinSua.hoTen} onChange={(e) => {
                                setThongTinSua({
                                    ...thongTinSua,
                                    hoTen: e.target.value
                                })
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại">
                            <Input disabled value={dataUser.sdt} />
                        </Form.Item>

                        <Form.Item
                            label="Email">
                            <Input disabled value={dataUser.email} />
                        </Form.Item>

                        <Form.Item
                            label="Giới tính">
                            <Radio.Group value={thongTinSua.gioiTinh} onChange={(e) => {
                                setThongTinSua({
                                    ...thongTinSua,
                                    gioiTinh: e.target.value
                                })
                            }}>
                                <Radio value={0}>Nữ</Radio>
                                <Radio value={1}>Nam</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Ngày sinh">
                            <span>
                                <Select style={{ width: '30%' }} value={thongTinSua.ngaySinh.ngay.toString()} onChange={(value) => {
                                    setThongTinSua({
                                        ...thongTinSua,
                                        ngaySinh: {
                                            ...thongTinSua.ngaySinh,
                                            ngay: value
                                        }
                                    })
                                }}>
                                    <Option value={0}>Ngày</Option>
                                    {
                                        dataNgay.map((ngay, i) => {
                                            return <Option key={i + 1} value={ngay}>{ngay.toString()}</Option>
                                        })
                                    }
                                </Select>

                                <Select style={{ width: '30%', marginLeft: 10 }} value={thongTinSua.ngaySinh.thang.toString()} onChange={(value) => {
                                    setThongTinSua({
                                        ...thongTinSua,
                                        ngaySinh: {
                                            ...thongTinSua.ngaySinh,
                                            thang: value
                                        }
                                    })
                                }}>
                                    <Option value={-1}>Tháng</Option>
                                    {
                                        dataThang.map((thang, i) => {
                                            return <Option key={i + 1} value={thang}>{(thang + 1).toString()}</Option>
                                        })
                                    }
                                </Select>

                                <Select style={{ width: '30%', marginLeft: 10 }} value={thongTinSua.ngaySinh.nam.toString()} onChange={(value) => {
                                    setThongTinSua({
                                        ...thongTinSua,
                                        ngaySinh: {
                                            ...thongTinSua.ngaySinh,
                                            nam: value
                                        }
                                    })
                                }}>
                                    <Option value={0}>Năm</Option>
                                    {
                                        dataNam.map((nam, i) => {
                                            return <Option key={i + 1} value={nam}>{nam.toString()}</Option>
                                        })
                                    }
                                </Select>
                            </span>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Checkbox onChange={(e) => {
                                setThongTinSua({
                                    ...thongTinSua,
                                    matKhauCu: '',
                                    matKhauMoi: '',
                                    nhapLai: ''
                                })
                                if (e.target.checked === true) {
                                    setValueCheckbox(true);
                                } else {
                                    setValueCheckbox(false);
                                }
                            }}></Checkbox> Đổi mật khẩu
                        </Form.Item>

                        {
                            valueCheckbox && (
                                <Fragment>
                                    <Form.Item
                                        label="Mật khẩu cũ">
                                        <Input.Password onChange={(e) => {
                                            setThongTinSua({
                                                ...thongTinSua,
                                                matKhauCu: e.target.value
                                            })
                                        }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu mới">
                                        <Input.Password onChange={(e) => {
                                            setThongTinSua({
                                                ...thongTinSua,
                                                matKhauMoi: e.target.value
                                            })
                                        }} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nhập lại">
                                        <Input.Password onChange={(e) => {
                                            setThongTinSua({
                                                ...thongTinSua,
                                                nhapLai: e.target.value
                                            })
                                        }} />
                                    </Form.Item>
                                </Fragment>
                            )
                        }

                        <Form.Item {...tailLayout}>
                            <Button variant='warning' style={{ width: 200 }} onClick={() => {
                                KiemTraDuLieuHopLe();
                            }}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
