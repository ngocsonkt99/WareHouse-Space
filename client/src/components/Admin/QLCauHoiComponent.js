import React, { Fragment, useState, useEffect } from 'react';
import { Form, Row, Col, Table, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message, Button } from 'antd';
import { ModalChiTietCauHoi } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';

export default function QLCauHoiComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataCauHoi, setDataCauHoi] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [pageNow, setPageNow] = useState(1);
    const [traLoi, setTraLoi] = useState(false);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataCauHoiTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin/' + page);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi khách hàng thất bại");
        }
    }

    async function LayDanhSachCauHoiSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi theo search thất bại");
        }
    }

    async function LayDataCauHoi_ChuaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin-chuaduyet/' + page);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi chưa duyệt thất bại");
        }
    }

    async function LayDataCauHoi_DaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin-daduyet/' + page);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi đã duyệt thất bại");
        }
    }

    useEffect(() => {
        LayDataCauHoiTheoTrang(pageNow - 1);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataCauHoiTheoTrang(pageNow - 1);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataCauHoiTheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 1) {
            LayDataCauHoi_ChuaDuyet_TheoTrang(pageNow - 1);
        }
        if (trangThaiOption === 2) {
            LayDataCauHoi_DaDuyet_TheoTrang(pageNow - 1);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalChiTietCauHoi traLoi={traLoi}></ModalChiTietCauHoi>
            <div  >
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID sản phẩm' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button style={{ width: 200, height: 40, background: '#041527', color: '#fff' }} onClick={() => {
                                    setPageNow(1);
                                    LayDanhSachCauHoiSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' value={trangThaiOption} onChange={(value) => {
                                    setTrangThaiOption(value);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa duyệt</Option>
                                    <Option value={2}>Đã duyệt</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID sản phẩm</th>
                                <th>Câu hỏi</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái duyệt</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataCauHoi.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idProduct}</td>
                                            <td>{item.question}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td><span style={{ color: item.isAccept === false ? 'red' : 'blue' }}><strong>{item.isAccept === false ? 'Chưa duyệt' : 'Đã duyệt'}</strong></span></td>
                                            <td style={{ width: 200, paddingTop: 10 }}>
                                                <center>
                                                    <Button type="default" icon={<EditOutlined />} size='large'
                                                        onClick={() => {
                                                            dispatch({ type: 'SHOW_CHITIET_CAUHOI' });
                                                        }}
                                                        onMouseOver={() => {
                                                            setTraLoi(false);
                                                        }} />
                                                    {
                                                        item.isAccept === false && (
                                                            <Button style={{ marginLeft: 25 }} size='large' type="primary" icon={<CheckOutlined />}
                                                                onClick={() => {
                                                                    dispatch({ type: 'SHOW_CHITIET_CAUHOI' });
                                                                }}
                                                                onMouseOver={() => {
                                                                    setTraLoi(true);
                                                                }} />
                                                        )
                                                    }
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
                                LayDataCauHoiTheoTrang(page - 1);
                            }
                            if (trangThaiOption === 1) {
                                LayDataCauHoi_ChuaDuyet_TheoTrang(page - 1);
                            }
                            if (trangThaiOption === 2) {
                                LayDataCauHoi_DaDuyet_TheoTrang(page - 1);
                            }
                        } else {
                            LayDanhSachCauHoiSearch(page - 1);
                        }

                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
