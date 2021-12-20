import React, { useState, useEffect, Fragment } from 'react';
import { Image, Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import ReactImageMagnify from 'react-image-magnify';
import { InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export default function InforItemComponent(props) {
    var dataProduct = props.thongTinProduct;
    var dataColor = props.phanLoaiColor;
    var dataSize = props.phanLoaiSize;
    const [cookies, setCookie] = useCookies();
    const [dataShop, setDataShop] = useState({
        idShop: '',
        tenShop: '',
        viShop: '',
        keyPaypal: '',
        logoShop: ''
    });
    const [dataGioHangTruocDo, setDataGioHangTruocDo] = useState([]);
    const dispatch = useDispatch();
    const [srcHinhLon, setSrcHinhLon] = useState('');
    const [hetHang, setHetHang] = useState(false);
    const [changeDivColor, setChangeDivColor] = useState(-1);
    const [changeDivSize, setChangeDivSize] = useState(-1);
    const [thongTinMuaSanPham, setThongTinMuaSanPham] = useState({
        ten: '',
        giaCuoiCung: '',
        giaGoc: '',
        khuyenMai: '',
        mauSac: '',
        size: '',
        soLuong: '',
        img: '',
        idShop: '',
        tenShop: '',
        viShop: '',
        keyPaypal: '',
        idUser: ''
    });
    const statusThayDoiGioHang = useSelector(state => state.statusThayDoiGioHang);
    const isAdmin = useSelector(state => state.isAdmin);

    async function LayShopTheoID(shopID) {
        let res = await axios.get('hethong/users/shop-item?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDataShop({
                idShop: res.data.data.thongTinShop.idShop,
                tenShop: res.data.data.thongTinShop.ten,
                viShop: res.data.data.thongTinShop.viShop,
                keyPaypal: res.data.data.thongTinShop.keyPaypal,
                logoShop: res.data.data.thongTinShop.logoShop
            });
        }
    }

    async function KiemTraKho(productID) {
        let res = await axios.get('hethong/products-kiemtrakho?id=' + productID);
        if (res.data.status === 'success') {
            setHetHang(false);
        } else {
            setHetHang(true);
        }
    }


    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a.toString();
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

    function HamGhep_Ten_MauSac_Size_SanPham(data, idUser) {
        var newString = data.ten + data.mauSac + data.size + idUser;
        return newString;
    }

    function ThemVaoGioHang(data) {
        var catchTrung = false;
        var indexTrung = -1;
        if (dataGioHangTruocDo.length === 0) {
            setDataGioHangTruocDo(
                [...dataGioHangTruocDo,
                    data]
            )
            dispatch({ type: 'THAY_DOI_GIO_HANG' });
        } else {
            for (let index = 0; index < dataGioHangTruocDo.length; index++) {
                if (HamGhep_Ten_MauSac_Size_SanPham(data, data.idUser) === HamGhep_Ten_MauSac_Size_SanPham(dataGioHangTruocDo[index], dataGioHangTruocDo[index].idUser)) {
                    catchTrung = true;
                    indexTrung = index;
                    break;
                }
            }

            if (catchTrung === true) {
                dataGioHangTruocDo[indexTrung].soLuong += data.soLuong;
                setDataGioHangTruocDo(
                    [...dataGioHangTruocDo]
                )
                dispatch({ type: 'THAY_DOI_GIO_HANG' });
            } else {
                setDataGioHangTruocDo(
                    [...dataGioHangTruocDo,
                        data]
                )
                dispatch({ type: 'THAY_DOI_GIO_HANG' });
            }
        }
    }

    useEffect(() => {
        setSrcHinhLon(dataProduct.img.chinh);
        setThongTinMuaSanPham({
            ten: dataProduct.ten,
            giaCuoiCung: dataProduct.giaCuoiCung,
            giaGoc: dataProduct.gia,
            khuyenMai: dataProduct.giaTriGiamGia,
            mauSac: '',
            size: '',
            soLuong: '',
            img: dataProduct.img.chinh,
            idShop: dataProduct.idShop,
            tenShop: '',
            viShop: '',
            keyPaypal: '',
            idUser: cookies.userID
        });
        LayShopTheoID(dataProduct.idShop);

    }, [dataProduct]);

    useEffect(() => {
        if (dataProduct.idShow !== '') {
            KiemTraKho(dataProduct.idShow);
        }
    }, [dataProduct.idShow])

    useEffect(() => {
        setThongTinMuaSanPham({
            ...thongTinMuaSanPham,
            tenShop: dataShop.tenShop,
            viShop: dataShop.viShop,
            keyPaypal: dataShop.keyPaypal,
        })
    }, [dataShop])

    useEffect(() => {
        if (statusThayDoiGioHang === false) {
            setDataGioHangTruocDo(JSON.parse(localStorage.getItem('dataGioHang')));
        } else {
            localStorage.setItem('dataGioHang', JSON.stringify(dataGioHangTruocDo));
            dispatch({ type: 'KHONG_THAY_DOI_GIO_HANG' });
        }
    }, [statusThayDoiGioHang]);


    return (
        <div className="row">
            <div className="col-sm-5">
                <ReactImageMagnify enlargedImagePosition={'over'} {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: srcHinhLon
                    },
                    largeImage: {
                        src: srcHinhLon,
                        width: 1200,
                        height: 1800
                    }
                }} />
                <div className="col">
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="border border-dark showimg_little">
                            <Image src={dataProduct.img.chinh} className="img_little"
                                onMouseOver={() => {
                                    setSrcHinhLon(dataProduct.img.chinh);
                                }}></Image>
                        </div>
                        {
                            dataProduct.img.phu.map((src, i) => {
                                return <div key={i} className="border border-dark showimg_little">
                                    <Image src={src} className="img_little"
                                        onMouseOver={() => {
                                            setSrcHinhLon(src);
                                        }}></Image>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
            <div className="col-sm-7 infor-item">
                <h3>{dataProduct.ten}</h3> 
                <hr></hr>
                <h5 style={{ color: 'red' }}><strong>{format_curency(dataProduct.giaCuoiCung.toString())} VNĐ</strong></h5>
                {
                    dataProduct.giaTriGiamGia > 0 && (
                        <Fragment>
                            <p>Khuyến mãi: {dataProduct.giaTriGiamGia > 100 ? format_curency(dataProduct.giaTriGiamGia.toString()) + 'VNĐ' : dataProduct.giaTriGiamGia + '%'}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<img
                    alt=""
                    src='/PC.png'
                    width="160"
                    height="50"
                    style={{ marginRight: 5 }}
                    className="d-inline-block"
                /></p>
                            <p>Giá gốc: {format_curency(dataProduct.gia.toString())} VNĐ</p>
                        </Fragment>
                        
                    )
                   
                }

                <hr></hr>
                <div className='row'>
                    <div className='col-sm-8' style={{ height: 'auto' }}>
                        {
                            dataProduct.moTaNganGon.map((item, i) => {
                                if (item.length > 0) {
                                    return <Fragment key={i}>
                                        -{item}<br></br>
                                    </Fragment>
                                }
                            })
                        }
                    </div>
                    <div className='col-sm-4' style={{ height: 'auto' }}>
                        <div style={{ width: 200, height: 'auto', backgroundColor: '#EEEEEE' }}>
                            <div className='col' style={{ padding: 5 }}>
                                <div className='row'>
                                    <div className='col-sm-3' style={{ margin: 0 }}>
                                        <img alt='ảnh logo' src={dataShop.logoShop} width='50' height='60' style={{ marginRight: 50 }}></img>
                                    </div>
                                    <div className='col-sm-9'>
                                        <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.tenShop)}>{dataShop.tenShop}</Link><br></br>
                                        <span style={{ fontSize: 10 }}>Chi nhánh tại WareHouse</span><br></br>
                                        <span style={{ fontSize: 10 }}>Cam kết chính hãng 100%</span><br></br>                              
                                        <span style={{ fontSize: 10 }}>Uy tín - Chất lượng!</span>
                                    </div>
                                </div>

                                <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.tenShop)}>
                                    <Button style={{ width: '100%', height: 30, marginTop: 10 }}>Xem shop</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                {
                    hetHang === true && (
                        <span style={{ fontSize: 24, fontWeight: 'bold', color: 'orange' }}>Đã bán hết</span>
                    )
                }

                {
                    hetHang === false && (
                        <Fragment>
                            {
                                dataColor.length > 0 && (
                                    <div className='col'>
                                        <p>Màu sắc:</p>
                                        {dataColor.map((item, i) => {
                                            return <label key={i}>
                                                <input type='radio' name='color' className='radio-color' value={i}></input>
                                                <div className='phanloai' style={{ width: 60, height: 30, backgroundColor: changeDivColor === i ? "orange" : "blue", borderRadius: 5, marginLeft: 10, textAlign: 'center', color: 'white' }} onClick={(e) => {
                                                    setChangeDivColor(i);
                                                    setThongTinMuaSanPham({
                                                        ...thongTinMuaSanPham,
                                                        mauSac: item.tenPhanLoai
                                                    })
                                                }}>{item.tenPhanLoai}</div>
                                            </label>
                                        })}
                                    </div>
                                )
                            }

                            {
                                dataSize.length > 0 && (
                                    <div className='col'>
                                        <p>Size:</p>
                                        {dataSize.map((item, i) => {
                                            return <label key={i}>
                                                <input type='radio' name='color' className='radio-color' value={i}></input>
                                                <div className='phanloai' style={{ width: 60, height: 30, backgroundColor: changeDivSize === i ? "orange" : "blue", borderRadius: 5, color: 'white' }} onClick={(e) => {
                                                    setChangeDivSize(i);
                                                    setThongTinMuaSanPham({
                                                        ...thongTinMuaSanPham,
                                                        size: item.tenPhanLoai
                                                    })
                                                }}>{item.tenPhanLoai}</div>
                                            </label>
                                        })}
                                    </div>
                                )
                            }
                            <br></br>
                            <div className='col'>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p>Số lượng:</p>
                                        <InputNumber min={0} style={{ marginLeft: 10 }} defaultValue={0} onChange={(value) => {
                                            setThongTinMuaSanPham({
                                                ...thongTinMuaSanPham,
                                                soLuong: value
                                            })
                                        }} />
                                    </div>
                                    <div className="col-sm-9">
                                        <Button style={{ width: 300, height: 54, marginTop: 5 }} onClick={() => {
                                            var resultMau = false;
                                            var resultSize = false;
                                            if (cookies.token === undefined) {
                                                dispatch({ type: 'SHOW_MODAL_DANGNHAP_DANGKY' });
                                            } else {
                                                if (isAdmin) {
                                                    message.error('Admin không được thực hiện chức năng này');
                                                } else {
                                                    if (thongTinMuaSanPham.soLuong === '') {
                                                        message.error('Vui lòng chọn số lượng')
                                                    } else {
                                                        if (dataColor.length > 0) {
                                                            resultMau = true;
                                                        }
                                                        if (dataSize.length > 0) {
                                                            resultSize = true;
                                                        }

                                                        //Sản phẩm không có cả 2 phân loại Màu Sắc và Size
                                                        if (resultMau === false && resultSize === false) {
                                                            ThemVaoGioHang(thongTinMuaSanPham);
                                                            message.success('Đã thêm vào giỏ hàng');
                                                        }

                                                        //Sản phẩm có phân loại Màu Sắc mà không có phân loại Size
                                                        if (resultMau === true && resultSize === false) {
                                                            if (thongTinMuaSanPham.mauSac === '') {
                                                                message.error('Vui lòng chọn màu sắc');
                                                            } else {
                                                                ThemVaoGioHang(thongTinMuaSanPham);
                                                                message.success('Đã thêm vào giỏ hàng');
                                                            }
                                                        }

                                                        //Sản phẩm có phân loại Size mà không có phân loại Màu Sắc
                                                        if (resultMau === false && resultSize === true) {
                                                            if (thongTinMuaSanPham.size === '') {
                                                                message.error('Vui lòng chọn size');
                                                            } else {
                                                                ThemVaoGioHang(thongTinMuaSanPham);
                                                                message.success('Đã thêm vào giỏ hàng');
                                                            }
                                                        }

                                                        //Sản phẩm có cả 2 phân loại Màu Sắc và Size
                                                        if (resultMau === true && resultSize === true) {
                                                            if (thongTinMuaSanPham.mauSac === '') {
                                                                message.error('Vui lòng chọn màu sắc');
                                                            } else {
                                                                if (thongTinMuaSanPham.size === '') {
                                                                    message.error('Vui lòng chọn màu sắc');
                                                                } else {
                                                                    ThemVaoGioHang(thongTinMuaSanPham);
                                                                    message.success('Đã thêm vào giỏ hàng');
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }}>
                                            <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <FaCartPlus size={30}></FaCartPlus>&nbsp;<strong>CHỌN MUA</strong>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                }
            </div>
        </div>
    )
}
