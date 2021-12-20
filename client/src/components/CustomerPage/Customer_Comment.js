import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { message, Rate } from 'antd';

export default function Customer_Comment() {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [dataComment, setDataComment] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const history = useHistory();

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
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


    async function LayDataCommentTheoIDUser() {
        let res = await axios.get('hethong/comments-user?id=' + cookies.userID);

        if (res.data.status === 'success') {
            setDataComment(res.data.data);
            setDataProduct(res.data.dataProduct);
        } else {
            message.error('Lấy data nhận xét thất bại');
        }
    }

    useEffect(() => {
        LayDataCommentTheoIDUser();
    }, [])

    return (
        <Fragment>
            {console.log}
            <div className='container'>
                <span style={{ fontSize: 20 }}>Nhận xét của tôi ({dataComment.length} kết quả)</span>
                <br></br>
                <div className='col' style={{ backgroundColor: 'white', width: '100%' }}>
                    {
                        dataComment.length > 0 && dataProduct.length > 0 && (
                            dataComment.map((item, i) => {
                                return <div className='row' key={i} style={{ paddingBottom: 40 }}>
                                    <div className='col-sm-2'>
                                        <img alt='ảnh' src={dataProduct[i].img} width={120} height={100}></img>
                                    </div>

                                    <div className='col-sm-10' style={{ padding: 10 }}>
                                        <p style={{ fontSize: 16 }}><Link to='/' onClick={(e) => {
                                            e.preventDefault();
                                            window.location.pathname = 'detail/' + dataProduct[i]._id + '/' + to_slug(dataProduct[i].ten);
                                        }}>{dataProduct[i].ten}</Link></p>
                                        <p style={{ color: 'silver' }}>{hamChuyenDoiNgay(new Date(item.ngayTao))}</p>
                                        <span style={{ fontSize: 16 }}><Rate disabled value={item.soSao}></Rate>&nbsp;&nbsp; <b>{item.tieuDe}</b></span><br></br>
                                        {item.noiDung}
                                    </div>
                                </div>
                            })
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}
