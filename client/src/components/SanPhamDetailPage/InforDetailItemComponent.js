import React, { Fragment } from 'react';
import { Table } from 'react-bootstrap';

export default function InforDetailItemComponent(props) {
    var dataProduct = props.thongTinProduct;
    var dataBrand = props.thongTinBrand;

    return (
        <Fragment>
            <div className="row" style={{ marginTop: 40, height: 'auto' }}>
                <div className="col">
                    <h5>THÔNG TIN CHI TIẾT</h5>
                    <div className="col-sm-9 infor-detail-item">
                        <Table className="table-infor-detail-item" bordered>
                            <tbody>
                                <tr>
                                    <td className="title">Thương hiệu</td>
                                    <td>{dataBrand.ten}</td>
                                </tr>
                                <tr>
                                    <td className="title">Xuất xứ</td>
                                    <td>{dataBrand.xuatXu}</td>
                                </tr>
                                <tr>
                                    <td className="title">Nơi sản xuất</td>
                                    <td>{dataProduct.noiSanXuat}</td>
                                </tr>
                                {
                                    dataProduct.thongTinBaoHanh.baoHanh === false && (
                                        <tr>
                                            <td className="title">Bảo hành</td>
                                            <td>Không</td>
                                        </tr>
                                    )
                                }

                                {
                                    dataProduct.thongTinBaoHanh.baoHanh === true && (
                                        <Fragment>
                                            <tr>
                                                <td className="title">Bảo hành</td>
                                                <td>Có</td>
                                            </tr>

                                            <tr>
                                                <td className="title">Loại bảo hành</td>
                                                <td>{dataProduct.thongTinBaoHanh.loaiBaoHanh === 0 ? 'Bảo hành chính hãng' : 'Bảo hành từ shop'}</td>
                                            </tr>

                                            <tr>
                                                <td className="title">Thời gian bảo hành</td>
                                                <td>{dataProduct.thongTinBaoHanh.thoiGianBaoHanh} {dataProduct.thongTinBaoHanh.donViBaoHanh === 0 ? 'tháng' : 'năm'}</td>
                                            </tr>
                                        </Fragment>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
