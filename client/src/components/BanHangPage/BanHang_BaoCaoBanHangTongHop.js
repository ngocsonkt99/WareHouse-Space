import React, { useState, useEffect, Fragment } from 'react';
import { Tabs, Radio, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Image, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { Line, Bar, Pie } from 'react-chartjs-2';

export default function BanHang_BaoCaoBanHangTongHop() {
    const { TabPane } = Tabs;
    const [optionValueType, setOptionValueType] = useState(0);
    const [optionValueTime, setOptionValueTime] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Doanh thu',
                data: [],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderWidth: 4
            }
        ]
    });
    const [cookies, setCookie, removeCookie] = useCookies();

    async function LayDataDoanhThuTuanNay(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdataloinhuantuannay?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Doanh Thu Thuần',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Chiết Khấu',
                        data: res.data.dataChietKhau,
                        backgroundColor: 'rgba(255,99,132,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Doanh Thu Sau Chiết Khấu',
                        data: res.data.dataDoanhThuSauChietKhau,
                        backgroundColor: 'rgba(153,102,255,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data doanh thu tuần này thất bại');
        }

    }

    async function LayDataDoanhThuThangNay(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdataloinhuanthangnay?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Doanh Thu Thuần',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Chiết Khấu',
                        data: res.data.dataChietKhau,
                        backgroundColor: 'rgba(255,99,132,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Doanh Thu Sau Chiết Khấu',
                        data: res.data.dataDoanhThuSauChietKhau,
                        backgroundColor: 'rgba(153,102,255,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data doanh thu tháng này thất bại');
        }

    }

    async function LayDataDoanhThu3ThangGanNhat(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdataloinhuan3thanggannhat?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Doanh Thu Thuần',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Chiết Khấu',
                        data: res.data.dataChietKhau,
                        backgroundColor: 'rgba(255,99,132,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Doanh Thu Sau Chiết Khấu',
                        data: res.data.dataDoanhThuSauChietKhau,
                        backgroundColor: 'rgba(153,102,255,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data doanh thu 3 tháng gần nhất thất bại');
        }

    }

    async function LayDataDoanhThu6ThangGanNhat(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdataloinhuan6thanggannhat?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Doanh Thu Thuần',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Chiết Khấu',
                        data: res.data.dataChietKhau,
                        backgroundColor: 'rgba(255,99,132,0.6)',
                        borderWidth: 4
                    },
                    {
                        label: 'Doanh Thu Sau Chiết Khấu',
                        data: res.data.dataDoanhThuSauChietKhau,
                        backgroundColor: 'rgba(153,102,255,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data doanh thu 6 tháng gần nhất thất bại');
        }

    }

    async function LayDataSanLuongTuanNay(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasanluongtuannay?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Sản phẩm',
                        data: res.data.dataSanLuong,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data sản lượng tuần này thất bại');
        }

    }

    async function LayDataSanLuongThangNay(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasanluongthangnay?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Sản phẩm',
                        data: res.data.dataSanLuong,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data sản lượng tháng này thất bại');
        }

    }

    async function LayDataSanLuong3ThangGanNhat(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasanluong3thanggannhat?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Sản phẩm',
                        data: res.data.dataSanLuong,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data sản lượng 3 tháng gần nhất thất bại');
        }

    }

    async function LayDataSanLuong6ThangGanNhat(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasanluong6thanggannhat?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Sản phẩm',
                        data: res.data.dataSanLuong,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data sản lượng 6 tháng gần nhất thất bại');
        }

    }

    async function LayDataSoDonHangTuanNay(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasodonhangtuannay?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Đơn hàng',
                        data: res.data.dataSoDonHang,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data số đơn hàng tuần này thất bại');
        }

    }

    async function LayDataSoDonHangThangNay(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasodonhangthangnay?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Đơn hàng',
                        data: res.data.dataSoDonHang,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data số đơn hàng tháng này thất bại');
        }

    }

    async function LayDataSoDonHang3ThangGanNhat(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasodonhang3thanggannhat?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Đơn hàng',
                        data: res.data.dataSoDonHang,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data số đơn hàng 3 tháng gần nhất thất bại');
        }

    }

    async function LayDataSoDonHang6ThangGanNhat(shopID) {
        let res = await axios.get('hethong/order-details-shop-tinhdatasodonhang6thanggannhat?idShop=' + shopID);

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'Đơn hàng',
                        data: res.data.dataSoDonHang,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
        } else {
            message.error('Lấy data số đơn hàng 6 tháng gần nhất thất bại');
        }

    }



    useEffect(() => {
        LayDataDoanhThuTuanNay(cookies.shopID);
    }, [])

    useEffect(() => {
        if (optionValueTime === 0 && optionValueType === 0) {
            LayDataDoanhThuTuanNay(cookies.shopID);
        }

        if (optionValueTime === 0 && optionValueType === 1) {
            LayDataSanLuongTuanNay(cookies.shopID);
        }

        if (optionValueTime === 0 && optionValueType === 2) {
            LayDataSoDonHangTuanNay(cookies.shopID);
        }

        if (optionValueTime === 1 && optionValueType === 0) {
            LayDataDoanhThuThangNay(cookies.shopID);
        }

        if (optionValueTime === 1 && optionValueType === 1) {
            LayDataSanLuongThangNay(cookies.shopID);
        }

        if (optionValueTime === 1 && optionValueType === 2) {
            LayDataSoDonHangThangNay(cookies.shopID);
        }

        if (optionValueTime === 2 && optionValueType === 0) {
            LayDataDoanhThu3ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 2 && optionValueType === 1) {
            LayDataSanLuong3ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 2 && optionValueType === 2) {
            LayDataSoDonHang3ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 3 && optionValueType === 0) {
            LayDataDoanhThu6ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 3 && optionValueType === 1) {
            LayDataSanLuong6ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 3 && optionValueType === 2) {
            LayDataSoDonHang6ThangGanNhat(cookies.shopID);
        }
    }, [optionValueType])

    useEffect(() => {
        if (optionValueTime === 0 && optionValueType === 0) {
            LayDataDoanhThuTuanNay(cookies.shopID);
        }

        if (optionValueTime === 0 && optionValueType === 1) {
            LayDataSanLuongTuanNay(cookies.shopID);
        }

        if (optionValueTime === 0 && optionValueType === 2) {
            LayDataSoDonHangTuanNay(cookies.shopID);
        }

        if (optionValueTime === 1 && optionValueType === 0) {
            LayDataDoanhThuThangNay(cookies.shopID);
        }

        if (optionValueTime === 1 && optionValueType === 1) {
            LayDataSanLuongThangNay(cookies.shopID);
        }

        if (optionValueTime === 1 && optionValueType === 2) {
            LayDataSoDonHangThangNay(cookies.shopID);
        }

        if (optionValueTime === 2 && optionValueType === 0) {
            LayDataDoanhThu3ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 2 && optionValueType === 1) {
            LayDataSanLuong3ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 2 && optionValueType === 2) {
            LayDataSoDonHang3ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 3 && optionValueType === 0) {
            LayDataDoanhThu6ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 3 && optionValueType === 1) {
            LayDataSanLuong6ThangGanNhat(cookies.shopID);
        }

        if (optionValueTime === 3 && optionValueType === 2) {
            LayDataSoDonHang6ThangGanNhat(cookies.shopID);
        }
    }, [optionValueTime])

    return (
        <Fragment>
            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="Báo cáo bán hàng tổng hợp">
                    <div className='col'>
                        <span>(*Kết quả báo cáo đều được dựa vào các đơn hàng đã hoàn thành)</span>
                        <br></br>
                        <Radio.Group value={optionValueTime} onChange={(e) => {
                            setOptionValueTime(e.target.value);
                        }}>
                            <Radio.Button value={0}>Tuần này</Radio.Button>
                            <Radio.Button value={1}>Tháng này</Radio.Button>
                            <Radio.Button value={2}>3 tháng gần nhất</Radio.Button>
                            <Radio.Button value={3}>6 tháng gần nhất</Radio.Button>
                        </Radio.Group>
                        <br></br>
                        <br></br>
                        <Radio.Group value={optionValueType} onChange={(e) => {
                            setOptionValueType(e.target.value);
                        }}>
                            <Radio.Button value={0}>Theo Lợi nhuận</Radio.Button>
                            <Radio.Button value={1}>Theo Sản lượng</Radio.Button>
                            <Radio.Button value={2}>Theo Số đơn hàng</Radio.Button>
                        </Radio.Group>

                        
                        <br></br><br></br>
                        <br></br><br></br>
                        <div style={{ height: 600, width: 1200, marginLeft: 100 }}>
                            <Bar data={chartData} options={{
                                responsive: true,
                                title: {
                                    text: 'BIỂU ĐỒ CỘT', display: true
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                autoSkip: true,
                                                maxTicksLimit: 10,
                                                beginAtZero: true
                                            },
                                            gridLines: {
                                                display: false,

                                            }
                                        }
                                    ],
                                    xAxes: [
                                        {
                                            gridLines: {
                                                display: false
                                            }
                                        }
                                    ]
                                }
                            }}></Bar>
                        </div>
                        <br></br><br></br>
                        <br></br><br></br>
                        <div style={{ height: 600, width: 1200, marginLeft: 100 }}>
                            <Line data={chartData} options={{
                                responsive: true,
                                title: {
                                    text: 'BIỂU ĐỒ MIỀN', display: true
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                autoSkip: true,
                                                maxTicksLimit: 10,
                                                beginAtZero: true
                                            },
                                            gridLines: {
                                                display: false,

                                            }
                                        }
                                    ],
                                    xAxes: [
                                        {
                                            gridLines: {
                                                display: false
                                            }
                                        }
                                    ]
                                }
                            }}></Line>
                        </div>
                        <br></br><br></br>
                        <br></br><br></br>
                        <div style={{ height: 600, width: 1200, marginLeft: 100 }}>
                            <Pie data={chartData} options={{
                                responsive: true,
                                title: {
                                    text: 'BIỂU ĐỒ TRÒN', display: true
                                }
                            }}></Pie>
                        </div>

                    </div>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}
