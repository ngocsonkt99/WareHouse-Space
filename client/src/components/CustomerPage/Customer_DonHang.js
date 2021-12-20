import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { message } from 'antd';

export default function DonHang() {
    const dispatch = useDispatch();
    const [dataDonHang, setDataDonHang] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var now = new Date();
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
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
                    <span style={{ fontSize: 20 }}>Danh sách đơn hàng ({dataDonHang.length} đơn hàng)</span>
                    <br></br>
                </div>

                <div style={{ backgroundColor: 'white', width: '100%' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ngày tạo</th>
                                <th>Số lượng sản phẩm</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataDonHang.map((item, i) => {
                                    return <tr key={i}>
                                        <td><Link to={'order/details/' + item.idShow}>{item.idShow}</Link></td>
                                        <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                        <td>{item.soLuongSanPham}</td>
                                        <td>{format_curency(item.tongTien.toString())} <u>đ</u></td>
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
