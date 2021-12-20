var express = require('express');
var router = express.Router();

const categoryController = require('../controller/categoryController');
const brandController = require('../controller/brandController');
const authController = require('../controller/authController');
const productController = require('../controller/productController');
const voucherController = require('../controller/voucherController');
const userController = require('../controller/userController');
const localController = require('../controller/localController');
const imageController = require('../controller/imageController');
const countriesController = require('../controller/countriesController');
const orderController = require('../controller/orderController');
const orderDetailController = require('../controller/orderDetailController');
const productClassifyController = require('../controller/productClassifyController');
const lichSu_CTDonHangController = require('../controller/lichsuCTDonHangController');
const dataSearchController = require('../controller/dataSearchController');
const baiVietController = require('../controller/baiVietController');
const questAnswerController = require('../controller/questAnswerController');
const commentController = require('../controller/commentController');
const vnpayController = require('../controller/vnpayController');
const momoController = require('../controller/momoController');


// Phần xử lý Database POSTS
router.post('/baiviet-them', baiVietController.ThemBaiViet);
router.get('/baiviet-item', baiVietController.LayBaiVietTheoID);
router.get('/baiviet-item-admin', baiVietController.LayBaiVietTheoID_Admin);
router.put('/baiviet-capnhatluotxem', baiVietController.CapNhatLuotXemBaiViet);
router.get('/baiviet-showtrangchu', baiVietController.LayBaiViet_ShowTrangChu);
router.get('/baiviet-showadmin/:page', baiVietController.LayBaiViet_ShowAdmin);
router.get('/baiviet-search/:page', baiVietController.LayDanhSachBaiViet_Search_TheoTrang);
router.get('/baiviet-chuakhoa/:page', baiVietController.LayDanhSachBaiViet_ChuaKhoa_TheoTrang);
router.get('/baiviet-dakhoa/:page', baiVietController.LayDanhSachBaiViet_DaKhoa_TheoTrang);
router.put('/baiviet-xoa', baiVietController.XoaBaiViet);
router.put('/baiviet-sua', baiVietController.SuaBaiViet);
router.put('/baiviet-khoa', baiVietController.KhoaBaiViet);
router.put('/baiviet-mokhoa', baiVietController.MoKhoaBaiViet);



// Phần xử lý Database CATEGORY
router.get('/categorys/:page', categoryController.LayDanhSachCategoryTheoTrang);
router.get('/categorys-search/:page', categoryController.LayDanhSachCategory_Search_TheoTrang);
router.get('/categorys-search-nguoidung', categoryController.LayDanhSachCategory_Search_NguoiDung);
router.get('/categorys-chuakhoa/:page', categoryController.LayDanhSachCategory_ChuaKhoa_TheoTrang);
router.get('/categorys-dakhoa/:page', categoryController.LayDanhSachCategory_DaKhoa_TheoTrang);
router.get('/categorys', categoryController.LayDanhSachCategoryAll);
router.get('/categorys-show', categoryController.LayDanhSachCategoryChuaKhoa);
router.get('/categorys-item', categoryController.LayCategoryTheoID);
router.get('/categorys-product', categoryController.LayCategoryTheoIDSanPham);
router.post('/categorys-them', categoryController.ThemCategory)
router.put('/categorys-xoa', categoryController.XoaCategory);
router.put('/categorys-sua', categoryController.SuaCategory);
router.put('/categorys-khoa', categoryController.KhoaCategory);
router.put('/categorys-mokhoa', categoryController.MoKhoaCategory);


// Phần xử lý Database BRAND
router.get('/brands', brandController.LayDanhSachBrandAll);
router.get('/brands-search/:page', brandController.LayDanhSachBrand_Search_TheoTrang);
router.get('/brands/:page', brandController.LayDanhSachBrandTheoTrang);
router.get('/brands-chuakhoa/:page', brandController.LayDanhSachBrand_ChuaKhoa_TheoTrang);
router.get('/brands-dakhoa/:page', brandController.LayDanhSachBrand_DaKhoa_TheoTrang);
router.get('/brands-item', brandController.LayBrandTheoID);
router.post('/brands-them', brandController.ThemBrand)
router.put('/brands-xoa', brandController.XoaBrand);
router.put('/brands-sua', brandController.SuaBrand);
router.put('/brands-khoa', brandController.KhoaBrand);
router.put('/brands-mokhoa', brandController.MoKhoaBrand);

