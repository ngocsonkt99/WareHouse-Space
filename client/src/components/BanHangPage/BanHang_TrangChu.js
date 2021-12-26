import React, { Fragment, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { Carousel, Button } from 'react-bootstrap';
import { storage } from '../../firebase/firebase';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';


export default function BanHang_TrangChu(props) {
    const { TabPane } = Tabs;
    const [cookies, setCookie] = useCookies();
    const userID = cookies.userID;
    const [dataUser, setDataUser] = useState({
        _id: '',
        email: '',
        thongTinShop: {
            idShop: '',
            ten: '',
            moTa: '',
            diaChi: '',
            logoShop: '',
            keyPaypal: '',
            viShop: '',
            img: {
                carousel: [],
                banner1: '',
                banner2: ''
            }
        }
    });
    const [countAnhDaUploadThanhCong_Carousel, setCountAnhDaUploadThanhCong_Carousel] = useState(0);
    const [countAnhDaUploadThanhCong_Banner1, setCountAnhDaUploadThanhCong_Banner1] = useState(0);
    const [countAnhDaUploadThanhCong_Banner2, setCountAnhDaUploadThanhCong_Banner2] = useState(0);
    const [countAnhDaUploadThanhCong_Logo, setCountAnhDaUploadThanhCong_Logo] = useState(0);
    const [dataThayDoiThietKe, setDataThayDoiThietKe] = useState({
        logo: '',
        carousel: [],
        banner1: '',
        banner2: ''
    });

    const [dataThayDoiThongTin, setDataThayDoiThongTin] = useState({
        ten: '',
        diaChi: '',
        moTa: '',
        keyPaypal: '',
    });
    const [firstTime1, setFirstTime1] = useState(true);
    const [firstTime2, setFirstTime2] = useState(true);
    const [firstTime3, setFirstTime3] = useState(true);
    const [firstTime4, setFirstTime4] = useState(true);
    const [imageAsFile_Carousel, setImageAsFile_Carousel] = useState([]);
    const [imageAsFile_Banner1, setImageAsFile_Banner1] = useState([]);
    const [imageAsFile_Banner2, setImageAsFile_Banner2] = useState([]);
    const [imageAsFile_Logo, setImageAsFile_Logo] = useState([]);
    const [imageAsUrl_Carousel, setImageAsUrl_Carousel] = useState([]);
    const [imageAsUrl_Banner1, setImageAsUrl_Banner1] = useState([]);
    const [imageAsUrl_Banner2, setImageAsUrl_Banner2] = useState([]);
    const [imageAsUrl_Logo, setImageAsUrl_Logo] = useState([]);

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
    const client = {
        sandbox: 'AXtpVvNsxiOBjuWz-81KhPk5iMKn6XW6_N6CoDdIO-DjjtQj7Olq3HBdG98cci768r4NVim4uiOC1rXf',
        production: 'YOUR-PRODUCTION-APP-ID',
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    const handleChangeIMG_Carousel = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Carousel(listFile);

        if (listFile.length === 0) {
            console.log('Không có file nào được upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong_Carousel(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Carousel(listUrl);
    }

    const handleChangeIMG_Banner1 = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Banner1(listFile);

        if (listFile.length === 0) {
            console.log('Không có file nào được upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong_Banner1(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Banner1(listUrl);
    }

    const handleChangeIMG_Banner2 = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Banner2(listFile);

        if (listFile.length === 0) {
            console.log('Không có file nào được upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong_Banner2(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Banner2(listUrl);
    }
    const handleChangeIMG_Logo = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Logo(listFile);

        if (listFile.length === 0) {
            console.log('Không có file nào được upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong_Logo(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Logo(listUrl);
    }

    async function CapNhatThietKeGianHang() {
        let res = await axios.put('hethong/users-sua-designshop', {
            _id: dataUser._id,
            logo: dataThayDoiThietKe.logo,
            carousel: dataThayDoiThietKe.carousel,
            banner1: dataThayDoiThietKe.banner1,
            banner2: dataThayDoiThietKe.banner2
        });

        if (res.data.status === 'success') {
            alert('Cập nhật thiết kế gian hàng thành công');
            window.location.reload();
        } else {
            alert('Cập nhật thiết kế gian hàng thất bại');
        }
    }

    async function LayDataUserTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataUser({
                _id: resData.data.data._id,
                email: resData.data.data.email,
                thongTinShop: {
                    idShop: resData.data.data.thongTinShop.idShop,
                    ten: resData.data.data.thongTinShop.ten,
                    moTa: resData.data.data.thongTinShop.moTa,
                    diaChi: resData.data.data.thongTinShop.diaChi,
                    logoShop: resData.data.data.thongTinShop.logoShop,
                    keyPaypal: resData.data.data.thongTinShop.keyPaypal,
                    viShop: resData.data.data.thongTinShop.viShop,
                    img: {
                        carousel: resData.data.data.thongTinShop.img.carousel,
                        banner1: resData.data.data.thongTinShop.img.banner1,
                        banner2: resData.data.data.thongTinShop.img.banner2
                    }
                }
            });

            setDataThayDoiThongTin({
                ten: resData.data.data.thongTinShop.ten,
                moTa: resData.data.data.thongTinShop.moTa,
                diaChi: resData.data.data.thongTinShop.diaChi,
                viShop: resData.data.data.thongTinShop.viShop
            })
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function CapNhatThongTinGianHang() {
        let res = await axios.put('hethong/users-sua-thongtinshop', {
            _id: dataUser._id,
            ten: dataThayDoiThongTin.ten,
            moTa: dataThayDoiThongTin.moTa,
            diaChi: dataThayDoiThongTin.diaChi
        });

        if (res.data.status === 'success') {
            alert('Cập nhật thông tin gian hàng thành công');
            window.location.reload();
        } else {
            alert('Cập nhật thông tin gian hàng thất bại');
        }
    }

    useEffect(() => {
        if (firstTime1 === false) {
            if (imageAsFile_Carousel.length === 0) {
                alert('Vui lòng chọn ảnh cho carousel')
            } else {
                if (countAnhDaUploadThanhCong_Carousel === imageAsFile_Carousel.length) {
                    alert('Upload các carousel thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Carousel])

    useEffect(() => {
        if (firstTime2 === false) {
            if (imageAsFile_Banner1.length === 0) {
                alert('Vui lòng chọn ảnh cho banner 1')
            } else {
                if (countAnhDaUploadThanhCong_Banner1 === imageAsFile_Banner1.length) {
                    alert('Upload banner 1 thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Banner1])

    useEffect(() => {
        if (firstTime3 === false) {
            if (imageAsFile_Banner2.length === 0) {
                alert('Vui lòng chọn ảnh cho banner 2')
            } else {
                if (countAnhDaUploadThanhCong_Banner2 === imageAsFile_Banner2.length) {
                    alert('Upload banner 2 thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Banner2])

    useEffect(() => {
        if (firstTime4 === false) {
            if (imageAsFile_Logo.length === 0) {
                alert('Vui lòng chọn ảnh cho logo')
            } else {
                if (countAnhDaUploadThanhCong_Logo === imageAsFile_Logo.length) {
                    alert('Upload logo thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Logo])
    
    useEffect(() => {
        setDataThayDoiThietKe({
            carousel: dataUser.thongTinShop.img.carousel,
            banner1: dataUser.thongTinShop.img.banner1,
            banner2: dataUser.thongTinShop.img.banner2
        })
    }, [dataUser])

    useEffect(() => {
        LayDataUserTheoIDUser(userID);
    }, [])

    return (
        <Fragment>
            <Tabs defaultActiveKey="1" size='large' style={{ width: '100%' }}>
                <TabPane tab="Thiết kế Gian Hàng" key="1">
                    <div className='row' style={{ backgroundColor: '#F8F9FA', paddingTop: 20 }}>
                        <div className='col-sm-3'>
                            <div className='col'>
                                {imageAsUrl_Logo.length > 0 ? <img alt='ảnh logo' src={imageAsUrl_Logo[0]} width='350' height='350'></img> : <img alt='ảnh logo' src={dataUser.thongTinShop.logoShop === '' ? "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" : dataUser.thongTinShop.logoShop} width='350' height='350'></img>}
                                
                                <br></br>
                                <br></br>
                                <h5>{dataUser.thongTinShop.ten}</h5>
                                <h6 style={{ marginLeft: 10 }}>Đổi ảnh logo:</h6>
                                <input type='file'
                                    onChange={(e) => {
                                        handleChangeIMG_Logo(e);
                                        setCountAnhDaUploadThanhCong_Logo(0);
                                        setFirstTime4(false);
                                    }}>
                                </input>
                            </div>
                        </div>
                        <div className='col-sm-9'>
                            <div className='row' style={{ padding: 10 }}>
                                <strong style={{ marginLeft: 150 }}><h4>Banner</h4></strong>
                            </div>
                            <div className='col' style={{ marginLeft: 20 }}>
                                {
                                    dataUser.thongTinShop.img.carousel.length === 0 && (
                                        <Carousel style={{ height: 250, width: 900, textAlign: 'center', marginLeft: 60 }}>
                                            <Carousel.Item>
                                                <img alt='ảnh' className="d-block w-100" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='250' />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img alt='ảnh' className="d-block w-100" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='250' />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <img alt='ảnh' className="d-block w-100" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='250' />
                                            </Carousel.Item>
                                        </Carousel>
                                    )
                                }

                                {
                                    dataUser.thongTinShop.img.carousel.length > 0 && (
                                        <Carousel style={{ height: 250, width: 700, textAlign: 'center', marginLeft: 110 }}>
                                            {
                                                dataUser.thongTinShop.img.carousel.map((src, i) => {
                                                    return <Carousel.Item key={i}>
                                                        <img alt='ảnh carousel' className="d-block w-100" src={src} height='250' />
                                                    </Carousel.Item>
                                                })
                                            }
                                        </Carousel>
                                    )
                                }

                                <br></br>
                                <h6 style={{ marginLeft: 110 }}>Chọn ảnh làm banner (Tối đa 3):</h6>
                                <input type='file'
                                    multiple
                                    onChange={(e) => {
                                        handleChangeIMG_Carousel(e);
                                        setCountAnhDaUploadThanhCong_Carousel(0);
                                        setFirstTime1(false);
                                    }}>
                                </input>
                                <br></br>
                                <br></br>
                                {
                                    imageAsUrl_Carousel.length === 0 && (
                                        <Fragment>
                                            <img alt='ảnh' src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='50' width='150' />
                                            <img alt='ảnh' src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='50' width='150' style={{ marginLeft: 20 }} />
                                            <img alt='ảnh' src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='50' width='150' style={{ marginLeft: 20 }} />
                                        </Fragment>
                                    )
                                }

                                {
                                    imageAsUrl_Carousel.length > 0 && (
                                        imageAsUrl_Carousel.map((src, i) => {
                                            return <img key={i} alt='ảnh' src={src} height='50' width='150' />
                                        })
                                    )
                                }

                            </div>
                            <br></br>
                            <br></br>
                            <div className='row' style={{ padding: 10 }}>
                                <strong style={{ marginLeft: 0 }}><h4>Banner phụ</h4></strong>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    {
                                        dataUser.thongTinShop.img.banner1 === '' && (
                                            <img alt='ảnh' className="d-block w-100" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='150' />
                                        )
                                    }

                                    {
                                        dataUser.thongTinShop.img.banner1 !== '' && (
                                            <img alt='ảnh' className="d-block w-100" src={dataUser.thongTinShop.img.banner1} height='150' />
                                        )
                                    }

                                    <br></br>
                                    <h6 style={{ marginLeft: 10 }}>Chọn ảnh cho banner phụ 1:</h6>
                                    <input type='file'
                                        onChange={(e) => {
                                            handleChangeIMG_Banner1(e);
                                            setCountAnhDaUploadThanhCong_Banner1(0);
                                            setFirstTime2(false);
                                        }}>
                                    </input>
                                    <br></br>
                                    <br></br>
                                    {
                                        imageAsUrl_Banner1.length === 0 && (
                                            <img alt='ảnh' src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='50' width='150' />
                                        )
                                    }

                                    {
                                        imageAsUrl_Banner1.length > 0 && (
                                            imageAsUrl_Banner1.map((src, i) => {
                                                return <img alt='ảnh' key={i} src={src} height='50' width='150' />
                                            })
                                        )
                                    }
                                </div>
                                <div className='col-sm-6'>
                                    {
                                        dataUser.thongTinShop.img.banner2 === '' && (
                                            <img alt='ảnh' className="d-block w-100" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='150' />
                                        )
                                    }

                                    {
                                        dataUser.thongTinShop.img.banner2 !== '' && (
                                            <img alt='ảnh' className="d-block w-100" src={dataUser.thongTinShop.img.banner2} height='150' />
                                        )
                                    }

                                    <br></br>
                                    <h6 style={{ marginLeft: 10 }}>Chọn ảnh cho banner phụ 2:</h6>
                                    <input type='file'
                                        onChange={(e) => {
                                            handleChangeIMG_Banner2(e);
                                            setCountAnhDaUploadThanhCong_Banner2(0);
                                            setFirstTime3(false);
                                        }}>
                                    </input>
                                    <br></br>
                                    <br></br>
                                    {
                                        imageAsUrl_Banner2.length === 0 && (
                                            <img alt='ảnh' src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" height='50' width='150' />
                                        )
                                    }

                                    {
                                        imageAsUrl_Banner2.length > 0 && (
                                            imageAsUrl_Banner2.map((src, i) => {
                                                return <img alt='ảnh' key={i} src={src} height='50' width='150' />
                                            })
                                        )
                                    }
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <center><Button size='large' variant='success' style={{ width: 300, height: 70, marginBottom: 20 }}
                                onClick={() => {
                                    CapNhatThietKeGianHang();
                                    console.log(dataThayDoiThietKe);
                                }}
                                onMouseOver={() => {
                                    setDataThayDoiThietKe({
                                        carousel: imageAsUrl_Carousel,
                                        banner1: imageAsUrl_Banner1[0],
                                        banner2: imageAsUrl_Banner2[0],
                                        logo: imageAsUrl_Logo[0]
                                    })
                                }}>Lưu</Button></center>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Thông Tin Gian Hàng" key="2" >
                    <div className='row'>
                        <div className='col-sm-1'>

                        </div>

                        <div className='col-sm-6' style={{ paddingLeft: 200 }}>
                            <h6>ID người dùng:&nbsp; {dataUser._id}</h6>
                            <br></br>
                            <h6>Mã gian hàng:&nbsp; {dataUser.thongTinShop.idShop}</h6>
                            <br></br>
                            <span><h6>Tên gian hàng: &nbsp;
                                <input type='text' defaultValue={dataUser.thongTinShop.ten} style={{ width: 200 }} onChange={(e) => {
                                    setDataThayDoiThongTin({
                                        ...dataThayDoiThongTin,
                                        ten: e.target.value
                                    })
                                }}></input></h6></span>
                            <br></br>
                            {/* <span><h6>Key Paypal:&nbsp;
                                <input type='text' defaultValue={dataUser.thongTinShop.keyPaypal} style={{ width: 200 }} onChange={(e) => {
                                    setDataThayDoiThongTin({
                                        ...dataThayDoiThongTin,
                                        keyPaypal: e.target.value
                                    })
                                }}></input></h6></span>
                            <br></br> */}
                            <span><h6>Địa chỉ:&nbsp; </h6><textarea rows="4" cols="50" defaultValue={dataUser.thongTinShop.diaChi} onChange={(e) => {
                                setDataThayDoiThongTin({
                                    ...dataThayDoiThongTin,
                                    diaChi: e.target.value
                                })
                            }}></textarea></span>
                            <br></br>
                            <span><h6>Mô tả:&nbsp; </h6><textarea rows="4" cols="50" defaultValue={dataUser.thongTinShop.moTa} onChange={(e) => {
                                setDataThayDoiThongTin({
                                    ...dataThayDoiThongTin,
                                    moTa: e.target.value
                                })
                            }}></textarea></span>
                            <br></br>
                            <br></br>
                            <h6>URL:&nbsp;</h6>
                            <p>warehousespace.herokuapp.com</p>
                            <br></br>
                            {/* <h6>Vi One Up:&nbsp;  {format_curency((dataUser.thongTinShop.viShop).toString())}đ</h6>
                            <br></br> */}
                            <Button variant='outline-success' style={{ width: 150 }} onClick={() => {
                                CapNhatThongTinGianHang();
                            }}>Lưu</Button>
                        </div>

                        <div className='col-sm-4'>

                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}
