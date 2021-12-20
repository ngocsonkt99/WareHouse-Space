import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Pagination, Select, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { ModalCapNhatKho } from '../Modals/index';
import { useCookies } from 'react-cookie';

export default function BanHang_TongHopDonHang() {
    const { TabPane } = Tabs;
    const [cookies, setCookie, removeCookie] = useCookies();
    const [loiNhuanHomNay, setLoiNhuanHomNay] = useState(0);
    const [donHangChoXacNhan, setDonHangChoXacNhan] = useState(0);
    const [donHangDangVanChuyen, setDonHangDangVanChuyen] = useState(0);
    const [donHangDatNgayHomQua, setDonHangDatNgayHomQua] = useState(0);
    const [donHangDat7NgayGanNhat, setDonHangDat7NgayGanNhat] = useState(0);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    async function TinhLoiNhuanHomNay(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhloinhuanhomnay?idShop=' + shopID);
        if (res.data.status === 'success') {
            setLoiNhuanHomNay(res.data.data);
        } else {
            message.error('Tính lợi nhuận hôm nay thất bại')
        }
    }

    async function TinhDonHangChoXacNhan(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdonhang-choxacnhan?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDonHangChoXacNhan(res.data.data);
        } else {
            message.error('Tính đơn hàng chờ xác nhận thất bại hôm nay thất bại')
        }
    }

    async function TinhDonHangDangVanChuyen(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdonhang-dangvanchuyen?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDonHangDangVanChuyen(res.data.data);
        } else {
            message.error('Tính đơn hàng đang vận chuyển thất bại')
        }
    }

    async function TinhDonHangDatNgayHomQua(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdonhang-datngayhomqua?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDonHangDatNgayHomQua(res.data.data);
        } else {
            message.error('Tính đơn hàng đặt ngày hôm qua thất bại')
        }
    }

    async function TinhDonHangDat7NgayGanNhat(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdonhang-datbayngaygannhat?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDonHangDat7NgayGanNhat(res.data.data);
        } else {
            message.error('Tính đơn hàng đặt 7 ngày gần nhất thất bại')
        }
    }

    useEffect(() => {
        TinhLoiNhuanHomNay(cookies.shopID);
        TinhDonHangDangVanChuyen(cookies.shopID);
        TinhDonHangChoXacNhan(cookies.shopID);
        TinhDonHangDatNgayHomQua(cookies.shopID);
        TinhDonHangDat7NgayGanNhat(cookies.shopID);
    }, [])

    return (
        <Fragment>
            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab='Tổng hợp đơn hàng'>
                    <div className='container'>
                        <div className='col'>
                            <div className='row' style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: 20 }}><strong>LỢI NHUẬN HÔM NAY</strong></span>
                            </div>
                            <div className='row' style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ fontSize: 20, color: 'orange' }}><strong>{format_curency(loiNhuanHomNay.toString())} đ</strong></span>
                            </div>
                            <div className='row' style={{ height: 'auto', padding: 5, backgroundColor: 'orange', color: 'white', borderRadius: 5 }}>
                                <div className='col-sm-10'>
                                    Đơn hàng chờ xác nhận
                                </div>
                                <div className='col-sm-2'>
                                    {donHangChoXacNhan.toString()}
                                </div>
                            </div>
                            <br></br>
                            <div className='row' style={{ height: 'auto', padding: 5, backgroundColor: 'orange', color: 'white', borderRadius: 5 }}>
                                <div className='col-sm-10'>
                                    Đơn hàng đang vận chuyển
                                </div>
                                <div className='col-sm-2'>
                                    {donHangDangVanChuyen.toString()}
                                </div>
                            </div>
                            <br></br>
                            <div className='row' style={{ height: 'auto', padding: 5 }}>
                                <div className='col-sm-10'>
                                    Tổng số đơn hàng đặt ngày hôm qua
                                </div>
                                <div className='col-sm-2'>
                                    {donHangDatNgayHomQua.toString()}
                                </div>
                            </div>
                            <br></br>

                            <div className='row' style={{ height: 'auto', padding: 5 }}>
                                <div className='col-sm-10'>
                                    Tổng số đơn hàng đặt 7 ngày gần nhất
                                </div>
                                <div className='col-sm-2'>
                                    {donHangDat7NgayGanNhat.toString()}
                                </div>
                            </div>

                        </div>
                    </div>

                </TabPane>
            </Tabs>
        </Fragment>
    )
}