// Phần xử lý Database VOUCHER
router.get('/vouchers', voucherController.LayDanhSachVoucherAll);
router.get('/vouchers-search/:page', voucherController.LayDanhSachVoucher_Search_TheoTrang);
router.get('/vouchers-admin/:page', voucherController.LayDanhSachVoucherTheoTrang);
router.get('/vouchers-admin-chuakhoa/:page', voucherController.LayDanhSachVoucher_ChuaKhoa_TheoTrang);
router.get('/vouchers-admin-dakhoa/:page', voucherController.LayDanhSachVoucher_DaKhoa_TheoTrang);
router.get('/vouchers-item', voucherController.LayVoucherTheoID);
router.get('/vouchers-item-show', voucherController.LayVoucherTheoIDShow);
router.post('/vouchers-them', voucherController.ThemVoucher)
router.put('/vouchers-khoa', voucherController.KhoaVoucher);
router.put('/vouchers-mokhoa', voucherController.MoKhoaVoucher);

// Phần xử lý Database USERS
router.get('/users-item', userController.LayUserTheoID);
router.get('/users/shop-item', userController.LayShopTheoID);
router.get('/users/:page', userController.LayUserTheoTrang);
router.get('/users-chuakhoa/:page', userController.LayUser_ChuaKhoa_TheoTrang);
router.get('/users-dakhoa/:page', userController.LayUser_DaKhoa_TheoTrang);
router.get('/users/shop/:page', userController.LayShopTheoTrang);
router.get('/users/shop-chuakhoa/:page', userController.LayShop_ChuaKhoa_TheoTrang);
router.get('/users/shop-dakhoa/:page', userController.LayShop_DaKhoa_TheoTrang);
router.get('/users-search/:page', userController.LayDanhSachUser_Search_TheoTrang);
router.get('/users/shop-search/:page', userController.LayDanhSachShop_Search_TheoTrang);
//-------------------SHOP-------------------------------------
router.put('/users-sua-designshop', userController.SuaThietKeShop);
router.put('/users-sua-thongtinshop', userController.SuaThongTinShop);
//-------------------NORMAL-------------------------------------
router.put('/users-taoshop', userController.TaoShop);
router.put('/users-capnhat-taikhoan', userController.SuaThongTinTaiKhoan);
router.get('/users-kiemtra-doimatkhau', userController.KiemTraDoiMatKhau);
router.post('/users-them', userController.ThemUser);
//-------------------ADMIN-------------------------------------
router.put('/users-khoauser', userController.KhoaUser);
router.put('/users-mokhoauser', userController.MoKhoaUser);
router.put('/users/shop-khoashop', userController.KhoaShop);
router.put('/users/shop-mokhoashop', userController.MoKhoaShop);

