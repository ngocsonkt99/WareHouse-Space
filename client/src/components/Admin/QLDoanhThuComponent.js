import React, { useState, useEffect, Fragment } from 'react';
import { Radio, message } from 'antd';
import { Table } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

export default function QLDoanhThuComponent() {
    const [countDonHangShow, setCountDonHangShow] = useState(8);
    const [optionValueTime, setOptionValueTime] = useState(0);
    const [donHangShowEnd, setDonHangShowEnd] = useState(false);
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

    const [dataChiTietDonHang, setDataChiTietDonHang] = useState([]);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var now = new Date();
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    async function LayDataDoanhThuTuanNay() {
        let res = await axios.get('hethong/order-details-admin-tinhdataloinhuantuannay');

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'VNĐ',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
            setDataChiTietDonHang(res.data.data);
        } else {
            message.error('Lấy data doanh thu tuần này thất bại');
        }

    }

    async function LayDataDoanhThuThangNay() {
        let res = await axios.get('hethong/order-details-admin-tinhdataloinhuanthangnay');

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'VNĐ',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
            setDataChiTietDonHang(res.data.data);
        } else {
            message.error('Lấy data doanh thu tháng này thất bại');
        }

    }

    async function LayDataDoanhThu3ThangGanNhat() {
        let res = await axios.get('hethong/order-details-admin-tinhdataloinhuan3thanggannhat');

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'VNĐ',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
            setDataChiTietDonHang(res.data.data);
        } else {
            message.error('Lấy data doanh thu 3 tháng gần nhất thất bại');
        }

    }

    async function LayDataDoanhThu6ThangGanNhat() {
        let res = await axios.get('hethong/order-details-admin-tinhdataloinhuan6thanggannhat');

        if (res.data.status === 'success') {
            var chartDataa = {
                labels: res.data.dataDate,
                datasets: [
                    {
                        label: 'VNĐ',
                        data: res.data.dataDoanhThu,
                        backgroundColor: 'rgba(75,192,192,0.6)',
                        borderWidth: 4
                    }
                ]
            }
            setChartData(chartDataa);
            setDataChiTietDonHang(res.data.data);
        } else {
            message.error('Lấy data doanh thu 6 tháng gần nhất thất bại');
        }

    }


    useEffect(() => {
        LayDataDoanhThuTuanNay();
    }, [])


    useEffect(() => {
        if (optionValueTime === 0) {
            LayDataDoanhThuTuanNay();
        }

        if (optionValueTime === 1) {
            LayDataDoanhThuThangNay();
        }

        if (optionValueTime === 2) {
            LayDataDoanhThu3ThangGanNhat();
        }

        if (optionValueTime === 3) {
            LayDataDoanhThu6ThangGanNhat();
        }
    }, [optionValueTime])

    useEffect(() => {
        if (countDonHangShow >= dataChiTietDonHang.length && dataChiTietDonHang.length !== 0) {
            setDonHangShowEnd(true);
        }
    }, [countDonHangShow])

    return (
        <Fragment>
            <div  >
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
                    {/* <br></br><br></br>
                    <div style={{ height: 600, width: 1100, marginLeft: 100 }}>
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
                    <div style={{ height: 600, width: 1100, marginLeft: 100 }}>
                        <Pie data={chartData} options={{
                            responsive: true,
                            title: {
                                text: 'BIỂU ĐỒ TRÒN', display: true
                            }
                        }}></Pie>
                    </div> */}

                    <div className="col" style={{ width: '100%', marginTop: 40 }}>
                        <h4>CHI TIẾT DOANH THU</h4>
                        <Table bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID đơn hàng</th>
                                    <th>ID gian hàng</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Doanh thu</th>
                                    <th>Ngày tạo</th>
                                    <th>Ngày hoàn thành</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataChiTietDonHang.map((item, i) => {
                                        if (i < countDonHangShow) {
                                            return <tr key={i}>
                                                <td>{item.idShow}</td>
                                                <td>{item.idShop}</td>
                                                <td style={{ width: 400 }}>{item.ten}</td>
                                                <td>{format_curency((item.thanhTien * 10 / 10).toString())}</td>
                                                <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                                <td>{hamChuyenDoiNgay(new Date(item.ngayHoanThanh))}</td>
                                            </tr>
                                        }
                                    })

                                }
                            </tbody>
                        </Table>
                        {
                            donHangShowEnd === false && (
                                <center>
                                    <Link to='/' onClick={(e) => {
                                        e.preventDefault();
                                        setCountDonHangShow(prev => prev + 8);
                                    }}>Xem thêm</Link>
                                </center>
                            )
                        }
                    </div>

                </div>
            </div>
        </Fragment >
    )
}
