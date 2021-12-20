import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Radio, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Image, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';

export default function BanHang_Top10SanPhamBanChay() {
    const { TabPane } = Tabs;
    const [optionValueType, setOptionValueType] = useState(0);
    const [cookies, setCookie] = useCookies();
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const dispatch = useDispatch();
    const [dataProduct, setDataProduct] = useState([]);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    async function Top10SanPhamBanChayNhatTheoDoanhThu(shopID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let res = await axios.get('hethong/products-topmuoisanphambanchaynhat-theodoanhthu?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error('Lấy data 10 sản phẩm bán chạy nhất theo doanh thu thất bại')
        }
    }

    async function Top10SanPhamBanChayNhatTheoSanLuong(shopID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let res = await axios.get('hethong/products-topmuoisanphambanchaynhat-theosanluong?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error('Lấy data 10 sản phẩm bán chạy nhất theo sản lượng thất bại')
        }
    }

    async function Top10SanPhamBanChayNhatTheoSoLuongDonHang(shopID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let res = await axios.get('hethong/products-topmuoisanphambanchaynhat-theosoluongdonhang?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error('Lấy data 10 sản phẩm bán chạy nhất theo số lượng đơn hàng thất bại')
        }
    }

    useEffect(() => {
        Top10SanPhamBanChayNhatTheoDoanhThu(cookies.shopID);
    }, []);

    useEffect(() => {
        if (optionValueType === 0) {
            Top10SanPhamBanChayNhatTheoDoanhThu(cookies.shopID);
        }

        if (optionValueType === 1) {
            Top10SanPhamBanChayNhatTheoSanLuong(cookies.shopID);
        }

        if (optionValueType === 2) {
            Top10SanPhamBanChayNhatTheoSoLuongDonHang(cookies.shopID);
        }

    }, [optionValueType]);

    return (
        <Fragment>
            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="Top 10 sản phẩm bán chạy">
                    <div className='col'>
                        <Radio.Group value={optionValueType} onChange={(e) => {
                            setOptionValueType(e.target.value);
                        }}>
                            <Radio.Button value={0}>Theo Lợi nhuận</Radio.Button>
                            <Radio.Button value={1}>Theo Sản lượng</Radio.Button>
                            <Radio.Button value={2}>Theo Số đơn hàng</Radio.Button>
                        </Radio.Group>

                        <div className="col" style={{ padding: 20 }}>
                            <div className="col" style={{ width: '100%', marginTop: 20 }}>
                                <Table bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên</th>
                                            <th>Hình ảnh</th>
                                            <th>Số đơn hàng</th>
                                            <th>Sản lượng</th>
                                            <th>Lợi nhuận</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            setSpinnerReducer === 0 && optionValueType === 0 && (
                                                dataProduct.map((item, i) => {
                                                    return <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td style={{ width: 400 }}>{item.tenSanPham}</td>
                                                        <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                                        <td style={{ width: 150 }}>{item.soDonHang}</td>
                                                        <td>{item.soLuongDaBan}</td>
                                                        <td style={{ fontWeight: 'bold' }}>{format_curency(item.tongTienBanDuoc.toString())} đ</td>
                                                    </tr>
                                                })
                                            )
                                        }

                                        {
                                            setSpinnerReducer === 0 && optionValueType === 1 && (
                                                dataProduct.map((item, i) => {
                                                    return <tr key={item._id}>
                                                        <td>{i + 1}</td>
                                                        <td style={{ width: 400 }}>{item.tenSanPham}</td>
                                                        <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                                        <td style={{ width: 150 }}>{item.soDonHang}</td>
                                                        <td style={{ fontWeight: 'bold' }}>{item.soLuongDaBan}</td>
                                                        <td>{format_curency(item.tongTienBanDuoc.toString())} đ</td>
                                                    </tr>
                                                })
                                            )
                                        }

                                        {
                                            setSpinnerReducer === 0 && optionValueType === 2 && (
                                                dataProduct.map((item, i) => {
                                                    return <tr key={item._id}>
                                                        <td>{i + 1}</td>
                                                        <td style={{ width: 400 }}>{item.tenSanPham}</td>
                                                        <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                                        <td style={{ width: 150, fontWeight: 'bold' }}>{item.soDonHang}</td>
                                                        <td>{item.soLuongDaBan}</td>
                                                        <td>{format_curency(item.tongTienBanDuoc.toString())} đ</td>
                                                    </tr>
                                                })
                                            )
                                        }
                                    </tbody>
                                </Table>
                                {
                                    setSpinnerReducer === 1 && (
                                        <Spinner animation="border" role="status" style={{ marginLeft: 700 }}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}
