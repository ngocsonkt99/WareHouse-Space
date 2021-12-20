import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Image, Button, Nav } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message, Input, Pagination, Tooltip, Breadcrumb } from 'antd';
import { StringParam, useQueryParams, NumberParam } from 'use-query-params';


export default function SanPham(props) {
    const dispatch = useDispatch();
    const categoryID = props.match.params.id;
    const slug = props.match.params.slug;
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataGiaOption, setDataGiaOption] = useState({
        giaDau: '',
        giaCuoi: ''
    })
    const [dataCategory, setDataCategory] = useState({
        _id: '',
        ten: ''
    });
    const [query, setQuery] = useQueryParams({
        rating: NumberParam,
        price: StringParam
    });
    const { rating: soSao, price: giaTim } = query;

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

    async function LayCategoryTheoID(categoryID) {
        let res = await axios.get('hethong/categorys-item?id=' + categoryID);
        if (res.data.status === 'success') {
            setDataCategory({
                _id: res.data.data._id,
                ten: res.data.data.ten
            })
        } else {
            message.error('Lấy data danh mục sản phẩm thất bại');
        }
    }

    async function LayTatCaSanPhamTheoIDCategoryTheoTrang(categoryID, page) {
        let res = await axios.get('hethong/products-category/' + page + '?idCategory=' + categoryID);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            setTongSoTrang(res.data.soTrang);
        } else {
            message.error('Lấy data sản phẩm thất bại');
        }
    }

    async function LayDataProductTheoQuery() {
        let res = await axios.get('hethong/products-category-nguoidung/' + 0 + '?id=' + categoryID + '&rating=' + soSao + '&price=' + giaTim);

        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            setTongSoTrang(res.data.soTrang);
        } else {
            message.error('Lấy data sản phẩm theo query thất bại');
        }
    }

    useEffect(() => {
        LayDataProductTheoQuery()
    }, [soSao, giaTim])

    useEffect(() => {
        LayCategoryTheoID(categoryID);
        LayTatCaSanPhamTheoIDCategoryTheoTrang(categoryID, 0);
        window.scrollTo(0, 0);
        dispatch({ type: 'SHOW_HEADER' });
    }, [])

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            {/* <div style={{ backgroundColor: "#F8F9FA", width: '100%' }}>
                <Nav className="flex-column nav-font-style" style={{ display: 'block' }}>
                    {dataCategory.map((item, i) => {
                        return <NavLink key={item._id} to={'category/' + item._id + '/' + to_slug(item.ten)} className="navMenu">
                            <i className={item.icon} style={{ marginRight: 10 }}></i>{item.ten}
                        </NavLink>
                    })}
                </Nav>
            </div> */}
            <div className="row">
                <div className="col-sm-3 sidebar">
                    <div className="danhmuc-sidebar">
                        <h5>DANH MỤC SẢN PHẨM</h5>
                        <div className="danhmucchinh-sidebar">
                            <p><strong><Link to='#'>{dataCategory.ten}</Link></strong></p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="danhgia-sidebar">
                        <h5>ĐÁNH GIÁ</h5>
                        <div className="danhgia-5sao-sidebar">
                            <Link to='/' onClick={(e) => {
                                e.preventDefault();
                                setQuery({
                                    ...query,
                                    rating: 5
                                }, 'push');
                            }}>
                                {[...Array(5)].map((item, i) => {
                                    return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                                })}
                                <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 5 sao)</span>
                            </Link>
                        </div>
                        <div className="danhgia-4sao-sidebar">
                            <Link to='/' style={{ color: 'black' }} onClick={(e) => {
                                e.preventDefault();
                                setQuery({
                                    ...query,
                                    rating: 4
                                }, 'push');
                            }}>
                                {[...Array(4)].map((item, i) => {
                                    return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                                })}
                                <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                                <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 4 sao)</span>
                            </Link>

                        </div>
                        <div className="danhgia-3sao-sidebar">
                            <Link to='/' style={{ color: 'black' }} onClick={(e) => {
                                e.preventDefault();
                                setQuery({
                                    ...query,
                                    rating: 3
                                }, 'push');
                            }}>
                                {[...Array(3)].map((item, i) => {
                                    return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                                })}
                                <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                                <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                                <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 3 sao)</span>
                            </Link>

                        </div>
                    </div>
                    <hr></hr>
                    <div className="thuonghieu-sidebar">
                        <h5>GIÁ</h5>
                        <div className='col'>
                            <div className='row'>
                                Chọn khoảng giá
                            </div>
                            <div className='row'>
                                <Input value={dataGiaOption.giaDau} style={{ width: 100 }} onChange={(e) => {
                                    // setDataGiaOption({
                                    //     ...dataGiaOption,
                                    //     giaDau: format_curency(e.target.value)
                                    // })

                                    setDataGiaOption({
                                        ...dataGiaOption,
                                        giaDau: e.target.value
                                    })
                                }}></Input>
                                &nbsp;_&nbsp;
                                <Input value={dataGiaOption.giaCuoi} style={{ width: 100 }} onChange={(e) => {
                                    // setDataGiaOption({
                                    //     ...dataGiaOption,
                                    //     giaCuoi: format_curency(e.target.value)
                                    // })

                                    setDataGiaOption({
                                        ...dataGiaOption,
                                        giaCuoi: e.target.value
                                    })
                                }}></Input>
                            </div>
                            <div className='row'>
                                <Button style={{ marginTop: 10, width: 100 }} onClick={() => {
                                    if (dataGiaOption.giaDau === '' && dataGiaOption.giaCuoi !== '' && parseInt(dataGiaOption.giaCuoi) > 0) {
                                        setQuery({
                                            ...query,
                                            price: '0%2C' + dataGiaOption.giaCuoi
                                        }, 'push');
                                    }

                                    if (dataGiaOption.giaCuoi === '' && dataGiaOption.giaDau !== '' && parseInt(dataGiaOption.giaDau) > 0) {
                                        setQuery({
                                            ...query,
                                            price: '0%2C' + dataGiaOption.giaDau
                                        }, 'push');
                                    }

                                    if (parseInt(dataGiaOption.giaDau) > 0 && parseInt(dataGiaOption.giaCuoi) > 0) {
                                        setQuery({
                                            ...query,
                                            price: dataGiaOption.giaDau + '%2C' + dataGiaOption.giaCuoi
                                        }, 'push');
                                    }
                                }}>OK</Button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="row maincontent">
                        <div className="row showitems-maincontent">
                            {
                                dataProduct.map((item, i) => {
                                    var result 
                                    if (item.giaTriGiamGia === 0) {
                                        return <Tooltip title={item.ten} placement={'right'} key={i}>
                                            <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, margin: 20, width: '95%' }}>
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
                                        </Tooltip>

                                    } else {
                                        return <Tooltip title={item.ten} placement={'right'} key={i}>
                                            <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, margin: 20, width: '95%' }}>
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

                                    }
                                })
                            }
                        </div>
                        <div className="pagination-maincontent">
                            {
                                dataProduct.length !== 0 && (
                                    <Pagination defaultPageSize={1} defaultCurrent={1} total={tongSoTrang} onChange={(page) => {
                                        LayTatCaSanPhamTheoIDCategoryTheoTrang(categoryID, page - 1);
                                    }}>
                                    </Pagination>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
