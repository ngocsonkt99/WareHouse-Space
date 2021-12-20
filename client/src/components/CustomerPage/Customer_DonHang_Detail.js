import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { axios } from '../../config/constant';
import { Steps, List, message } from 'antd';
import { Image } from 'react-bootstrap';

export default function DonHangDetail(props) {
    const dispatch = useDispatch();
    const idDonHang = props.match.params.id;
    const [dataChiTietDonHang, setDataChiTietDonHang] = useState([]);
    const [showChiTiet, setShowChiTiet] = useState([]);
    const { Step } = Steps;
    const [dataLichSu, setDataLichSu] = useState([]);

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

    async function LayChiTietDonHangTheoIDDonHang(idDonHang) {
        let res = await axios('hethong/order-details?idOrder=' + idDonHang);

        if (res.data.status === 'success') {
            setDataChiTietDonHang(res.data.data);
        } else {
            message.error('Lấy data chi tiết đơn hàng thất bại');
        }
    }

    async function LayLichSuChiTietDonHang() {
        let res = await axios.get('hethong/lichsu-ctdonhang');

        if (res.data.status === 'success') {
            setDataLichSu(res.data.data);
        } else {
            message.error('Lấy data lịch sử thất bại');
        }
    }

    useEffect(() => {
        dispatch({ type: 'SHOW_HEADER' });
        LayChiTietDonHangTheoIDDonHang(idDonHang);
        LayLichSuChiTietDonHang();
    }, []);

    useEffect(() => {
        for (let index = 0; index < dataChiTietDonHang.length; index++) {
            showChiTiet.push(false);
        }
    }, [dataChiTietDonHang])

    console.log(showChiTiet);

    return (
        <div className='container'>
            <div className='row'>
                <span style={{ fontSize: 20 }}>Chi tiết đơn hàng {idDonHang}</span>
                <br></br>
            </div>

            <div style={{ backgroundColor: 'white', width: '100%' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Thành tiền</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataChiTietDonHang.map((item, i) => {
                                return <Fragment key={i}>
                                    <tr>
                                        <td style={{ width: 140 }}>{item.idShow}</td>
                                        <td style={{ width: 380 }}>{item.ten}</td>
                                        <td style={{ width: 140 }}>{format_curency(item.thanhTien.toString())} <u>đ</u></td>
                                        <td style={{ width: 100 }}>
                                            {
                                                item.trangThai === 0 && (
                                                    <span style={{ color: 'blue' }}><strong>Chờ tiếp nhận từ shop</strong></span>
                                                )
                                            }
                                            {
                                                item.trangThai === 1 && (
                                                    <span style={{ color: 'red' }}><strong>Shop đã tiếp nhận</strong></span>
                                                )
                                            }
                                            {
                                                item.trangThai === 2 && (
                                                    <span style={{ color: '#CC00FF' }}><strong>Đang vận chuyển</strong></span>
                                                )
                                            }
                                            {
                                                item.trangThai === 3 && (
                                                    <span style={{ color: '#006600' }}><strong>Đã nhận hàng</strong></span>
                                                )
                                            }
                                            {
                                                item.trangThai === 4 && (
                                                    <span style={{ color: 'green' }}><strong>Hoàn thành</strong></span>
                                                )
                                            }
                                            {
                                                item.trangThai === 5 && (
                                                    <Fragment>
                                                        <span style={{ color: 'black' }}><strong>Hủy</strong></span><br></br>
                                                        <span style={{ color: 'red' }}>({item.ghiChu})</span>
                                                    </Fragment>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <a href='/' onClick={(e) => {
                                                e.preventDefault();
                                                if (showChiTiet[i] === true) {
                                                    showChiTiet[i] = false;
                                                    setShowChiTiet([
                                                        ...showChiTiet,
                                                    ])
                                                } else {
                                                    showChiTiet[i] = true;
                                                    setShowChiTiet([
                                                        ...showChiTiet,
                                                    ])
                                                }
                                            }}>
                                                {
                                                    showChiTiet[i] === true ? (
                                                        <strong>
                                                            Đóng <i class="fa fa-angle-up"></i>
                                                        </strong>
                                                    ) : (<strong>
                                                        Xem chi tiết <i class="fa fa-angle-down"></i>
                                                    </strong>)
                                                }
                                            </a>
                                        </td>
                                    </tr>
                                    {
                                        showChiTiet[i] === true && dataChiTietDonHang.length > 0 && (
                                            <tr>
                                                <td colSpan={8} style={{ height: 'auto', backgroundColor: '#DDDDDD' }}>
                                                    <div className='col'>
                                                        <div className='row'>
                                                            <div className='col-sm-5'>
                                                                <div className='row' style={{ height: 160, paddingTop: 10 }}>
                                                                    <Image src={item.img} style={{ width: 80, height: 80, marginLeft: 20 }}></Image>
                                                                    <div className='col-sm-6' style={{ marginLeft: 20 }}>
                                                                        <strong>
                                                                            {
                                                                                item.mauSac !== '' && item.size !== '' && (
                                                                                    item.ten + ' - ' + item.mauSac + ' - ' + item.size
                                                                                )
                                                                            }
                                                                            {
                                                                                item.mauSac === '' && item.size !== '' && (
                                                                                    item.ten + ' - ' + item.size
                                                                                )
                                                                            }
                                                                            {
                                                                                item.mauSac !== '' && item.size === '' && (
                                                                                    item.ten + ' - ' + item.mauSac
                                                                                )
                                                                            }
                                                                            {
                                                                                item.size === '' && item.mauSac === '' && (
                                                                                    item.ten
                                                                                )
                                                                            }
                                                                        </strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-sm-2'>
                                                                <strong>Giá</strong><br></br>
                                                                {format_curency(item.giaCuoiCung.toString())} <u>đ</u>
                                                            </div>
                                                            <div className='col-sm-1'>
                                                                <strong>Số lượng</strong><br></br>
                                                                {item.soLuong}
                                                            </div>
                                                            <div className='col-sm-2'>
                                                                <strong>Giảm giá</strong><br></br>
                                                                {format_curency(item.giamGia.toString())} <u>đ</u>
                                                            </div>
                                                            <div className='col-sm-2'>
                                                                <strong>Tạm tính</strong><br></br>
                                                                {format_curency(item.thanhTien.toString())} <u>đ</u>
                                                            </div>
                                                        </div>
                                                        <div className='col'>
                                                            <span>TRẠNG THÁI ĐƠN HÀNG</span>
                                                            <div style={{ width: '100%', height: 90, backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
                                                                <br></br>
                                                                <Steps size="small" current={item.trangThai}>
                                                                    <Step title="Đặt hàng thành công" />
                                                                    <Step title="Shop đã tiếp nhận" />
                                                                    <Step title="Đang vận chuyển" />
                                                                    <Step title="Đã nhận hàng" />
                                                                    <Step title="Hoàn thành" />
                                                                </Steps>
                                                            </div>
                                                            <br></br>
                                                            <br></br>
                                                            <span>CHI TIẾT TRẠNG THÁI ĐƠN HÀNG</span>
                                                            <div style={{ width: '100%', height: 'auto', backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
                                                                <List bordered>
                                                                    {
                                                                        dataLichSu.map((item2, i2) => {
                                                                            if (item2.idOrderDetail === item.idShow) {
                                                                                return <List.Item key={i2}>
                                                                                    <div className='row' style={{ width: '100%' }}>
                                                                                        <div className='col-sm-6'>
                                                                                            {
                                                                                                item2.trangThai === 0 && (<strong>Đặt hàng thành công</strong>)
                                                                                            }
                                                                                            {
                                                                                                item2.trangThai === 1 && (<strong>Shop đã tiếp nhận</strong>)
                                                                                            }
                                                                                            {
                                                                                                item2.trangThai === 2 && (<strong>Đang vận chuyển</strong>)
                                                                                            }
                                                                                            {
                                                                                                item2.trangThai === 3 && (<strong>Đã nhận hàng</strong>)
                                                                                            }
                                                                                            {
                                                                                                item2.trangThai === 4 && (<strong>Hoàn thành</strong>)
                                                                                            }
                                                                                            {
                                                                                                item2.trangThai === 5 && (<strong>Hủy</strong>)
                                                                                            }
                                                                                        </div>
                                                                                        <div className='col-sm-6'>
                                                                                            {
                                                                                                item2.ngayThucHien !== '' ? hamChuyenDoiNgay(new Date(item2.ngayThucHien)) : '...'
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </List.Item>
                                                                            }

                                                                        })
                                                                    }

                                                                </List>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </td>
                                            </tr>
                                        )
                                    }
                                </Fragment>
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
