import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { useCookies, Cookies } from 'react-cookie';
import { message, Rate, Tooltip } from 'antd';
import { Image } from 'react-bootstrap';

export default function Customer_SanPhamDaXem() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [dataProduct, setDataProduct] = useState([]);


    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
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

    function setLongString(str) {
        var stringNew = str;
        if (str.length > 70) {
            stringNew = str.substring(0, 70) + '...'
        }
        return stringNew;
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    async function LayDataSanPhamDaXemTheoIDUser() {
        let res = await axios.get('hethong/products-daxem?id=' + cookies.userID);

        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
        } else {
            message.error('Lấy data sản phẩm thất bại');
        }
    }

    useEffect(() => {
        LayDataSanPhamDaXemTheoIDUser();
    }, [])

    return (
        <Fragment>
            <div className='container'>
                <span style={{ fontSize: 20 }}>Các sản phẩm đã xem</span>
                <br></br>
                <div className='col' style={{ backgroundColor: 'white', width: '100%' }}>
                    <div className="row">
                        {

                            dataProduct.map((item, i) => {
                                if (item.giaTriGiamGia === 0) {
                                    return <Tooltip title={item.ten} placement={'right'} color={'orange'} key={i}>
                                        <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                            <Link to={'detail/' + item._id + '/' + to_slug(item.ten)} className="a_item" onClick={(e) => {
                                                e.preventDefault();
                                                window.location.pathname = 'detail/' + item._id + '/' + to_slug(item.ten);
                                            }}>
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
                                    </Tooltip>

                                } else {
                                    return <Tooltip title={item.ten} placement={'right'} color={'orange'} key={i}>
                                        <div className="col-sm-3 item" key={i} style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                            <Link to={'detail/' + item._id + '/' + to_slug(item.ten)} className="a_item" onClick={(e) => {
                                                e.preventDefault();
                                                window.location.pathname = 'detail/' + item._id + '/' + to_slug(item.ten);
                                            }}>
                                                <div className="row">
                                                    <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                </div>
                                                <div className="row item-ten">
                                                    <span><strong>{setLongString(item.ten)}</strong></span>
                                                </div>
                                                <div className="row item-gia">
                                                    <h5><strong>{format_curency(item.giaCuoiCung.toString())} VNĐ</strong></h5>&nbsp;<span className="percent">{
                                                        item.giaTriGiamGia > 100 ? '-' + format_curency(item.giaTriGiamGia.toString()) + 'VNĐ' : '-' + item.giaTriGiamGia + '%'
                                                    }</span>
                                                </div>
                                                <div className="row item-giagoc">
                                                    <strike><span className="original">{format_curency(item.gia.toString())} VNĐ</span></strike>
                                                </div>
                                            </Link>
                                        </div>
                                    </Tooltip>
                                }
                            })

                        }

                        {/* {
                            dataProduct.length === 0 && (
                                <Fragment></Fragment>
                            )
                        } */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
