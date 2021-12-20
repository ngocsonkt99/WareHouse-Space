import React, { useEffect, Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Pagination, message, Tooltip } from 'antd';

export default function Deal() {
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);

    function setLongString(str) {
        var stringNew = str;
        if (str.length > 54) {
            stringNew = str.substring(0, 54) + '...'
        }
        return stringNew;
    }

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


    async function LayTatCaSanPhamDangGiamGia(page) {
        let res = await axios.get('hethong/products-sale-show/' + page);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            setTongSoTrang(res.data.soTrang);
        } else {
            message.error('Lấy data sản phẩm thất bại');
        }
    }

    useEffect(() => {
        dispatch({ type: 'SHOW_HEADER' });
        LayTatCaSanPhamDangGiamGia(0);
        window.scrollTo(0, 0);
    }, [])

    return (
        <Fragment>
            <img alt='banner' style={{ marginTop: '50px' }} src='https://previews.123rf.com/images/houbacze/houbacze1803/houbacze180300322/98083578-hot-deal-banner-template.jpg' height='300' width='100%'></img>
            <div className="container" style={{ marginTop: '50px' }}>
                <div className="row maincontent">
                    <div className="row showitems-maincontent">
                        {
                            dataProduct.map((item, i) => {
                                return <Tooltip title={item.ten} placement={'right'} key={i}>
                                    <div key={item._id} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, margin: 20, width: '95%' }}>
                                        <Link to={'/detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                            <div className="row">
                                                <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                            </div>
                                            <div className="row item-ten">
                                                <span>{setLongString(item.ten)}</span>
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
                                </Tooltip>

                            })
                        }
                    </div>
                    <div className="pagination-maincontent">
                        {
                            dataProduct.length !== 0 && (
                                <Pagination defaultPageSize={1} defaultCurrent={1} total={tongSoTrang} onChange={(page) => {
                                    LayTatCaSanPhamDangGiamGia(page - 1);
                                }}>
                                </Pagination>
                            )
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