// Phần xử lý Database PRODUCT
router.get('/products', productController.LayDanhSachProductAll);
router.get('/products-baiviet', productController.LayDanhSachProductTheoIDBaiViet);
router.get('/products/:page', productController.LayDanhSachProductTheoTrang);
router.get('/products-showpage/:page', productController.LayDanhSachProductTheoTrang_ShowPage);
router.get('/products-all-showpage/:page', productController.LayDanhSachProduct_ShowPage_TheoTrang);
router.get('/products-category/:page', productController.LayTatCaSanPhamTheoIDCategoryTheoTrang);
router.get('/products-item', productController.LayProductTheoID);
router.get('/products-sale/:page', productController.LayDanhSachProductDangGiamGia_ShowPage);
router.get('/products-shop-sale/:page', productController.LayDanhSachProductGiamGia_TheoShop);
router.get('/products-shop-nosale/:page', productController.LayDanhSachProductKhongGiamGia_TheoShop);
router.get('/products-sale-show/:page', productController.LayDanhSachProductDangGiamGia_ShowAll_TheoTrang);
router.get('/products-shop/:page', productController.LayTatCaSanPhamTheoIDShopTheoTrang);
router.get('/products-shop-show/:page', productController.LayTatCaSanPhamTheoIDShopTheoTrang_ShowPage);
router.get('/products-search/:page', productController.LayTatCaSanPhamTheoIDShop_Search_ChuShop_TheoTrang);
router.get('/products-search-admin/:page', productController.LayDanhSachProduct_Search_TheoTrang);
router.get('/products-search-nguoidung/:page', productController.LayTatCaSanPham_Search_NguoiDung_TheoTrang);
router.get('/products-category-nguoidung/:page', productController.LayTatCaSanPhamTheoCategory_NguoiDung_TheoTrang);
router.get('/products-shop-chuaduyet/:page', productController.LayTatCaSanPhamTheoIDShop_ChuaDuyet_TheoTrang);
router.get('/products-shop-daduyet/:page', productController.LayTatCaSanPhamTheoIDShop_DaDuyet_TheoTrang);
router.get('/products-shop-chuakhoa/:page', productController.LayTatCaSanPhamTheoIDShop_ChuaKhoa_TheoTrang);
router.get('/products-shop-dakhoa/:page', productController.LayTatCaSanPhamTheoIDShop_DaKhoa_TheoTrang);
router.get('/products-shop-kho', productController.LayTatCaSanPhamTheoIDShop_TheoOptionKho_TheoTrang);
router.get('/products-admin-chuaduyet/:page', productController.LayTatCaSanPham_ChuaDuyet_TheoTrang);
router.get('/products-admin-daduyet/:page', productController.LayTatCaSanPham_DaDuyet_TheoTrang);
router.get('/products-admin-chuakhoa/:page', productController.LayTatCaSanPham_ChuaKhoa_TheoTrang);
router.get('/products-admin-dakhoa/:page', productController.LayTatCaSanPham_DaKhoa_TheoTrang);
router.get('/products-kiemtrakho', productController.KiemTraKho);
router.get('/products-daxem', productController.LayDataProductDaXem_TheoIDUser);
router.get('/products-topmuoisanphambanchaynhat-theodoanhthu', productController.Top10SanPhamBanChayNhatTheoDoanhThu);
router.get('/products-topmuoisanphambanchaynhat-theosanluong', productController.Top10SanPhamBanChayNhatTheoSanLuong);
router.get('/products-topmuoisanphambanchaynhat-theosoluongdonhang', productController.Top10SanPhamBanChayNhatTheoSoLuongDonHang);
router.post('/products-them-chushop', productController.ThemProduct_ChuShop);
router.put('/products-xoa', productController.XoaProduct_ChuShop);
router.put('/products-duyetsanpham', productController.DuyetSanPham);
router.put('/products-khoasanpham', productController.KhoaSanPham);
router.put('/products-mokhoasanpham', productController.MoKhoaSanPham);
router.put('/products-sua-chushop', productController.SuaProduct_ChuShop);
router.put('/products-capnhatsoluong', productController.CapNhatSoLuong);
router.put('/products-capnhatgiatrigiamgia', productController.CapNhatGiaTriGiamGia);
router.put('/products-capnhatnguoixem', productController.CapNhatNguoiXem);

// Phần xử lý Database PRODUCTCLASSIFY
router.get('/product-classify', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct);
router.get('/product-classify/color', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct_MauSac);
router.get('/product-classify/size', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct_Size);

// Phần xử lý Database ORDER
router.get('/orders/:page', orderController.LayDonHangTheoTrang);
router.get('/orders-user', orderController.LayDonHangTheoIDUser);
router.get('/orders-item', orderController.LayDonHangTheoID);
router.post('/orders-them', orderController.ThemDonHang);
router.get('/orders-search/:page', orderController.LayDanhSachOrder_Search_TheoTrang);

// Phần xử lý Database LICHSU_CTDONHANG
router.get('/lichsu-ctdonhang', lichSu_CTDonHangController.LayLichSuCTDonHang);
router.put('/lichsu-capnhat', lichSu_CTDonHangController.CapNhatLichSu);

// Phần xử lý Database DATASEARCH
router.get('/datasearch', dataSearchController.LayDanhSachDataSearchShowPage);
router.get('/datasearch-goiy', dataSearchController.LayDanhSachDataSearchGoiY);
router.get('/datasearch-lichsutimkiem', dataSearchController.LayDanhSachDataSearchLichSuTimKiem);
router.post('/datasearch-capnhat', dataSearchController.CapNhatTimKiem);

