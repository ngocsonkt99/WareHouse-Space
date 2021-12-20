import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function ResultSuccessPage(props) {
    const donhangID = props.match.params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'CLOSE_HEADER' });
    }, [])

    return (
        <div>
            <Result
                status="success"
                title="Đã đặt hàng thành công"
                subTitle={"Mã đơn hàng: " + donhangID + ". Từ bây giờ bạn có thể theo dõi đơn hàng của mình."}
                extra={[
                    <Link to='/'>
                        <Button>Trở về Trang Chủ</Button>
                    </Link>
                ]}>

            </Result>
        </div>
    )
}
