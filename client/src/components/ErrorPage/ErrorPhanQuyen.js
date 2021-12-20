import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function ErrorPhanQuyen() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type:'CLOSE_HEADER'});
    },[])
    
    return (
        <Result
            status="403"
            title="403"
            subTitle="Tài khoản của bạn đã bị khóa chức năng gian hàng. Vui lòng liên hệ với Admin để được kích hoạt tài khoản gian hàng"
            extra={<Button type="primary" onClick={()=>{
                history.push('/');
            }}>Trở về Trang chủ</Button>}
        />
    )
}
