import React, { Fragment } from 'react';
import { Image } from 'react-bootstrap';

export default function DescriptionItemComponent(props) {
    var dataProduct = props.thongTinProduct;
    return (
        <div className="row" style={{ marginTop: 40 }}>
            <div className="col">
                <h5>MÔ TẢ SẢN PHẨM</h5>
                <div className="col-sm-9 baiviet">
                    <div dangerouslySetInnerHTML={{ __html: dataProduct.moTa }}></div>
                </div>
            </div>
        </div>
    )
}
