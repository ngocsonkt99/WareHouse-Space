import React, { useState, useEffect } from 'react';
import { InforItemComponent, InforDetailItemComponent, DescriptionItemComponent, QuestAndAnswerComponent, ClientCommentComponent } from '../allJS'
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { message, Breadcrumb } from 'antd';
import { useCookies } from 'react-cookie';

export default function SanPhamDetail(props) {
    const productID = props.match.params.id;
    const [phanLoaiColor, setPhanLoaiColor] = useState([]);
    const [phanLoaiSize, setPhanLoaiSize] = useState([]);
    const [dataCategorys, setDataCategorys] = useState([]);
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies();
    const [thongTinShop, setThongTinShop] = useState({
        idShop: '',
        ten: ''
    });
    const [thongTinProduct, setThongTinProduct] = useState({
        _id: '',
        idShow: '',
        ten: '',
        img: {
            chinh: '',
            phu: [],
            moTaChiTiet: []
        },
        gia: 0,
        noiSanXuat: '',
        moTa: [],
        moTaNganGon: [],
        soSao: '',
        giaTriGiamGia: 0,
        giaCuoiCung: 0,
        soLuong: '',
        thongTinBaoHanh: {
            baoHanh: '',
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        idBrand: '',
        idShop: '',
        idCategory: '',
        idEvent: ''
    });

    const [thongTinBrand, setThongTinBrand] = useState({
        ten: '',
        xuatXu: ''
    });

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

    async function LayDataShopTheoID(shopID) {
        let res = await axios.get('hethong/users/shop-item?idShop=' + shopID);

        if (res.data.status === 'success') {
            setThongTinShop({
                idShop: res.data.data.thongTinShop.idShop,
                ten: res.data.data.thongTinShop.ten
            })
        } else {
            message.error('Lấy data gian hàng thất bại');
        }
    }

    async function LayDataProductTheoID(productID) {
        let res = await axios.get('hethong/products-item?id=' + productID);

        if (res.data.status === 'success') {
            setThongTinProduct({
                _id: res.data.data._id,
                idShow: res.data.data.idShow,
                ten: res.data.data.ten,
                img: {
                    chinh: res.data.data.img.chinh,
                    phu: res.data.data.img.phu,
                    moTaChiTiet: res.data.data.img.moTaChiTiet
                },
                gia: res.data.data.gia,
                noiSanXuat: res.data.data.noiSanXuat,
                moTa: res.data.data.moTa,
                moTaNganGon: res.data.data.moTaNganGon,
                soSao: res.data.data.soSao,
                giaTriGiamGia: res.data.data.giaTriGiamGia,
                giaCuoiCung: res.data.data.giaCuoiCung,
                soLuong: res.data.data.soLuong,
                thongTinBaoHanh: {
                    baoHanh: res.data.data.thongTinBaoHanh.baoHanh,
                    loaiBaoHanh: res.data.data.thongTinBaoHanh.loaiBaoHanh,
                    thoiGianBaoHanh: res.data.data.thongTinBaoHanh.thoiGianBaoHanh,
                    donViBaoHanh: res.data.data.thongTinBaoHanh.donViBaoHanh
                },
                idShop: res.data.data.idShop,
                idBrand: res.data.data.idBrand,
                idCategory: res.data.data.idCategory,
                idEvent: res.data.data.idEvent
            })
        } else {
            message.error('Lấy dữ liệu data sản phẩm thất bại');
        }
    }

    async function LayDataBrandTheoID(brandID) {
        let res = await axios.get('hethong/brands-item?id=' + brandID);

        if (res.data.status === 'success') {
            setThongTinBrand({
                ten: res.data.data.ten,
                xuatXu: res.data.data.xuatXu
            })
        } else {
            message.error('Lấy dữ liệu data thương hiệu thất bại');
        }
    }

    async function LayPhanLoaiColor(productID) {
        let res = await axios.get('hethong/product-classify/color?id_product=' + productID);

        if (res.data.status === 'success') {
            setPhanLoaiColor(res.data.data);
        } else {
            message.error('Lấy dữ liệu data phân loại color thất bại');
        }
    }

    async function LayPhanLoaiSize(productID) {
        let res = await axios.get('hethong/product-classify/size?id_product=' + productID);

        if (res.data.status === 'success') {
            setPhanLoaiSize(res.data.data);
        } else {
            message.error('Lấy dữ liệu data phân loại size thất bại');
        }
    }

    async function KiemTraTokenAdmin() {
        await axios.get('hethong/auth/token-admin', { headers: { 'token': cookies.token } }).then(function (res) {
            if (res.data.status === "fail") {
                dispatch({ type: 'NO_ADMIN' });
            } else {
                dispatch({ type: 'ADMIN' });
            }
        }).catch(function (err) {
            console.log(err);
        });
    }

    async function CapNhatNguoiXem() {
        let res = await axios.put('hethong/products-capnhatnguoixem', {
            id: productID,
            idUser: cookies.userID
        });
    }

    async function LayDataCategoryTheoIDSanPham(id) {
        let res = await axios.get('hethong/categorys-product?id=' + id);

        if (res.data.status === 'success') {
            setDataCategorys(res.data.data);
        } else {
            message.error('Lấy dữ liệu data danh mục sản phẩm thất bại');
        }
    }

    useEffect(() => {
        if (cookies.userID !== undefined) {
            CapNhatNguoiXem();
        }
        LayDataProductTheoID(productID);
        if (cookies.token !== undefined) {
            KiemTraTokenAdmin();
        }
        dispatch({ type: 'SHOW_HEADER' });
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        LayPhanLoaiColor(thongTinProduct.idShow);
        LayPhanLoaiSize(thongTinProduct.idShow);
    }, [thongTinProduct])

    useEffect(() => {
        if (thongTinProduct.idShop !== '') {
            LayDataShopTheoID(thongTinProduct.idShop);
        }
    }, [thongTinProduct.idShop])

    useEffect(() => {
        if (thongTinProduct._id !== '') {
            LayDataCategoryTheoIDSanPham(thongTinProduct._id);
        }
    }, [thongTinProduct._id])

    useEffect(() => {
        if (thongTinProduct.idBrand !== '') {
            LayDataBrandTheoID(thongTinProduct.idBrand);
        }
    }, [thongTinProduct.idBrand])

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="/">Trang Chủ</a>
                </Breadcrumb.Item>
                {
                    dataCategorys.map((item, i) => {
                        return <Breadcrumb.Item key={i}>
                            <a href='/' onClick={(e) => {
                                e.preventDefault();
                                window.location.pathname = 'category/' + item._id + '/' + to_slug(item.ten);
                            }}>{item.ten}</a>
                        </Breadcrumb.Item>
                    })
                }
                <Breadcrumb.Item>
                    <a href="/" onClick={(e) => {
                        e.preventDefault();
                        window.location.pathname = 'detail/' + thongTinProduct._id + '/' + to_slug(thongTinProduct.ten);
                    }}>{thongTinProduct.ten}</a>
                </Breadcrumb.Item>

            </Breadcrumb>
            <InforItemComponent phanLoaiColor={phanLoaiColor} phanLoaiSize={phanLoaiSize} thongTinProduct={thongTinProduct}></InforItemComponent>
            <InforDetailItemComponent thongTinProduct={thongTinProduct} thongTinBrand={thongTinBrand}></InforDetailItemComponent>
            <DescriptionItemComponent thongTinProduct={thongTinProduct}></DescriptionItemComponent>
            <QuestAndAnswerComponent thongTinProduct={thongTinProduct}></QuestAndAnswerComponent>
            <ClientCommentComponent thongTinShop={thongTinShop} thongTinProduct={thongTinProduct}></ClientCommentComponent>
        </div>
    )
}
