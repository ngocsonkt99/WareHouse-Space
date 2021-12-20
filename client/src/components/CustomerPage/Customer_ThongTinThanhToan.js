import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { message } from 'antd';

export default function Customer_ThongTinThanhToan() {
    const dispatch = useDispatch();
    const [dataDonHang, setDataDonHang] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    async function LayDataDonHangTheoIDUser(idUser) {
        let result = await axios.get('hethong/orders-user?id=' + idUser);
        if (result.data.status === 'success') {
            setDataDonHang(result.data.data);
        } else {
            message.error("Lấy dữ liệu data đơn hàng thất bại");
        }
    }

    useEffect(() => {
        dispatch({ type: 'SHOW_HEADER' });
        LayDataDonHangTheoIDUser(cookies.userID);
    }, [])

    return (
        <Fragment>
            <div className='container'>
                <div className='row'>
                    <span style={{ fontSize: 20 }}>Thông tin thanh toán ({dataDonHang.length} kết quả)</span>
                    <br></br>
                </div>

                <div style={{ backgroundColor: 'white', width: '100%' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Nội dung thanh toán</th>
                                <th>Hình thức thanh toán</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataDonHang.map((item, i) => {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>Thanh toán cho đơn hàng <Link to={'/customer/order/details/' + item.idShow}>{item.idShow}</Link></td>
                                        <td style={{ width: 250 }}>
                                            {
                                                item.hinhThucThanhToan === 0 && ('Thanh toán khi nhận hàng')
                                            }
                                            {
                                                item.hinhThucThanhToan === 1 && ('Thanh toán bằng Paypal')
                                            }
                                            {
                                                item.hinhThucThanhToan === 2 && ('Thanh toán bằng thẻ ATM nội địa / Internet Banking')
                                            }
                                        </td>
                                        <td style={{ width: 150 }}>{format_curency(item.tongTien.toString())} <u>đ</u></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>

    )
}
