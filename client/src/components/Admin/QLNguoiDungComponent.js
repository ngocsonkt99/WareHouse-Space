import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';

export default function QuanLyNguoiDungComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataUser, setDataUser] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [pageNow, setPageNow] = useState(1);


    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataUserTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/' + page);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng thất bại");
        }
    }

    async function LayDanhSachUserSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng theo search thất bại");
        }
    }

    async function LayDataUser_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users-chuakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng chưa khóa thất bại");
        }
    }

    async function LayDataUser_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users-dakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng đã khóa thất bại");
        }
    }

    async function KhoaUser(userID) {
        let res = await axios.put('hethong/users-khoauser', {
            id: userID
        })

        if (res.data.status === 'success') {
            message.success('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Khóa thất bại !');
        }
    }

    async function MoKhoaUser(userID) {
        let res = await axios.put('hethong/users-mokhoauser', {
            id: userID
        })

        if (res.data.status === 'success') {
            message.success('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Mở khóa thất bại !');
        }
    }

    useEffect(() => {
        LayDataUserTheoTrang(pageNow - 1);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataUserTheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataUserTheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataUser_ChuaKhoa_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataUser_DaKhoa_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo Email/SĐT hoặc Tên khách hàng' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachUserSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                    setTrangThaiOption(value);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa khóa</Option>
                                    <Option value={2}>Đã khóa</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Chứng minh thư</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Trạng thái khóa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataUser.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{item.ten}</td>
                                            <td>{item.email}</td>
                                            <td>{item.sdt}</td>
                                            <td>{item.cmnd}</td>
                                            <td>{item.gioiTinh === 0 ? 'Nữ' : 'Nam'}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngaySinh))}</td>
                                            <td style={{ width: 150 }}><span style={{ color: item.thongTinShop.isLock === false ? 'red' : 'blue' }}><strong>{item.thongTinShop.isLock === false ? 'Chưa khóa' : 'Đã khóa'}</strong></span></td>
                                            <td style={{ width: 100, paddingTop: 15 }}>
                                                <center>
                                                    <Button size='large' type="primary" icon={item.isLock ? <LockOutlined /> : <UnlockOutlined />} onClick={() => {
                                                        if (item.isLock) {
                                                            MoKhoaUser(item._id);
                                                        } else {
                                                            KhoaUser(item._id);
                                                        }
                                                    }} />
                                                </center>
                                            </td>
                                        </tr>
                                    })
                                )
                            }
                        </tbody>
                    </Table>
                    {
                        setSpinnerReducer === 1 && (
                            <Spinner animation="border" role="status" style={{ marginLeft: 700 }}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )
                    }
                    <Pagination defaultPageSize={1} current={pageNow} total={tongSoTrang} onChange={(page) => {
                        dispatch({ type: 'SPINNER_DATABASE' });
                        setPageNow(page);
                        if (dataSearch === '') {
                            if (trangThaiOption === 0) {
                                LayDataUserTheoTrang(page - 1);
                            }
                            if (trangThaiOption === 1) {
                                LayDataUser_ChuaKhoa_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 2) {
                                LayDataUser_DaKhoa_TheoTrang(page - 1);
                            }
                        } else {
                            LayDanhSachUserSearch(page - 1);
                        }

                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
