import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Input, message, Rate, Progress, Avatar, Select } from 'antd';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';

export default function ClientCommentComponent(props) {
    const dataProduct = props.thongTinProduct;
    const dataShop = props.thongTinShop;
    const [cookies, setCookie, removeCookie] = useCookies();
    const [vietNhanXet, setVietNhanXet] = useState(false);
    const [countNhanXetShow, setCountNhanXetShow] = useState(10);
    const isAdmin = useSelector(state => state.isAdmin);
    const { TextArea } = Input;
    const { Option } = Select;
    const [arrPhanTram, setArrPhanTram] = useState([]);
    const [dataCommentTong, setDataCommentTong] = useState([]);
    const [dataCommentShow, setDataCommentShow] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [nhanXetOption, setNhanXetOption] = useState(0);
    const [endXemThem, setEndXemThem] = useState(false);

    const [comment, setComment] = useState({
        soSao: '',
        tieuDe: '',
        noiDung: ''
    })

    function to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    function hamLamTronSao(soSao) {
        var sao = parseInt(soSao);

        if (soSao - sao >= 0.5) {
            return sao + 0.5;
        } else {
            return sao;
        }

    }

    function KiemTraDuLieu() {
        if (comment.soSao === '') {
            message.error('Vui lòng chọn số sao để đánh giá cho sản phẩm này');
        } else {
            if (comment.noiDung.length < 20) {
                message.error('Nhận xét ít nhất 20 kí tự');
            } else {
                GuiNhanXet();
            }
        }
    }

    async function GuiNhanXet() {
        let res = await axios.post('hethong/comments-them', {
            soSao: comment.soSao,
            tieuDe: comment.tieuDe,
            noiDung: comment.noiDung,
            idUser: cookies.userID,
            idProduct: dataProduct.idShow
        });

        if (res.data.status === 'success') {
            message.success('Nhận xét của bạn đã được gửi để duyệt');
            setVietNhanXet(false);
        } else {
            message.error(res.data.message);
        }
    }

    async function LayDataSoSao() {
        let res = await axios.get('hethong/comments-product?id=' + dataProduct.idShow);

        if (res.data.status === 'success') {
            setArrPhanTram(res.data.arrPhanTram);
            setDataCommentTong(res.data.data);
        } else {
            message.error('Lấy data sao thất bại!');
        }
    }

    async function LayDataCommentTheoOption() {
        let res = await axios.get('hethong/comments-nguoidung?id=' + dataProduct.idShow + '&option=' + nhanXetOption);

        if (res.data.status === 'success') {
            setDataCommentShow(res.data.data);
            setDataUser(res.data.dataUser);
        } else {
            message.error('Lấy data nhận xét thất bại!');
        }
    }

    useEffect(() => {
        if (dataProduct.idShow !== '') {
            LayDataSoSao();
            LayDataCommentTheoOption();
        }
    }, [dataProduct.idShow])

    useEffect(() => {
        LayDataCommentTheoOption();
        setCountNhanXetShow(10);
    }, [nhanXetOption])

    useEffect(() => {
        if (dataCommentShow.length === 0) {
            setEndXemThem(true);
        } else {
            if (countNhanXetShow >= dataCommentShow.length) {
                setEndXemThem(true);
            } else {
                setEndXemThem(false);
            }
        }

    }, [dataCommentShow, countNhanXetShow])

    return (
        <div className="row" style={{ marginTop: 40 }}>
            <div className="col">
                <h5>KHÁCH HÀNG NHẬN XÉT</h5>
                <div className="col-sm-9">
                    <div className='container' style={{ padding: 20 }}>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <center>
                                    <h5>Đánh giá trung bình</h5>
                                    <span style={{ fontSize: 30, fontWeight: 'bold', color: 'red' }}>{dataProduct.soSao}/5</span><br></br>
                                    <Rate disabled allowHalf value={hamLamTronSao(dataProduct.soSao)}></Rate><br></br>
                                    <span style={{ color: 'gray' }}>({dataCommentTong.length} nhận xét)</span>
                                </center>
                            </div>

                            <div className='col-sm-5'>
                                <div className='row'>5 <i className="fas fa-star" style={{ marginTop: 3 }}></i>&nbsp;&nbsp;<Progress percent={arrPhanTram[0]} style={{ width: '88%' }} /></div>
                                <div className='row'>4 <i className="fas fa-star" style={{ marginTop: 3 }}></i>&nbsp;&nbsp;<Progress percent={arrPhanTram[1]} style={{ width: '88%' }} /></div>
                                <div className='row'>3 <i className="fas fa-star" style={{ marginTop: 3 }}></i>&nbsp;&nbsp;<Progress percent={arrPhanTram[2]} style={{ width: '88%' }} /></div>
                                <div className='row'>2 <i className="fas fa-star" style={{ marginTop: 3 }}></i>&nbsp;&nbsp;<Progress percent={arrPhanTram[3]} style={{ width: '88%' }} /></div>
                                <div className='row'>1 <i className="fas fa-star" style={{ marginTop: 3 }}></i>&nbsp;&nbsp;<Progress percent={arrPhanTram[4]} style={{ width: '88%' }} /></div>
                            </div>

                            <div className='col-sm-3'>
                                <div style={{ marginLeft: 10 }}>
                                    <center>
                                        <br></br>
                                        Nhận xét về sản phẩm<br></br>
                                        <Button variant='warning' style={{ width: '100%' }} onClick={() => {
                                            if (cookies.token === undefined) {
                                                message.error('Vui lòng đăng nhập để gửi câu hỏi');
                                            } else {
                                                if (isAdmin) {
                                                    message.error('Admin không được thực hiện chức năng này');
                                                } else {
                                                    if (vietNhanXet) {
                                                        setVietNhanXet(false);
                                                    } else {
                                                        setVietNhanXet(true);
                                                    }
                                                }
                                            }
                                        }}>{vietNhanXet ? 'Đóng' : 'Viết nhận xét'}</Button>
                                    </center>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr></hr>

                    {
                        vietNhanXet === true && (
                            <Fragment>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <h5>GỬI NHẬN XÉT CỦA BẠN</h5>
                                        1. Đánh giá của bạn về sản phẩm này: <Rate onChange={(value) => {
                                            setComment({
                                                ...comment,
                                                soSao: value
                                            })
                                        }}></Rate>

                                        <p style={{ marginTop: 10 }}>2. Tiêu đề của nhận xét:</p>
                                        <Input placeholder='Nhập tiêu đề nhận xét (Không bắt buộc)' onChange={(e) => {
                                            setComment({
                                                ...comment,
                                                tieuDe: e.target.value
                                            })
                                        }}></Input>

                                        <p style={{ marginTop: 15 }}>3. Viết nhận xét của bạn vào bên dưới:</p>
                                        <TextArea placeholder='Nhận xét xủa bạn về sản phẩm này' autoSize={{ minRows: 3, maxRows: 5 }} onChange={(e) => {
                                            setComment({
                                                ...comment,
                                                noiDung: e.target.value
                                            })
                                        }}></TextArea>

                                        <Button variant='warning' style={{ width: '100%', marginTop: 15 }} onClick={() => {
                                            KiemTraDuLieu();
                                        }}>Gửi nhận xét</Button>
                                    </div>

                                    <div className='col-sm-6'>
                                        <div className='row'>
                                            <div className='col-sm-4'>
                                                <img alt='ảnh' src={dataProduct.img.chinh} width={120} height={200}></img>
                                            </div>
                                            <div className='col-sm-8' style={{ marginTop: 20 }}>
                                                <h5 style={{ marginLeft: 10 }}>{dataProduct.ten}</h5>
                                                <p style={{ marginLeft: 10, lineHeight: 1.4 }}>{format_curency(dataProduct.giaCuoiCung.toString())} đ</p>
                                                <p style={{ marginLeft: 10, lineHeight: 1.4 }}>Cung cấp bởi: <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.ten)}>{dataShop.ten}</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                            </Fragment>
                        )
                    }

                    {/* {
                        dataComment.map((item,i)=>{
                            return 
                        })
                    } */}

                    <div className='row'>
                        <div className='col-sm-3'>
                            <span style={{ fontSize: 16 }}>Chọn xem nhận xét</span>
                        </div>

                        <div className='col-sm-9'>
                            <div>
                                <Select style={{ width: 200 }} size='large' defaultValue={0} onChange={(value) => {
                                    setNhanXetOption(value);
                                }}>
                                    <Option value={0}>Tất cả sao</Option>
                                    <Option value={1}>5 sao</Option>
                                    <Option value={2}>4 sao</Option>
                                    <Option value={3}>3 sao</Option>
                                    <Option value={4}>2 sao</Option>
                                    <Option value={5}>1 sao</Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {
                        dataCommentShow.map((item, i) => {
                            if (i < countNhanXetShow) {
                                return <div key={i} className='row' style={{ marginTop: 40 }}>
                                    <div className='col-sm-3'>
                                        <center>
                                            <Avatar size={64} icon={<UserOutlined />} /><br></br>
                                            <span><b>{dataUser[i]}</b></span> <br></br>
                                            Ngày nhận xét: {hamChuyenDoiNgay(new Date(item.ngayTao))}
                                        </center>
                                    </div>
                                    <div className='col-sm-9'>
                                        <span style={{ fontSize: 16 }}><Rate disabled value={item.soSao}></Rate>&nbsp;&nbsp; <b>{item.tieuDe}</b></span><br></br>
                                        {item.noiDung}
                                        {
                                            item.traLoi !== '' && (
                                                <Fragment>
                                                    <br></br>
                                                    <br></br>
                                                    <div className='row'>
                                                        <div className='col-sm-1'>
                                                            <Avatar size='large' style={{ backgroundColor: '#0099FF' }}>TĐ</Avatar>
                                                        </div>

                                                        <div className='col-sm-11'>
                                                            <span><b>WareHouse</b></span><br></br>
                                                            {item.traLoi}
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            )
                                        }
                                    </div>
                                </div>
                            }
                        })
                    }

                    {
                        endXemThem === false && (
                            <div className='row' style={{ marginTop: 20 }}>
                                <div className='col-sm-3'>

                                </div>
                                <div className='col-sm-9'>
                                    <Link to='/' onClick={(e) => {
                                        e.preventDefault();
                                        setCountNhanXetShow(prev => prev + 10);
                                    }}>Xem thêm</Link>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
