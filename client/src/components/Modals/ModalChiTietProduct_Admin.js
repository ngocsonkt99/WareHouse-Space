import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, message } from 'antd';
import { axios } from '../../config/constant';

export default function ModalChiTietProduct_Admin() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietProductAdmin = useSelector(state => state.showChiTietProductAdmin);
    const [spinnerChiTietProduct, setSpinnerChiTietProduct] = useState(false);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCountries, setDataCountries] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);

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
        moTa: '',
        moTaNganGon: [],
        soSao: 0,
        giaTriGiamGia: 0,
        soLuong: '',
        ngayTao: new Date(),
        thongTinBaoHanh: {
            baoHanh: true,
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        idBrand: '',
        idCategory: '',
        isLock: false,
        isAccept: false
    });

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
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
            message.error("L???y data s???n ph???m th???t b???i");
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_ADMIN' });
            setSpinnerChiTietProduct(false);
        }
    }

    async function LayDataCategoryAll() {
        let resData = await axios.get('hethong/categorys');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
        } else {
            message.error("L???y data danh m???c th???t b???i");
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_ADMIN' });
        }
    }

    async function LayDataBrandAll() {
        let resData = await axios.get('hethong/brands');
        if (resData.data.status === 'success') {
            setDataBrand(resData.data.data);
        } else {
            message.error("L???y data th????ng hi???u th???t b???i");
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_ADMIN' });
        }
    }

    async function LayDataCountriesAll() {
        let resData = await axios.get('hethong/countries');
        if (resData.data.status === 'success') {
            setDataCountries(resData.data.data);
        } else {
            message.error("L???y data c??c n?????c th???t b???i");
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_ADMIN' });
        }
    }

    useEffect(() => {
        LayDataCategoryAll();
        LayDataBrandAll();
        LayDataCountriesAll();
    }, [])

    return (
        <Modal show={showChiTietProductAdmin} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_ADMIN' });
        }}
            onShow={() => {
                LayProductTheoID(objectIDDuocChonReducer);
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
                            label="T??n s???n ph???m"
                            name="ten">
                            <Input disabled={true} defaultValue={productNow.ten} />
                        </Form.Item>

                        <Form.Item
                            label="Danh m???c"
                            name="danhmuc">
                            <Select
                                disabled={true}
                                defaultValue={productNow.idCategory}
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Ch???n danh m???c , nhi???u nh???t 3 l???a ch???n">
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
                            label="Th????ng hi???u"
                            name="thuonghieu">
                            <Select
                                disabled={true}
                                defaultValue={productNow.idBrand}
                                style={{ width: '100%' }}
                                placeholder="Ch???n th????ng hi???u">
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
                            label="N??i s???n xu???t"
                            name="noisanxuat"
                            rules={[{ required: true, message: 'Vui l??ng ch???n n??i s???n xu???t' }]}
                        >
                            <Select
                                disabled={true}
                                defaultValue={productNow.noiSanXuat}
                                style={{ width: '100%' }}
                                placeholder="Ch???n n??i s???n xu???t">
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
                            label="?????c ??i???m n???i b???t"
                            name="dacdiemnoibat">
                            {
                                productNow.moTaNganGon.map((item, i) => {
                                    return <Input disabled={true} defaultValue={item} />
                                })
                            }
                        </Form.Item>

                        <Form.Item
                            label="M?? t??? chi ti???t"
                            name="motachitiet">
                            <textarea style={{ width: '100%' }} disabled={true} rows="4" cols="50" defaultValue={productNow.moTa}>
                            </textarea>
                        </Form.Item>

                        <Form.Item
                            label="Gi?? g???c"
                            name="giagoc">
                            <Input
                                disabled={true}
                                defaultValue={productNow.gia.toString()}></Input>
                        </Form.Item>

                        <Form.Item
                            label="Gi?? tr??? gi???m"
                            name="giatrigiam">
                            <Input
                                disabled={true}
                                defaultValue={productNow.giaTriGiamGia.toString()}>
                            </Input>(N???u gi?? tr??? nh???p nh??? h??n 100 th?? h??? th???ng s??? t??? ?????ng gi???m theo %)
                        </Form.Item>

                        <Form.Item
                            name='anhchinh'
                            label="???nh ch??nh">
                            <img style={{ marginLeft: 20 }} src={productNow.img.chinh} alt={'???nh'} width='200' height='150'></img>
                        </Form.Item>

                        <Form.Item
                            name='anhphu'
                            label="???nh ph???">
                            {
                                productNow.img.phu.map((src, i) => {
                                    return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'???nh ' + i} width='200' height='150'></img>
                                })
                            }
                        </Form.Item>

                        <Form.Item
                            label="S??? l?????ng s???n ph???m"
                            name="soluong">
                            <Input
                                disabled={true}
                                defaultValue={productNow.soLuong.toString()}></Input>
                        </Form.Item>

                        <Form.Item
                            label="B???o h??nh"
                            name="baohanh">
                            <Select style={{ width: '100%' }}
                                disabled={true}
                                defaultValue={productNow.thongTinBaoHanh.baoHanh === true ? 0 : 1}>
                                <Option value={0}>C??</Option>
                                <Option value={1}>Kh??ng</Option>
                            </Select>
                        </Form.Item>

                        {
                            productNow.thongTinBaoHanh.baoHanh === true && (
                                <Fragment>
                                    <Form.Item
                                        label="Th???i gian b???o h??nh"
                                        name="thoigianbaohanh">
                                        <Input
                                            disabled={true}
                                            defaultValue={productNow.thongTinBaoHanh.thoiGianBaoHanh.toString()}>

                                        </Input>
                                    </Form.Item>

                                    <Form.Item
                                        label="????n v??? th???i gian b???o h??nh"
                                        name="donvibaohanh">
                                        <Select style={{ width: '100%' }}
                                            disabled={true}
                                            defaultValue={productNow.thongTinBaoHanh.donViBaoHanh}>
                                            <Option value={0}>Th??ng</Option>
                                            <Option value={1}>N??m</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Lo???i b???o h??nh"
                                        name="loaibaohanh">
                                        <Select style={{ width: '100%' }}
                                            disabled={true}
                                            defaultValue={productNow.thongTinBaoHanh.loaiBaoHanh}>
                                            <Option value={0}>B???o h??nh ch??nh h??ng</Option>
                                            <Option value={1}>B???o h??nh b???i shop th??ng qua WareHouse</Option>
                                        </Select>
                                    </Form.Item>
                                </Fragment>
                            )
                        }

                        <Form.Item
                            label="Ng??y t???o"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={hamChuyenDoiNgay(new Date(productNow.ngayTao))} />
                        </Form.Item>

                        <Form.Item
                            label="Tr???ng th??i kh??a">
                            <Select disabled={true} defaultValue={productNow.isLock === false ? "nolock" : "lock"}>
                                <Option key="lock">C??</Option>
                                <Option key="nolock">Kh??ng</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Tr???ng th??i duy???t">
                            <Select disabled={true} defaultValue={productNow.isAccept === true ? "accept" : "noaccept"}>
                                <Option key="accept">???? duy???t</Option>
                                <Option key="noaccept">Ch??a duy???t</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                )
            }
        </Modal>
    )
}
