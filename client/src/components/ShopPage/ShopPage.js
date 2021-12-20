import React, { useState, useEffect } from 'react'
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { Pagination, message } from 'antd';

export default function ShopPage(props) {
    const shopID = props.match.params.id;
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataShop, setDataShop] = useState({
        idShop: '',
        tenShop: '',
        logoShop: '',
        ngayTao: new Date(),
        img: {
            carousel: [],
            banner1: '',
            banner2: ''
        }
    });

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

    function tinh_tien(giaGoc, giaTriGiamGia) {
        var tien = 0;
        if (giaTriGiamGia > 100) {
            tien = giaGoc - giaTriGiamGia;
        } else {
            tien = giaGoc - (giaGoc * giaTriGiamGia / 100);
        }

        return tien.toString();
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

    async function LayShopTheoID(shopID) {
        let res = await axios.get('hethong/users/shop-item?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDataShop({
                idShop: res.data.data.thongTinShop.idShop,
                tenShop: res.data.data.thongTinShop.ten,
                logoShop: res.data.data.thongTinShop.logoShop,
                ngayTao: res.data.data.thongTinShop.ngayTao,
                img: {
                    carousel: res.data.data.thongTinShop.img.carousel,
                    banner1: res.data.data.thongTinShop.img.banner1,
                    banner2: res.data.data.thongTinShop.img.banner2
                }
            });
        }
    }

    async function LayTatCaSanPhamTheoIDShop(shopID, page) {
        let res = await axios.get('hethong/products-shop-show/' + page + '?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            setTongSoTrang(res.data.soTrang);
        } else {
            message.error('Lấy data sản phẩm thất bại');
        }
    }


    useEffect(() => {
        LayShopTheoID(shopID);
        LayTatCaSanPhamTheoIDShop(shopID,0);
        dispatch({type:'SHOW_HEADER'});
    }, [])

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className='row'>
                <div className='col-sm-3' style={{ padding: 10, margin: 0 }}>
                    <img alt='logo shop' src={dataShop.logoShop} width='200' height='200'></img><br></br><br></br>
                    <span>Cửa hàng: <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.tenShop)}><strong>{dataShop.tenShop}</strong></Link></span><br></br>
                </div>
                <div className='col-sm-9'>
                    <div className='col'>
                        {
                            dataShop.img.carousel.length > 0 && (
                                <Carousel style={{ height: 250, width: '100%' }}>
                                    {
                                        dataShop.img.carousel.map((src, i) => {
                                            return <Carousel.Item key={i}>
                                                <img alt='ảnh carousel' className="d-block w-100" src={src} height='250' />
                                            </Carousel.Item>
                                        })
                                    }
                                </Carousel>
                            )
                        }
                        {
                            dataShop.img.banner1 !== '' && dataShop.img.banner2 !== '' && (
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <img alt='ảnh banner1' className="d-block w-100" src={dataShop.img.banner1} height='180' />
                                    </div>
                                    <div className='col-sm-6'>
                                        <img alt='ảnh banner2' className="d-block w-100" src={dataShop.img.banner2} height='180' />
                                    </div>
                                </div>
                            )
                        }
                        <br></br>
                        <br></br>  
                        <div className="row maincontent">
                            <br></br>
                            <h3>DANH SÁCH SẢN PHẨM</h3>
                            <div className="row showitems-maincontent">
                                {
                                    dataProduct.map((item, i) => {
                                        if (item.giaTriGiamGia === 0) {
                                            return <div key={item._id} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                                <Link to={'/detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                                    <div className="row">
                                                        <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                    </div>
                                                    <div className="row item-ten">
                                                        <span>{setLongString(item.ten)}</span>
                                                    </div>
                                                    <div className="row item-gia">
                                                        <h5><strong>{format_curency(item.gia.toString())} VNĐ</strong></h5>
                                                    </div>
                                                </Link>
                                            </div>
                                        } else {
                                            return <div key={item._id} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
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
                                        }
                                    })
                                }
                            </div>
                            <div className="pagination-maincontent">
                                {
                                    dataProduct.length !== 0 && (
                                        <Pagination defaultPageSize={1} defaultCurrent={1} total={tongSoTrang} onChange={(page) => {
                                            LayTatCaSanPhamTheoIDShop(shopID, page - 1);
                                        }}>
                                        </Pagination>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
