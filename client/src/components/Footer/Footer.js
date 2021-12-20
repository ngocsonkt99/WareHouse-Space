import React from 'react';

function Footer() {
    return (
        <footer className="page-footer font-small mdb-color lighten-3 pt-4" style={{ marginTop: 100, backgroundColor: '#F8F9FA' }}>
            <div className="container text-center text-md-left">
                <div className="row">
                    <div className="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1s">
                        <h7 className="font-weight-bold text-uppercase mb-4">Hỗ trợ khách hàng</h7><br></br>
                        <span style={{ fontSize: 14 }}>Hotline: 1900-8198
(1000 đ/phút)
<br></br>
Gửi yêu cầu hỗ trợ: warehouse.space.store@gmail.com
<br></br>
Hỗ trợ khách hàng: hotro@ware.vn
<br></br>
Báo lỗi bảo mật: security@ware.vn</span>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-4 col-lg-3 mr-auto my-md-4 my-0 mt-4 mb-1s">
                  
                        <h7 className="font-weight-bold text-uppercase mb-4">Chứng nhận bởi</h7><br></br>
                        Bộ công thương<br></br><br></br>
                        <img
                    alt=""
                    src='/PC.png'
                    width="130"
                    height="40"
                    style={{ marginRight: 5 }}
                    className="d-inline-block"
                /><br></br>
                 <img
                    alt=""
                    src='/bct2.png'
                    width="120"
                    height="40"
                    style={{ marginRight: 5 }}
                    className="d-inline-block"
                /><br></br>
                 <img
                    alt=""
                    src='/bct1.png'
                    width="100"
                    height="100"
                    style={{ marginRight: 5 }}
                    className="d-inline-block"
                />
                

                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
                        <h7 className="font-weight-bold text-uppercase mb-4">Địa chỉ văn phòng</h7>
                        <ul className="list-unstyled">
                            <li>
                                <p><br></br>
                                    <i className="fa fa-home mr-2" />Phường 4 - Gò Vấp - Tp HCM</p>
                            </li>
                            <li>
                                <p>
                                    <i className="fa fa-envelope mr-2" />warehouse.space.store@gmail.com</p>
                            </li>
                            <li>
                                <p>
                                    <i className="fa fa-phone mr-2" />0342661063</p>
                                <p>
                                    <i className="fa fa-phone mr-2" />0385748951</p>
                            </li>
                        </ul>
                    </div>
                    <hr className="clearfix w-100 d-md-none" />
                    <div className="col-md-4 col-lg-3 mx-auto my-md-4 my-0 mt-4 mb-1">
                    <h7 className="font-weight-bold text-uppercase mb-4">Kết nối với chúng tôi</h7><br></br>
                        <a href='https://www.facebook.com' type="button" className="btn-floating btn-fb">
                            <i className="fab fa-facebook-square fa-2x mr-3" />
                        </a>
                        <a href='https://www.instagram.com' type="button" className="btn-floating btn-ig">
                            <i className="fab fa-instagram fa-2x mr-3" />
                        </a>
                        <a href='https://twitter.com' type="button" className="btn-floating btn-tw">
                            <i className="fab fa-twitter-square fa-2x mr-3" />
                        </a><br></br>   
                        <h7 className="font-weight-bold text-uppercase mb-4">Hợp tác và liên kết</h7><br></br>
                        <a href="https://cellphones.com.vn/">CellPhones</a><br></br>
                        <a href="https://tiki.vn/">Tiki</a><br></br>
                        <a href="https://www.lazada.vn/">Lazada</a>                              
                    </div>
                </div>
            </div>
            <div className="container text-center text-md-left"><h7 className="font-weight-bold text-uppercase mb-4">WareHouse - Thật nhanh, thật chất lượng, thật rẻ</h7><br></br>
Giao dịch nhanh chóng, giá cả phải chăng, sản phẩm chính hãng, uy tín, chất lượng, vô vàn tiện ích và cực kỳ dễ dàng sử dụng.<br></br>
            <h8 className="font-weight-bold text-uppercase mb-4">WareHouse có tất cả</h8><br></br>
Với hàng triệu sản phẩm từ các thương hiệu, cửa hàng uy tín, hàng nghìn loại mặt hàng từ Điện thoại smartphone tới Rau củ quả tươi, WareHouse mang đến cho bạn một trải nghiệm mua sắm online bắt đầu bằng chữ tín. Thêm vào đó, ở Warehouse bạn có thể xem thông tin các sự kiện mua sắm, săn mã giảm giá, bán hàng cùng WareHouse và vô vàn các tiện ích khác.<br></br>
            <h8 className="font-weight-bold text-uppercase mb-4">Khuyến mãi, ưu đãi tràn ngập</h8><br></br>
Bạn muốn săn giá sốc, WareHouse có giá sốc mỗi ngày cho bạn! Bạn là tín đồ của các thương hiệu, các cửa hàng Official chính hãng đang chờ đón bạn. Không cần săn mã freeship, vì WareHouse đã có hàng triệu Voucher đang chờ đợi bạn. Bên cạnh đó hãy mua sắm tại WareHouse để đảm bảo sức khỏe, tiết kiệm thời gian vàng bạc của bạn trong thời kỳ dịch bệnh Covid này.
            </div>
            <div className="footer-copyright text-center py-3">Copyright © 2021 WareHouse Space
            </div>
        </footer>
    );
}

export default Footer;