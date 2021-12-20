import React, { useEffect, useState, Fragment } from 'react'
import { axios } from '../../config/constant';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Image, Button } from 'react-bootstrap';

export default function BaiViet(props) {
    const id = props.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [soProductShow, setSoProductShow] = useState(4);
    const [productShowEnd, setProductShowEnd] = useState(false);
    const [dataBaiViet, setDataBaiViet] = useState({
        tieuDe: '',
        img: '',
        ngayTao: new Date(),
        loaiBaiViet: '',
        idProducts: '',
        content: '',
        luotXem: '',
        isLock: false,
        isDelete: false
    });
    const [dataProduct, setDataProduct] = useState([]);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

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

    function tinh_tien(giaGoc, giaTriGiamGia) {
        var tien = 0;
        if (giaTriGiamGia > 100) {
            tien = giaGoc - giaTriGiamGia;
        } else {
            tien = giaGoc - (giaGoc * giaTriGiamGia / 100);
        }

        return tien.toString();
    }

    function setLongString(str) {
        var stringNew = str;
        if (str.length > 70) {
            stringNew = str.substring(0, 70) + '...'
        }
        return stringNew;
    }

    async function LayDataBaiVietTheoID() {
        let res = await axios.get('hethong/baiviet-item?id=' + id);

        if (res.data.status === 'success') {
            setDataBaiViet({
                tieuDe: res.data.data.tieuDe,
                img: res.data.data.img,
                loaiBaiViet: res.data.data.loaiBaiViet,
                ngayTao: res.data.data.ngayTao,
                content: res.data.data.content,
                luotXem: 0,
                isLock: false,
                isDelete: false
            });
        } else {
            message.error('Lấy data bài viết thất bại !');
        }

    }

    async function LayDataProductTheoIDBaiViet() {
        let res = await axios.get('hethong/products-baiviet?id=' + id);

        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
        } else {
            message.error('Lấy data sản phẩm liên quan thất bại !');
        }
    }

    async function CapNhatLuotXemBaiViet() {
        let res = await axios.put('hethong/baiviet-capnhatluotxem', {
            id: id
        });

        if (res.data.status === 'fail') {
            message.error('Cập nhật lượt xem thất bại !');
        }
    }

    useEffect(() => {
        dispatch({ type: 'SHOW_HEADER' });
        LayDataBaiVietTheoID();
        LayDataProductTheoIDBaiViet();
        CapNhatLuotXemBaiViet();
    }, [])

    useEffect(() => {
        if (soProductShow >= dataProduct.length && dataProduct.length !== 0) {
            setProductShowEnd(true);
        }
    }, [soProductShow])

    return (
        <Fragment>
            <div className='container baiviet'>
                <div dangerouslySetInnerHTML={{ __html: dataBaiViet.content }}>
                </div>
                {
                    dataBaiViet.loaiBaiViet === 0 && (
                        <div className="row" style={{ height: 'auto', backgroundColor: '#F8F9FA', marginTop: 40, borderRadius: 10, color: 'black', fontWeight: 'lighter', padding: 10 }}>
                            <div className="col">
                                <h5 style={{ color: 'orange' }}><strong>Đề xuất cho bạn</strong></h5>
                                <hr></hr>
                                <Link></Link>
                                <div className="row">
                                    {
                                        dataProduct.map((item, i) => {
                                            if (i < soProductShow) {
                                                if (item.giaTriGiamGia === 0) {
                                                    return <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                                        <Link to={'/detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">

                                                            <div className="row">
                                                                <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                            </div>

                                                            <div className="row item-ten">
                                                                <span><strong>{setLongString(item.ten)}</strong></span>
                                                            </div>
                                                            <div className="row item-gia">
                                                                <h5><strong>{format_curency(item.gia.toString())} VNĐ</strong></h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                } else {
                                                    return <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>

                                                        <Link to={'/detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                                            <div className="row">
                                                                <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                            </div>
                                                            <div className="row item-ten">
                                                                <span><strong>{setLongString(item.ten)}</strong></span>
                                                            </div>
                                                            <div className="row item-gia">
                                                                <h5><strong>{format_curency(tinh_tien(item.gia, item.giaTriGiamGia))} VNĐ</strong></h5>&nbsp;<span className="percent">{
                                                                    item.giaTriGiamGia > 100 ? '-' + format_curency(item.giaTriGiamGia.toString()) + 'VNĐ' : '-' + item.giaTriGiamGia + '%'
                                                                }</span>
                                                            </div>
                                                            <div className="row item-giagoc">
                                                                <strike><span className="original">{format_curency(item.gia.toString())} VNĐ</span></strike>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                }
                                            }
                                        })
                                    }
                                </div>
                                {
                                    productShowEnd === false && (
                                        <div className="row" style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                            <Button variant="outline-primary" onClick={() => {
                                                setSoProductShow(prev => prev + 4);
                                                console.log(id);
                                            }}>Xem Thêm</Button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                <div>

                </div>
            </div>
        </Fragment>

    )
}
