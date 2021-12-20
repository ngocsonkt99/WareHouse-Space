import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { Steps, Select, message, Breadcrumb } from 'antd';
import { Form, Row, Col, Button, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function CheckoutShipping() {
    const dispatch = useDispatch();
    const history = useHistory();
    const thongTinDatHang = useSelector(state => state.thongTinDatHang);
    const { Step } = Steps;
    const { Option } = Select;
    const [dataThanhPho, setDataThanhPho] = useState([]);
    const [dataQuan, setDataQuan] = useState([]);
    const [dataPhuong, setDataPhuong] = useState([]);
    const [checkDuLieuNhap, setCheckDuLieuNhap] = useState(false);
    const [thongTin, setThongTin] = useState({
        hoTen: '',
        sdt: '',
        diaChi: '',
        phuong: '',
        quan: '',
        thanhPho: ''
    });
    const [diaChi, setDiaChi] = useState({
        idThanhPho: '-1',
        idQuan: '-1',
        idPhuong: '-1',
        diaChi: ''
    });
    const steps = [
        {
            title: 'Đăng nhập',
        },
        {
            title: 'Địa chỉ giao hàng',
        },
        {
            title: 'Thanh toán & Đặt mua',
        },
    ];

    function KiemTraThongTinNhap(data) {
        const regSDT = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        if (data.hoTen === '' || data.sdt === '' || data.diaChi === '' || data.phuong === '' || data.quan === '' || data.thanhPho === '') {
            message.error('Thông tin không hợp lệ. Vui lòng kiểm tra lại');
            return false;
        } else {
            if (regSDT.test(data.sdt)) {
                return true;
            } else {
                message.error('Số điện thoại không hợp lệ');
                return false;
            }
        }
    }

    async function LayDataThanhPho() {
        let res = await axios.get('hethong/locals');

        if (res.data.status === 'success') {
            setDataThanhPho(res.data.data);
        }
    }

    async function LayDataQuanTheoIDThanhPho(thanhPhoID) {
        let res = await axios.get('hethong/locals-quan?idThanhPho=' + thanhPhoID);

        if (res.data.status === 'success') {
            setDataQuan(res.data.data);
        }
    }

    async function LayDataPhuongTheoIDQuan(thanhPhoID, quanID) {
        let res = await axios.get('hethong/locals-phuong?idThanhPho=' + thanhPhoID + '&idQuan=' + quanID);

        if (res.data.status === 'success') {
            setDataPhuong(res.data.data);
        }
    }

    async function LayTenLocalTheoID(thanhPhoID, quanID, phuongID) {
        if (thanhPhoID !== '' && quanID !== '' && phuongID !== '') {
            let res = await axios.get('hethong/locals-address?idThanhPho=' + thanhPhoID + '&idQuan=' + quanID + '&idPhuong=' + phuongID);

            if (res.data.status === 'success') {
                setThongTin({
                    ...thongTin,
                    phuong: res.data.tenPhuong,
                    quan: res.data.tenQuan,
                    thanhPho: res.data.tenThanhPho,
                })
            }
        }
    }

    useEffect(() => {
        dispatch({ type: 'CLOSE_HEADER' });
        LayDataThanhPho();
    }, [])

    useEffect(() => {
        if (diaChi.idThanhPho !== '-1') {
            LayDataQuanTheoIDThanhPho(diaChi.idThanhPho);
        }
    }, [diaChi.idThanhPho])

    useEffect(() => {
        if (diaChi.idQuan !== '-1') {
            LayDataPhuongTheoIDQuan(diaChi.idThanhPho, diaChi.idQuan);
        }
    }, [diaChi.idQuan])

    useEffect(() => {
        LayTenLocalTheoID(diaChi.idThanhPho, diaChi.idQuan, diaChi.idPhuong);
    }, [diaChi])

    useEffect(() => {
        if (checkDuLieuNhap === true) {
            history.push('/checkout/payment');
            dispatch({ type: 'THONGTIN_DATHANG', thongTin: thongTin });
        }
    }, [checkDuLieuNhap])

    return (
        <Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src='/logo2.png'
                        width="40"
                        height="40"
                        style={{ marginRight: 5 }}
                        className="d-inline-block"
                    />
                    <span style={{ fontWeight: 'bold', color: 'Blue' }}>WareHouse</span>
                </Navbar.Brand>
            </Navbar>
            <div className="container" style={{ height: 'auto', padding: 10 }}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">Trang Chủ</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            window.location.pathname = 'checkout/cart';
                        }}>Giỏ hàng</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            window.location.pathname = 'checkout/shipping';
                        }}>Địa chỉ giao hàng</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <br></br>
                <div className='col'>
                    <div>
                        <Steps current={1}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                    </div>

                    <div style={{ marginTop: 50, padding: 20 }}>
                        {/* <p><strong>2. Địa chỉ giao hàng</strong></p> */}
                        <div className='row'>
                            <div className='col-sm-2'>

                            </div>
                            <div className='col-sm-8' style={{ backgroundColor: '#F8F9FA', padding: 10 }}>
                                <Form>
                                    <Form.Group as={Row} controlId="formHorizontalHoTenMuaHang">
                                        <Form.Label column sm={3}>
                                            Họ tên
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder='Nhập họ tên' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    hoTen: e.target.value
                                                });
                                            }}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalSdtMuaHang">
                                        <Form.Label column sm={3}>
                                            Số điện thoại
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder='Nhập số điện thoại' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    sdt: e.target.value
                                                });
                                            }}></Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalDiaChiMuaHang1">
                                        <Form.Label column sm={3}>
                                            Tỉnh/Thành phố
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Select
                                                allowClear
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                style={{ width: '100%' }}
                                                size='large'
                                                value={diaChi.idThanhPho}
                                                onChange={(value) => {
                                                    setDiaChi({
                                                        idThanhPho: value,
                                                        idPhuong: '-1',
                                                        idQuan: '-1'
                                                    });
                                                }}
                                            >
                                                <Option value={'-1'}>Chọn Tỉnh/Thành phố</Option>
                                                {
                                                    dataThanhPho.map((item, i) => {
                                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalDiaChiMuaHang2">
                                        <Form.Label column sm={3}>
                                            Quận/Huyện
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Select
                                                allowClear
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                value={diaChi.idQuan}
                                                style={{ width: '100%' }}
                                                size='large'
                                                onChange={(value) => {
                                                    setDiaChi({
                                                        ...diaChi,
                                                        idQuan: value,
                                                        idPhuong: '-1'
                                                    });
                                                }}
                                            >
                                                <Option value={'-1'}>Chọn Quận/Huyện</Option>
                                                {
                                                    dataQuan.map((item, i) => {
                                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalDiaChiMuaHang3">
                                        <Form.Label column sm={3}>
                                            Phường/Xã
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Select
                                                allowClear
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                value={diaChi.idPhuong}
                                                style={{ width: '100%' }}
                                                size='large'
                                                onChange={(value) => {
                                                    setDiaChi({
                                                        ...diaChi,
                                                        idPhuong: value
                                                    });
                                                }}
                                            >
                                                <Option value={'-1'}>Chọn Phường/Xã</Option>
                                                {
                                                    dataPhuong.map((item, i) => {
                                                        return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                    })
                                                }
                                            </Select>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formHorizontalPasswordDiaChiMuaHang">
                                        <Form.Label column sm={3}>
                                            Địa chỉ
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control as='textarea' rows='3' onChange={(e) => {
                                                setThongTin({
                                                    ...thongTin,
                                                    diaChi: e.target.value
                                                })
                                            }}>
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row}>
                                        <Col sm={{ span: 8, offset: 3 }}>
                                            <Link to='/' onClick={(e) => {
                                                e.preventDefault();
                                                setCheckDuLieuNhap(KiemTraThongTinNhap(thongTin));
                                            }}>
                                                <Button>Giao đến địa chỉ này</Button>
                                            </Link>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className='col-sm-2'>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>

    )
}

