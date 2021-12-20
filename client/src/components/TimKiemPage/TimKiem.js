import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Image, Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SmileOutlined } from '@ant-design/icons';
import { Result, message, Input, Pagination, Tooltip } from 'antd';
import { StringParam, useQueryParams, NumberParam } from 'use-query-params';

export default function TimKiem() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [dataProduct, setDataProduct] = useState([]);
    const [curentPage, setCurentPage] = useState(1);
    const [dataCountCategory, setDataCountCategory] = useState([]);
    const [countAllProduct, setCountAllProduct] = useState(0);
    const [dataGiaOption, setDataGiaOption] = useState({
        giaDau: '',
        giaCuoi: ''
    })
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataCategory, setDataCategory] = useState([]);

    const [query, setQuery] = useQueryParams({
        data: StringParam,
        order: StringParam,
        rating: NumberParam,
        price: StringParam
    });

    const { data: dataSearch, order: optionOrder, rating: soSao, price: giaTim } = query;



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

    async function LayDataProductTheoSearch(page) {
        let res = await axios.get('hethong/products-search-nguoidung/' + page + '?search=' + dataSearch + '&order=' + optionOrder + '&rating=' + soSao + '&price=' + giaTim);

        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            setCountAllProduct(res.data.dataAll.length);
            setTongSoTrang(res.data.soTrang);
        } else {
            message.error('Lấy data sản phẩm theo tìm kiếm thất bại');
        }
    }

    async function LayDataCategoryTheoSearch() {
        let res = await axios.get('hethong/categorys-search-nguoidung/?search=' + dataSearch);

        if (res.data.status === 'success') {
            setDataCategory(res.data.data);
            setDataCountCategory(res.data.dataCount);
        } else {
            message.error('Lấy data category theo tìm kiếm thất bại');
        }
    }

    useEffect(() => {
        LayDataProductTheoSearch(0);
        LayDataCategoryTheoSearch();
    }, [dataSearch, optionOrder, soSao, giaTim])

    useEffect(() => {
        dispatch({ type: 'SHOW_HEADER' });
        window.scrollTo(0, 0);
    }, [])



    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row">
                <div className="col-sm-3 sidebar">
                    <div className="danhmuc-sidebar">
                        <h5>DANH MỤC SẢN PHẨM</h5>
                        <div className="danhmucchinh-sidebar">
                            {
                                dataCategory.map((item, i) => {
                                    var result = item.icon === '' ?
                                        (
                                            <p key={i}><strong><Link onClick={(e) => {
                                                e.preventDefault();
                                                history.push(`/category/${item._id}/${to_slug(item.ten)}`)
                                            }}>{item.ten} ({dataCountCategory[i]})</Link></strong></p>
                                        ) : ''
                                    return result;
                                })
                            }
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
                            <Link style={{ color: 'black' }} onClick={(e) => {
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
                            <Link style={{ color: 'black' }} onClick={(e) => {
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
                            <span>Chọn khoảng giá</span><br></br>
                            <div className='row'>
                                <Input value={dataGiaOption.giaDau} style={{ width: 100, marginLeft: 15 }} onChange={(e) => {
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
                    {/* <hr style={{ width: 240 }}></hr>
                    <div className="thuonghieu-sidebar">
                        <h5>THƯƠNG HIỆU</h5>
                        <div className="thuonghieu-items-sidebar">
                            <p>Nike</p>
                            <p>Adidas</p>
                            <p>Reebok</p>
                            <p>Gucci</p>
                        </div>
                    </div>
                    <hr style={{ width: 240 }}></hr>
                    <div className="nhacungcap-sidebar">
                        <h5>NHÀ CUNG CẤP</h5>
                        <div className="nhacungcap-items-sidebar">
                            <p>G-LAB</p>
                            <p>GRIMM DC</p>
                            <p>CEASAR</p>
                            <p>DEGREY</p>
                            <p>HIGHCLUB</p>
                        </div>
                    </div> */}
                </div>
                <div className="col-sm-9">
                    <div className="row maincontent">
                        <div className="row showitems-maincontent">
                            <div className='col' style={{ padding: 30 }}>
                                <p style={{ fontSize: 24, lineHeight: 1 }}>Kết quả tìm kiếm cho '{dataSearch}': <span style={{ color: 'silver' }}>{countAllProduct} kết quả</span></p>
                                <div className='row' style={{ marginLeft: 5 }}>
                                    <Button variant={optionOrder === 'newest' ? 'warning' : 'primary'} onClick={() => {
                                        setQuery({
                                            ...query,
                                            order: 'newest'
                                        }, 'push');
                                    }}>
                                        Hàng mới
                                    </Button>

                                    <Button style={{ marginLeft: 20 }} variant={optionOrder === 'top_seller' ? 'warning' : 'primary'} onClick={() => {
                                        setQuery({
                                            ...query,
                                            order: 'top_seller'
                                        }, 'push');
                                    }}>
                                        Bán chạy
                                     </Button>

                                    <Button style={{ marginLeft: 20 }} variant={optionOrder === 'discount' ? 'warning' : 'primary'} onClick={() => {
                                        setQuery({
                                            ...query,
                                            order: 'discount'
                                        }, 'push');
                                    }}>
                                        Giảm giá
                                    </Button>

                                    <Button style={{ marginLeft: 20 }} variant={optionOrder === 'price_asc' ? 'warning' : 'primary'} onClick={() => {
                                        setQuery({
                                            ...query,
                                            order: 'price_asc'
                                        }, 'push');
                                    }}>
                                        Giá thấp
                                    </Button>

                                    <Button style={{ marginLeft: 20 }} variant={optionOrder === 'price_desc' ? 'warning' : 'primary'} onClick={() => {
                                        setQuery({
                                            ...query,
                                            order: 'price_desc'
                                        }, 'push');
                                    }}>
                                        Giá cao
                                    </Button>
                                </div>
                                <hr></hr>
                                <div className='row' style={{ padding: 10 }}>
                                    {
                                        dataProduct.length === 0 && (
                                            <Result
                                                style={{ alignItems: 'center', justifyContent: 'center', display: 'block' }}
                                                icon={<SmileOutlined />}
                                                title="Không có kết quả theo tìm kiếm này"
                                            />
                                        )
                                    }

                                    {
                                        dataProduct.length > 0 && (
                                            dataProduct.map((item, i) => {
                                                if (item.giaTriGiamGia === 0) {
                                                    return <Tooltip title={item.ten} placement={'right'} key={i}>
                                                        <div key={item._id} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
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
                                                        <div key={item._id} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
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
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="pagination-maincontent">

                            <Pagination defaultPageSize={1} current={curentPage} total={tongSoTrang} onChange={(page) => {
                                LayDataProductTheoSearch(page - 1);
                                setCurentPage(page);
                            }}>
                            </Pagination>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
