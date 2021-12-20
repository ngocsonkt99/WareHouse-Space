import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Input, message } from 'antd';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

export default function QuestAndAnswerComponent(props) {
    const dataProduct = props.thongTinProduct;
    const [cauHoi, setCauHoi] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies();
    const [dataCauHoi, setDataCauHoi] = useState([]);
    const [dataThich, setDataThich] = useState([]);
    const [thichOk, setThichOk] = useState(false);
    const [countCauHoiShow, setCountCauHoiShow] = useState(4);
    const isAdmin = useSelector(state => state.isAdmin);
    const [endXemThem, setEndXemThem] = useState(false);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function GuiCauHoi() {
        let res = await axios.post('hethong/questanswer-them', {
            id: dataProduct.idShow,
            question: cauHoi
        });

        if (res.data.status === 'success') {
            message.success('Đã gửi câu hỏi. Chờ duyệt nhé');
        } else {
            message.error(res.data.message);
        }
    }

    async function LayCauHoiTheoIDSanPham() {
        let res = await axios.get('hethong/questanswer-nguoidung?id=' + dataProduct.idShow + '&idUser=' + cookies.userID);

        if (res.data.status === 'success') {
            setDataCauHoi(res.data.data);
            setDataThich(res.data.dataThich);
        } else {
            message.error('Lấy data câu hỏi thất bại');
        }
    }

    async function CapNhatThichCauHoi(cauHoiID) {
        let res = await axios.put('hethong/questanswer-capnhatthich', {
            idCauHoi: cauHoiID,
            idUser: cookies.userID
        });

        if (res.data.status === 'success') {
            setThichOk(true);
            message.success('Cám ơn bạn đã đóng góp ý kiến');
        } else {
            setThichOk(false);
            message.error('Thích câu hỏi thất bại');
        }
    }

    useEffect(() => {
        LayCauHoiTheoIDSanPham();
    }, [dataProduct])

    useEffect(() => {
        if (thichOk === true) {
            LayCauHoiTheoIDSanPham();
            setThichOk(false);
        }
    }, [thichOk])

    useEffect(() => {
        if (dataCauHoi.length === 0) {
            setEndXemThem(true);
        } else {
            if (countCauHoiShow >= dataCauHoi.length) {
                setEndXemThem(true);
            } else {
                setEndXemThem(false);
            }
        }
    }, [dataCauHoi, countCauHoiShow])

    return (
        <div className="row" style={{ marginTop: 40 }}>
            <div className="col">
                <h5>HỎI, ĐÁP VỀ SẢN PHẨM</h5>
                <div className="col-sm-9">
                    {
                        dataCauHoi.map((item, i) => {
                            if (i < countCauHoiShow) {
                                return <div key={i} className='row' style={{ backgroundColor: 'lightgrey', marginTop: 10, borderRadius: 5, padding: 5 }}>
                                    <div className='col-sm-2'>
                                        <center>
                                            <span style={{ fontSize: 24, fontWeight: 'bold' }}>{item.luotThich}</span><br></br>
                                            <span>thích</span>
                                        </center>
                                    </div>

                                    <div className='col-sm-10'>
                                        <p style={{ lineHeight: 1.5, fontSize: 16 }}><strong>{item.question}</strong></p>
                                        <p style={{ lineHeight: 1.5, fontSize: 16 }}>{item.answer}</p>
                                        <small>Đã trả lời vào {hamChuyenDoiNgay(new Date(item.ngayTraLoi))}</small>
                                        <div>
                                            <Link to='/' onClick={(e) => {
                                                e.preventDefault();
                                                if (cookies.token === undefined) {
                                                    message.error('Vui lòng đăng nhập để thích câu hỏi');
                                                } else {
                                                    if (dataThich[i] === 1) {
                                                        message.warning('Bạn đã thích câu trả lời này');
                                                    } else {
                                                        CapNhatThichCauHoi(item._id);
                                                    }
                                                }
                                            }}>
                                                <i className="far fa-thumbs-up"></i>
                                                {
                                                    dataThich[i] === 0 ? 'Thích' : 'Đã thích'
                                                }
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            }
                        })
                    }

                    {
                        endXemThem === false && (
                            <div className='row' style={{ paddingLeft: 15, backgroundColor: 'white' }}>
                                <hr style={{ width: '100%' }}></hr>
                                <Link to='/' onClick={(e) => {
                                    e.preventDefault();
                                    setCountCauHoiShow(prev => prev + 4);
                                }}>Xem thêm</Link>
                                <hr style={{ width: '100%' }}></hr>
                            </div>
                        )
                    }

                    <div className='row' style={{ backgroundColor: 'white', marginTop: 10 }}>
                        <div className='col-sm-9'>
                            <Input placeholder='Hãy đặt câu hỏi liên quan đến sản phẩm...' style={{ width: '100%', height: 38 }}
                                onChange={(e) => {
                                    setCauHoi(e.target.value);
                                }}></Input>
                        </div>
                        <div className='col-sm-3'>
                            <Button variant='warning' style={{ width: '100%' }} onClick={() => {
                                if (cookies.token === undefined) {
                                    message.error('Vui lòng đăng nhập để gửi câu hỏi');
                                } else {
                                    if (isAdmin) {
                                        message.error('Admin không được thực hiện chức năng này');
                                    } else {
                                        if (cauHoi.length > 0) {
                                            GuiCauHoi()
                                        } else {
                                            message.warning('Vui lòng nhập câu hỏi');
                                        }
                                    }
                                }
                            }}>Gửi câu hỏi</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