// Phần xử lý Database ORDER DETAILS
router.get('/order-details', orderDetailController.LayChiTietDonHangTheoIdDonHang);
router.get('/order-details-item', orderDetailController.LayChiTietDonHangTheoID);
router.get('/order-details-all', orderDetailController.LayChiTietDonHangAll);
router.get('/order-details-shop/:page', orderDetailController.LayChiTietDonHangTheoIdShop_TheoTrang);
router.get('/order-details-shop-choduyet/:page', orderDetailController.LayChiTietDonHangTheoIdShop_ChoDuyet_TheoTrang);
router.get('/order-details-shop-daduyet/:page', orderDetailController.LayChiTietDonHangTheoIdShop_DaDuyet_TheoTrang);
router.get('/order-details-shop-dangvanchuyen/:page', orderDetailController.LayChiTietDonHangTheoIdShop_DangVanChuyen_TheoTrang);
router.get('/order-details-shop-khachnhanhang/:page', orderDetailController.LayChiTietDonHangTheoIdShop_KhachNhanHang_TheoTrang);
router.get('/order-details-shop-hoanthanh/:page', orderDetailController.LayChiTietDonHangTheoIdShop_HoanThanh_TheoTrang);
router.get('/order-details-shop-huy/:page', orderDetailController.LayChiTietDonHangTheoIdShop_Huy_TheoTrang);
router.get('/order-details-shop-tinhloinhuanhomnay', orderDetailController.TinhLoiNhuanHomNay);
router.get('/order-details-shop-tinhdataloinhuanbayngaytruocdo', orderDetailController.TinhDataLoiNhuan7NgayTruocDo);
router.get('/order-details-shop-tinhdataloinhuantuannay', orderDetailController.TinhDataLoiNhuanTuanNay);
router.get('/order-details-shop-tinhdatasanluongtuannay', orderDetailController.TinhDataSanLuongTuanNay);
router.get('/order-details-shop-tinhdatasodonhangtuannay', orderDetailController.TinhDataSoDonHangTuanNay);
router.get('/order-details-shop-tinhdataloinhuanthangnay', orderDetailController.TinhDataLoiNhuanThangNay);
router.get('/order-details-shop-tinhdatasanluongthangnay', orderDetailController.TinhDataSanLuongThangNay);
router.get('/order-details-shop-tinhdatasodonhangthangnay', orderDetailController.TinhDataSoDonHangThangNay);
router.get('/order-details-shop-tinhdataloinhuan3thanggannhat', orderDetailController.TinhDataLoiNhuan3ThangGanNhat);
router.get('/order-details-shop-tinhdatasanluong3thanggannhat', orderDetailController.TinhDataSanLuong3ThangGanNhat);
router.get('/order-details-shop-tinhdatasodonhang3thanggannhat', orderDetailController.TinhDataSoDonHang3ThangGanNhat);
router.get('/order-details-shop-tinhdataloinhuan6thanggannhat', orderDetailController.TinhDataLoiNhuan6ThangGanNhat);
router.get('/order-details-shop-tinhdatasanluong6thanggannhat', orderDetailController.TinhDataSanLuong6ThangGanNhat);
router.get('/order-details-shop-tinhdatasodonhang6thanggannhat', orderDetailController.TinhDataSoDonHang6ThangGanNhat);
router.get('/order-details-admin-tinhdataloinhuantuannay', orderDetailController.TinhDataLoiNhuanTuanNay_Admin);
router.get('/order-details-admin-tinhdataloinhuanthangnay', orderDetailController.TinhDataLoiNhuanThangNay_Admin);
router.get('/order-details-admin-tinhdataloinhuan3thanggannhat', orderDetailController.TinhDataLoiNhuan3ThangGanNhat_Admin);
router.get('/order-details-admin-tinhdataloinhuan6thanggannhat', orderDetailController.TinhDataLoiNhuan6ThangGanNhat_Admin);
router.get('/order-details-shop-tinhdonhang-choxacnhan', orderDetailController.TinhOrderDangChoXacNhan);
router.get('/order-details-shop-tinhdonhang-dangvanchuyen', orderDetailController.TinhOrderDangVanChuyen);
router.get('/order-details-shop-tinhdonhang-datngayhomqua', orderDetailController.TinhOrderDatNgayHomQua);
router.get('/order-details-shop-tinhdonhang-datbayngaygannhat', orderDetailController.TinhOrderDat7NgayGanNhat);
router.put('/order-details-sua-daduyet', orderDetailController.SuaTrangThaiThanhDaDuyet);
router.put('/order-details-sua', orderDetailController.SuaChiTietDonHang);

