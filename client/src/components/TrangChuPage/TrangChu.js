import React, { useState, useEffect } from 'react';
import { MarkettingComponent, DealComponent, HotSearchComponent, ForCustomerComponent } from '../allJS';
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import { message } from 'antd';
import { Button } from 'react-bootstrap';

function TrangChu() {
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBaiViet, setDataBaiViet] = useState([]);
    const [dataProductSale, setDataProductSale] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies();

    async function getDataCategory() {
        let resData = await axios.get('hethong/categorys-show');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
        } else {
            message.error("Lấy dữ liệu data danh mục sản phẩm thất bại");
        }
    }

    async function getDataSearch() {
        let resData = await axios.get('hethong/datasearch');
        if (resData.data.status === 'success') {
            setDataSearch(resData.data.data);
        } else {
            message.error("Lấy dữ liệu data Search thất bại");
        }
    }

    async function getDataBaiViet() {
        let resData = await axios.get('hethong/baiviet-showtrangchu');
        if (resData.data.status === 'success') {
            setDataBaiViet(resData.data.data);
        } else {
            message.error("Lấy dữ liệu data bài viết thất bại");
        }
    }

    async function getDataProduct() {
        let resData = await axios.get('hethong/products');
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
        } else {
            message.error("Lấy dữ liệu data sản phẩm thất bại");
        }
    }

    async function getDataProductDangGiamGiaTheoTrang() {
        let resData = await axios.get('hethong/products-sale/' + 0);
        if (resData.data.status === 'success') {
            setDataProductSale(resData.data.data);
        } else {
            message.error("Lấy dữ liệu data sản phẩm giảm giá thất bại");
        }
    }

    useEffect(() => {
        getDataCategory();
        getDataBaiViet();
        getDataSearch();
        getDataProductDangGiamGiaTheoTrang();
        getDataProduct();
        removeCookie('shopID');
        if (localStorage.getItem('dataGioHang') === null) {
            localStorage.setItem('dataGioHang', '[]');
        }
        if (localStorage.getItem('idVoucher') === null) {
            localStorage.setItem('idVoucher', undefined);
        }
        dispatch({ type: 'SHOW_HEADER' });
    }, []);

    return (
        <div>
            <MarkettingComponent dataBaiViet={dataBaiViet} dataCategory={dataCategory}></MarkettingComponent>
            <div className="container">
                {/* <HotSearchComponent dataSearch={dataSearch}></HotSearchComponent> */}
                <DealComponent dataProductSale={dataProductSale}></DealComponent>
                <ForCustomerComponent dataProduct={dataProduct}></ForCustomerComponent>
            </div>
        </div>
        
    );
}

export default TrangChu;