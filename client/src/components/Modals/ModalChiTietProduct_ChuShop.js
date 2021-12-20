import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, message } from 'antd';
import { axios } from '../../config/constant';
import { storage } from "../../firebase/firebase";

export default function ModalChiTietProduct_ChuShop() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietProduct_ChuShop = useSelector(state => state.showChiTietProduct_ChuShop);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const [spinnerChiTietProduct, setSpinnerChiTietProduct] = useState(false);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCountries, setDataCountries] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const [countAnhDaUploadThanhCong_Chinh, setCountAnhDaUploadThanhCong_Chinh] = useState(0);
    const [countAnhDaUploadThanhCong_Phu, setCountAnhDaUploadThanhCong_Phu] = useState(0);
    const [imageAsUrl_Chinh, setImageAsUrl_Chinh] = useState([]);
    const [imageAsUrl_Phu, setImageAsUrl_Phu] = useState([]);
    const [imageAsFile_Chinh, setImageAsFile_Chinh] = useState([]);
    const [imageAsFile_Phu, setImageAsFile_Phu] = useState([]);
    const [firstTime3, setFirstTime3] = useState(true);
    const [firstTime4, setFirstTime4] = useState(true);
    const [spinnerSuaProduct, setSpinnerSuaProduct] = useState(-1);
    const [productNow, setProductNow] = useState({
        _id: '',
        ten: '',
        img: {
            chinh: '',
            phu: [],
            moTaChiTiet: []
        },
        gia: '',
        noiSanXuat: '',
        moTa: [],
        moTaNganGon: [],
        soSao: '',
        giaTriGiamGia: '',
        soLuong: '',
        ngayTao: '',
        thongTinBaoHanh: {
            baoHanh: '',
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        idBrand: '',
        idCategory: '',
        isLock: '',
        isAccept: ''
    });
    const [productSua, setProductSua] = useState({
        ten: '',
        img: {
            chinh: '',
            phu: [],
            moTaChiTiet: []
        },
        gia: '',
        noiSanXuat: '',
        moTa: [],
        moTaNganGon: [],
        soSao: 0,
        giaTriGiamGia: 0,
        soLuong: '',
        thongTinBaoHanh: {
            baoHanh: '',
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        idBrand: '',
        idCategory: '',
        isLock: '',
    });

    const handleChangeIMG_Chinh = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Chinh(listFile);

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
                                setCountAnhDaUploadThanhCong_Chinh(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Chinh(listUrl);
        setProductSua({
            ...productSua,
            img: {
                ...productSua.img,
                chinh: listUrl[0]
            }
        });
    }

    const handleChangeIMG_Phu = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Phu(listFile);

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
                                setCountAnhDaUploadThanhCong_Phu(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Phu(listUrl);
        setProductSua({
            ...productSua,
            img: {
                ...productSua.img,
                phu: listUrl
            }
        });
    }

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    function KiemTraDuLieuNhap() {
        const regSo = /^[0-9\b]+$/;
        if (productSua.ten === '' || productSua.idCategory === '' || productSua.idBrand === '' || productSua.noiSanXuat === ''
            || productSua.moTaNganGon.length === 0 || productSua.img.chinh === '' || productSua.gia === 0 || productSua.soLuong === 0) {
            setStatusMessageError(0);
        } else {
            if (!productSua.gia.toString().match(regSo)) {
                setStatusMessageError(1);
            } else {
                if (!productSua.giaTriGiamGia.toString().match(regSo)) {
                    setStatusMessageError(2);
                } else {
                    if (!productSua.soLuong.toString().match(regSo)) {
                        setStatusMessageError(3);
                    } else {
                        SuaProduct(productNow._id);
                        setStatusMessageError(-1);
                    }
                }
            }
        }
    }

    async function SuaProduct(productID) {
        //dispatch({ type: 'SPINNER_SUACAROUSEL' });
        setSpinnerSuaProduct(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/products-sua-chushop', {
                _id: productID,
                ten: productSua.ten,
                img: {
                    chinh: productSua.img.chinh,
                    phu: productSua.img.phu,
                    moTaChiTiet: productSua.img.moTaChiTiet
                },
                gia: productSua.gia,
                noiSanXuat: productSua.noiSanXuat,
                moTa: productSua.moTa,
                moTaNganGon: productSua.moTaNganGon,
                soSao: productSua.soSao,
                giaTriGiamGia: productSua.giaTriGiamGia,
                soLuong: productSua.soLuong,
                thongTinBaoHanh: {
                    baoHanh: productSua.thongTinBaoHanh.baoHanh,
                    loaiBaoHanh: productSua.thongTinBaoHanh.loaiBaoHanh,
                    thoiGianBaoHanh: productSua.thongTinBaoHanh.thoiGianBaoHanh,
                    donViBaoHanh: productSua.thongTinBaoHanh.donViBaoHanh
                },
                idBrand: productSua.idBrand,
                idCategory: productSua.idCategory,
                isLock: productSua.isLock,
            });

            if (resData.data.status === 'success') {
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaProduct(-1);
                message.success("Sửa thông tin sản phẩm thành công");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
            }
            else {
                setSpinnerSuaProduct(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                message.error("Sửa thông tin sản phẩm thất bại");
                dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
            }

        } else {
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
            dispatch({ type: 'NO_RELOAD_DATABASE' });
        }
    }



    async function LayProductTheoID(productID) {
        setSpinnerChiTietProduct(true);
        let resData = await axios.get('hethong/products-item/?id=' + productID);
        if (resData.data.status === 'success') {
            setProductNow({
                _id: resData.data.data._id,
                ten: resData.data.data.ten,
                img: {
                    chinh: resData.data.data.img.chinh,
                    phu: resData.data.data.img.phu,
                    moTaChiTiet: resData.data.data.img.moTaChiTiet
                },
                gia: resData.data.data.gia,
                noiSanXuat: resData.data.data.noiSanXuat,
                moTa: resData.data.data.moTa,
                moTaNganGon: resData.data.data.moTaNganGon,
                soSao: resData.data.data.soSao,
                giaTriGiamGia: resData.data.data.giaTriGiamGia,
                soLuong: resData.data.data.soLuong,
                ngayTao: resData.data.data.ngayTao,
                thongTinBaoHanh: {
                    baoHanh: resData.data.data.thongTinBaoHanh.baoHanh,
                    loaiBaoHanh: resData.data.data.thongTinBaoHanh.loaiBaoHanh,
                    thoiGianBaoHanh: resData.data.data.thongTinBaoHanh.thoiGianBaoHanh,
                    donViBaoHanh: resData.data.data.thongTinBaoHanh.donViBaoHanh
                },
                idBrand: resData.data.data.idBrand,
                idCategory: resData.data.data.idCategory,
                isLock: resData.data.data.isLock,
                isAccept: resData.data.data.isAccept
            });
            setSpinnerChiTietProduct(false);
        } else {
            message.error("Lấy data sản phẩm thất bại");
            setSpinnerChiTietProduct(false);
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
        }
    }

    async function LayDataCategoryAll() {
        let resData = await axios.get('hethong/categorys');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
        } else {
            message.error("Lấy data danh mục sản phẩm thất bại");
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
        }
    }

    async function LayDataBrandAll() {
        let resData = await axios.get('hethong/brands');
        if (resData.data.status === 'success') {
            setDataBrand(resData.data.data);
        } else {
            message.error("Lấy data thương hiệu thất bại");
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
        }
    }

    async function LayDataCountriesAll() {
        let resData = await axios.get('hethong/countries');
        if (resData.data.status === 'success') {
            setDataCountries(resData.data.data);
        } else {
            message.error("Lấy data các nước thất bại");
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
        }
    }

    useEffect(() => {
        LayDataCategoryAll();
        LayDataBrandAll();
        LayDataCountriesAll();
    }, [])


    useEffect(() => {
        if (firstTime3 === false) {
            if (imageAsFile_Chinh.length === 0) {
                message.error('Vui lòng chọn ảnh chính cho sản phẩm')
            } else {
                if (countAnhDaUploadThanhCong_Chinh === imageAsFile_Chinh.length) {
                    message.success('Upload ảnh chính cho sản phẩm thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Chinh])

    useEffect(() => {
        if (firstTime4 === false) {
            if (imageAsFile_Phu.length === 0) {
                message.error('Vui lòng chọn ảnh phụ cho sản phẩm')
            } else {
                if (countAnhDaUploadThanhCong_Phu === imageAsFile_Phu.length) {
                    message.success('Upload các ảnh phụ cho sản phẩm thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Phu])

    useEffect(() => {
        if (statusSua === 1) {
            setShowButtonHuy(true)
        } else {
            setShowButtonHuy(false)
        }
    }, [statusSua])


    return (
        <Modal show={showChiTietProduct_ChuShop} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
        }}
            onShow={() => {
                LayProductTheoID(objectIDDuocChonReducer);
                setDisableOptions(false);
                setStatusSua(0);
                setStatusMessageError(-1);
            }}>

            {
                spinnerChiTietProduct === true && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                spinnerChiTietProduct === false && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm ' }]}>
                            <Input disabled={!disableOptions} defaultValue={productNow.ten} onChange={(e) => {
                                setProductSua({
                                    ...productSua,
                                    ten: e.target.value
                                })
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Danh mục"
                            name="danhmuc"
                            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                        >
                            <Select
                                disabled={!disableOptions}
                                defaultValue={productNow.idCategory}
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Chọn danh mục , nhiều nhất 3 lựa chọn"
                                onChange={(value) => {
                                    setProductSua({
                                        ...productSua,
                                        idCategory: value
                                    })
                                }}
                            >
                                {
                                    dataCategory.map((item, i) => {
                                        return <Option key={item._id} value={item._id}>
                                            {item.ten}
                                        </Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Thương hiệu"
                            name="thuonghieu"
                            rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
                        >
                            <Select
                                disabled={!disableOptions}
                                defaultValue={productNow.idBrand}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%' }}
                                placeholder="Chọn thương hiệu"
                                onChange={(value) => {
                                    setProductSua({
                                        ...productSua,
                                        idBrand: value
                                    })
                                }}
                            >
                                {
                                    dataBrand.map((item, i) => {
                                        return <Option key={item._id} value={item._id}>
                                            {item.ten}
                                        </Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Nơi sản xuất"
                            name="noisanxuat"
                            rules={[{ required: true, message: 'Vui lòng chọn nơi sản xuất' }]}
                        >
                            <Select
                                disabled={!disableOptions}
                                defaultValue={productNow.noiSanXuat}
                                style={{ width: '100%' }}
                                placeholder="Chọn nơi sản xuất"
                                onChange={(value) => {
                                    setProductSua({
                                        ...productSua,
                                        noiSanXuat: value
                                    })
                                }}
                            >
                                {
                                    dataCountries.map((item, i) => {
                                        return <Option key={item._id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Đặc điểm nổi bật"
                            name="dacdiemnoibat"
                            rules={[{ required: true }]}
                        >
                            {
                                productNow.moTaNganGon.map((item, i) => {
                                    return <Input key={i} disabled={!disableOptions} defaultValue={item} onChange={(e) => {
                                        productNow.moTaNganGon[i] = e.target.value;
                                        var newArray = productNow.moTaNganGon;
                                        setProductSua({
                                            ...productSua,
                                            moTaNganGon: newArray
                                        })
                                    }} />
                                })
                            }
                        </Form.Item>

                        <Form.Item
                            label="Mô tả chi tiết"
                            name="motachitiet"
                            rules={[{ required: true }]}
                        >
                            <textarea style={{ width: '100%' }} disabled={!disableOptions} rows="4" cols="50" defaultValue={productNow.moTa} onChange={(e) => {
                                setProductSua({
                                    ...productSua,
                                    moTa: e.target.value
                                });
                            }}>
                            </textarea>
                        </Form.Item>

                        <Form.Item
                            label="Giá gốc"
                            name="giagoc"
                            rules={[{ required: true, message: 'Vui lòng nhập giá gốc sản phẩm' }]}>
                            <Input
                                disabled={!disableOptions}
                                defaultValue={productNow.gia.toString()}
                                onChange={(e) => {
                                    setProductSua({
                                        ...productSua,
                                        gia: parseInt(e.target.value)
                                    })
                                }}></Input>
                        </Form.Item>

                        <Form.Item
                            label="Giá trị giảm"
                            name="giatrigiam">
                            <Input
                                disabled={!disableOptions}
                                defaultValue={productNow.giaTriGiamGia.toString()}
                                onChange={(e) => {
                                    setProductSua({
                                        ...productSua,
                                        giaTriGiamGia: parseInt(e.target.value)
                                    })
                                }}></Input>(Nếu giá trị nhập nhỏ hơn 100 thì hệ thống sẽ tự động giảm theo %)
                        </Form.Item>

                        <Form.Item
                            label="Ảnh chính cho sản phẩm"
                            name="anhchinh"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                            <input type='file'
                                disabled={!disableOptions}
                                onChange={(e) => {
                                    handleChangeIMG_Chinh(e);
                                    setCountAnhDaUploadThanhCong_Chinh(0);
                                    setFirstTime3(false);
                                }}>
                            </input>
                        </Form.Item>

                        <Form.Item
                            name='showanhchinh'
                            label="Show ảnh chính">
                            {
                                statusSua === 0 && (
                                    <img style={{ marginLeft: 20 }} src={productNow.img.chinh} alt={'ảnh'} width='200' height='150'></img>
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl_Chinh.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="Ảnh phụ cho sản phẩm"
                            name="anhphu"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                            <input type='file'
                                disabled={!disableOptions}
                                multiple
                                onChange={(e) => {
                                    handleChangeIMG_Phu(e);
                                    setCountAnhDaUploadThanhCong_Phu(0);
                                    setFirstTime4(false);
                                }}>
                            </input>
                        </Form.Item>

                        <Form.Item
                            name='showanhphu'
                            label="Show các ảnh phụ">
                            {
                                statusSua === 0 && (
                                    productNow.img.phu.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl_Phu.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="Số lượng sản phẩm"
                            name="soluong"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}>
                            <Input
                                disabled={!disableOptions}
                                defaultValue={productNow.soLuong.toString()}
                                onChange={(e) => {
                                    setProductSua({
                                        ...productSua,
                                        soLuong: parseInt(e.target.value)
                                    })
                                }}></Input>
                        </Form.Item>

                        <Form.Item
                            label="Bảo hành"
                            name="baohanh">
                            <Select style={{ width: '100%' }}
                                disabled={!disableOptions}
                                defaultValue={productNow.thongTinBaoHanh.baoHanh === true ? 0 : 1} onChange={(value) => {
                                    if (value === 1) {
                                        setProductSua({
                                            ...productSua,
                                            thongTinBaoHanh: {
                                                baoHanh: false,
                                                thoiGianBaoHanh: '',
                                                donViBaoHanh: '',
                                                loaiBaoHanh: ''
                                            }
                                        })
                                    } else {
                                        setProductSua({
                                            ...productSua,
                                            thongTinBaoHanh: {
                                                ...productSua.thongTinBaoHanh,
                                                baoHanh: true
                                            }
                                        })
                                    }

                                }}>
                                <Option value={0}>Có</Option>
                                <Option value={1}>Không</Option>
                            </Select>
                        </Form.Item>

                        {
                            productNow.thongTinBaoHanh.baoHanh === true && (
                                <Fragment>
                                    <Form.Item
                                        label="Thời gian bảo hành"
                                        name="thoigianbaohanh"
                                        rules={[{ required: true, message: 'Vui lòng nhập thời gian bảo hành' }]}>
                                        <Input
                                            disabled={!disableOptions}
                                            defaultValue={productNow.thongTinBaoHanh.thoiGianBaoHanh.toString()}
                                            onChange={(e) => {
                                                setProductSua({
                                                    ...productSua,
                                                    thongTinBaoHanh: {
                                                        ...productSua.thongTinBaoHanh,
                                                        thoiGianBaoHanh: parseInt(e.target.value)
                                                    }
                                                })
                                            }}></Input>
                                    </Form.Item>

                                    <Form.Item
                                        label="Đơn vị thời gian bảo hành"
                                        name="donvibaohanh"
                                        rules={[{ required: true, message: 'Vui lòng nhập đơn vị thời gian bảo hành' }]}>
                                        <Select style={{ width: '100%' }}
                                            disabled={!disableOptions}
                                            defaultValue={productNow.thongTinBaoHanh.donViBaoHanh}
                                            onChange={(value) => {
                                                setProductSua({
                                                    ...productSua,
                                                    thongTinBaoHanh: {
                                                        ...productSua.thongTinBaoHanh,
                                                        donViBaoHanh: value
                                                    }
                                                })
                                            }}>
                                            <Option value={0}>Tháng</Option>
                                            <Option value={1}>Năm</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Loại bảo hành"
                                        name="loaibaohanh"
                                        rules={[{ required: true, message: 'Vui lòng chọn loại bảo hành' }]}>
                                        <Select style={{ width: '100%' }}
                                            disabled={!disableOptions}
                                            defaultValue={productNow.thongTinBaoHanh.loaiBaoHanh}
                                            onChange={(value) => {
                                                setProductSua({
                                                    ...productSua,
                                                    thongTinBaoHanh: {
                                                        ...productSua.thongTinBaoHanh,
                                                        loaiBaoHanh: value
                                                    }
                                                })
                                            }}>
                                            <Option value={0}>Bảo hành chính hãng</Option>
                                            <Option value={1}>Bảo hành bởi shop thông qua WareHouse</Option>
                                        </Select>
                                    </Form.Item>
                                </Fragment>
                            )
                        }

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao"
                        >
                            <Input disabled={true} defaultValue={hamChuyenDoiNgay(new Date(productNow.ngayTao))} />
                        </Form.Item>

                        <Form.Item
                            name="button2">
                            {
                                statusMessageError === 0 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Thông tin tạo mới sản phẩm không hợp lệ. Vui lòng kiểm tra lại</p>
                                )
                            }

                            {
                                statusMessageError === 1 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Giá gốc không hợp lệ</p>
                                )
                            }

                            {
                                statusMessageError === 2 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Giá trị giảm giá không hợp lệ</p>
                                )
                            }

                            {
                                statusMessageError === 3 && (
                                    <p style={{ color: 'red', lineHeight: 1.5 }}>Giá trị số lượng sản phẩm không hợp lệ</p>
                                )
                            }
                            <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                if (statusSua === 0) {
                                    setStatusSua(1);
                                    setDisableOptions(true);
                                }
                                else {
                                    KiemTraDuLieuNhap();
                                }
                                if (statusSua === 0) {
                                    setProductSua({
                                        ten: productNow.ten,
                                        img: {
                                            chinh: productNow.img.chinh,
                                            phu: productNow.img.phu,
                                            moTaChiTiet: productNow.img.moTaChiTiet
                                        },
                                        gia: productNow.gia,
                                        noiSanXuat: productNow.noiSanXuat,
                                        moTa: productNow.moTa,
                                        moTaNganGon: productNow.moTaNganGon,
                                        soSao: productNow.soSao,
                                        giaTriGiamGia: productNow.giaTriGiamGia,
                                        soLuong: productNow.soLuong,
                                        thongTinBaoHanh: {
                                            baoHanh: productNow.thongTinBaoHanh.baoHanh,
                                            loaiBaoHanh: productNow.thongTinBaoHanh.loaiBaoHanh,
                                            thoiGianBaoHanh: productNow.thongTinBaoHanh.thoiGianBaoHanh,
                                            donViBaoHanh: productNow.thongTinBaoHanh.donViBaoHanh
                                        },
                                        idBrand: productNow.idBrand,
                                        idCategory: productNow.idCategory,
                                        isLock: productNow.isLock
                                    });
                                }
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaProduct === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaProduct === 1 && (
                                        <Spinner animation="border" role="status" style={{ marginLeft: 40 }}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    )
                                }
                            </Button>
                        </Form.Item>
                        {
                            showButtonHuy === true && (
                                <Form.Item
                                    name="button3">
                                    <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                        setDisableOptions(false);
                                        setStatusSua(0);
                                    }}>Hủy</Button>
                                </Form.Item>
                            )
                        }
                    </Form>
                )
            }
        </Modal>
    )
}
