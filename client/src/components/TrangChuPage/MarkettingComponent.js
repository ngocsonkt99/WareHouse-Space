import { Dropdown, Menu } from 'antd';
import React, { Fragment, useState } from 'react';
import { Nav, Carousel, Image } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';

export default function MarkettingComponent(props) {
    const dataCategory = props.dataCategory;
    const dataBaiViet = props.dataBaiViet;
    const history = useHistory();
    const [idParen, setParen] = useState('');


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
    function showParen(idShow) {
        setParen(idShow);
    }
    const menu = (
        <Menu>
            {dataCategory.map((item, i) => {
                var result = (item.idParen !== '' && item.idParen === idParen) ?
                    (
                        <Menu.Item key={item._id}>
                            <NavLink to={'category/' + item._id + '/' + to_slug(item.ten)} className="navMenu mr-3">
                                {item.ten}
                            </NavLink>
                        </Menu.Item>
                    ) : ''
                return result;
            })}
        </Menu>
    );
    return (

        <Fragment>
            <div className='container'>
                {/* <Nav className="flex-column nav-font-style" style={{ display: 'inline-block', textAlign: 'left' }}>
                    {dataCategory.map((item, i) => {
                        return (
                            <Nav.Item>
                                <NavLink key={item._id} to={'category/' + item._id + '/' + to_slug(item.ten)} className="navMenu">
                                    <i className={item.icon} style={{ marginRight: 10 }}></i>{item.ten}
                                </NavLink>
                            </Nav.Item>
                        )
                    })}
                </Nav> */}
                <Nav className="nav-font-style" style={{ textAlign: 'left', height: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                    {dataCategory.map((item, i) => {
                        var result = (item.idParen === '') ?
                            (
                                <Dropdown key={item._id} overlay={menu}>
                                    <NavLink to={'category/' + item._id + '/' + to_slug(item.ten)} className="navMenu" onMouseEnter={() => {
                                        setParen(item._id)
                                    }}>
                                        {/* <i className={item.icon} style={{ marginRight: 10 }}></i> */}
                                        {item.ten}
                                    </NavLink>
                                </Dropdown>
                            ) : ''
                        return result;
                    })}
                </Nav>
                <div className='row'>
                    {/* <div className="col-sm-3" style={{ backgroundColor: "#F8F9FA", width: '100%' }}> 
                        <Nav className="flex-column nav-font-style" style={{ display: 'block',textAlign:'left' }}>
                            {dataCategory.map((item, i) => {
                                return <NavLink key={item._id} to={'category/' + item._id + '/' + to_slug(item.ten)} className="navMenu">
                                    <i className={item.icon} style={{ marginRight: 10}}></i>{item.ten}<br></br>
                                </NavLink>
                            })}
                        </Nav>
                    </div> */}
                    <div className="col-sm-9">
                        <Carousel interval={1000} className="container">
                            {dataBaiViet.map((item, i) => {
                                if (i < 6) {
                                    return <Carousel.Item key={item._id}>
                                        <Link to='/' onClick={(e) => {
                                            e.preventDefault();
                                            history.push('/baiviet/' + item.idShow + '/' + to_slug(item.tieuDe))
                                        }}>
                                            <Image style={{ width: '100%', height: '320px', margin: '10px 0 ' }} src={item.img} />
                                        </Link>
                                        <Carousel.Caption>
                                            <h3 style={{ color: 'white', fontSize: 20 }}>{item.tieuDe}</h3>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                }
                            })}
                        </Carousel>
                    </div>
                    <div className="col-sm-3">

                        {dataBaiViet.map((item, i) => {
                            return (
                                (i === 2 || i === 3) &&
                                <Link key={item._id} to={'baiviet/' + item.idShow + '/' + to_slug(item.tieuDe)} >
                                    <Image id="itemQuangCao" style={{ width: '100%', height: 150, margin: '10px 0 ' }} src={item.img} rounded />
                                </Link>
                            )
                        })}
                    </div>
                </div>


            </div>
            {/* <div className="row" style={{ marginTop: 20 }}>
                {dataBaiViet.map((item, i) => {
                    return <div className="col-sm-3" key={item._id}>
                        <Link key={item._id} to={'baiviet/' + item.idShow + '/' + to_slug(item.tieuDe)}>
                            <Image id="itemQuangCao" style={{ width: '100%', height: 150 }} src={item.img} rounded />
                        </Link>
                    </div>

                })}

            </div> */}
        </Fragment >
    )
}