// Phần xử lý Database LOCAL
router.get('/locals', localController.LayDanhSachAll);
router.get('/locals-quan', localController.LayQuanTheoIDThanhPho);
router.get('/locals-phuong', localController.LayPhuongTheoIDQuan);
router.get('/locals-address', localController.LayTenThanhPhoQuanPhuongTheoID);

// Phần xử lý AUTH
router.post('/auth/register', authController.DangKyAccount);
router.post('/auth/forget-password', authController.QuenPassword)
router.post('/auth', authController.KiemTraAccount);
router.post('/auth/create-account', authController.TaoAccount);
// router.post('/auth/reset-password', authController.ResetPassword);
router.put('/auth/reset-password', authController.ResetPassword);
router.get('/auth/token-admin', authController.KiemTraTokenAdmin);
router.get('/auth/token-chushop', authController.KiemTraTokenChuShop);
router.get('/auth/token-normal', authController.KiemTraTokenNormal);


// Phần xử lý Database QUESTANSWER
router.post('/questanswer-them', questAnswerController.ThemCauHoi);
router.get('/questanswer-nguoidung', questAnswerController.LayCauHoiTheoIDSanPham_NguoiDung);
router.get('/questanswer-admin/:page', questAnswerController.LayCauHoiTheoIDSanPham_Admin);
router.get('/questanswer-item-admin', questAnswerController.LayCauHoiTheoID);
router.put('/questanswer-sua', questAnswerController.SuaCauHoi);
router.put('/questanswer-duyet', questAnswerController.DuyetCauHoi);
router.get('/questanswer-admin-search/:page', questAnswerController.LayCauHoiTheoIDSanPham_TheoSearch_Admin);
router.get('/questanswer-admin-chuaduyet/:page', questAnswerController.LayCauHoiTheoIDSanPham_ChuaDuyet_Admin);
router.get('/questanswer-admin-daduyet/:page', questAnswerController.LayCauHoiTheoIDSanPham_DaDuyet_Admin);
router.put('/questanswer-capnhatthich', questAnswerController.CapNhatThich);

// Phần xử lý Database COMMENT
router.post('/comments-them', commentController.ThemComment);
router.get('/comments-product', commentController.LayDataSoSaoTheoIDSanPham)
router.get('/comments-nguoidung', commentController.LayCommentTheoIDSanPham_NguoiDung);
router.get('/comments-user', commentController.LayCommentTheoIDUser);
router.get('/comments-admin/:page', commentController.LayCommentTheoIDSanPham_Admin);
router.get('/comments-item-admin', commentController.LayCommentTheoID);
router.put('/comments-sua', commentController.SuaComment);
router.put('/comments-duyet', commentController.DuyetComment);
router.get('/comments-admin-search/:page', commentController.LayCommentTheoIDSanPham_TheoSearch_Admin);
router.get('/comments-admin-chuaduyet/:page', commentController.LayCommentTheoIDSanPham_ChuaDuyet_Admin);
router.get('/comments-admin-daduyet/:page', commentController.LayCommentTheoIDSanPham_DaDuyet_Admin);


// Phần xử lý Database COUNTRIES
router.get('/countries', countriesController.LayDanhSachCountriesAll);

// Phần xử lý bên VNPAY
router.post('/vnpay-them', vnpayController.ThemDonHang_VNPAY);
router.get('/test-sendemail', vnpayController.TestSendMail);

// Phần xử lý bên MOMO
router.post('/gw_payment/transactionProcessor', momoController.ThemDonHang_MOMO);

// Phần xử lý hình ảnh
router.post('/upload-image', imageController.UploadAnh);
router.get('/open-image', imageController.OpenImage);
module.exports = router;