import { combineReducers } from 'redux';
import trangThaiDangNhap from '../reducers/DungChung/trangThaiDaDangNhapThanhCong';
import showMainComponent from '../reducers/DungChung/showMainComponentAdminReducer';
import reloadDatabase from '../reducers/DungChung/reloadDatabaseReducer';
import setSpinner from '../reducers/DungChung/setSpinnerReducer';
import isAdmin from '../reducers/DungChung/isAdminReducer';
import objectIDDuocChon from '../reducers/DungChung/objectIDDangDuocChonReducer';
import showModalThemCategory from '../reducers/DungChung/showModalThemCategoryReducer';
import showChiTietCategory from '../reducers/DungChung/showChiTietCategoryReducer';
import setSpinnerChiTietCategory from '../reducers/DungChung/setSpinnerChiTietCategoryReducer';
import showModalThemBrand from '../reducers/DungChung/showModalThemBrandReducer';
import showChiTietBrand from '../reducers/DungChung/showChiTietBrandReducer';
import setSpinnerChiTietBrand from '../reducers/DungChung/setSpinnerChiTietBrandReducer';
import showChiTietProductAdmin from '../reducers/DungChung/showChiTietProductReducer';
import tongSoSanPham from '../reducers/DungChung/tongSoSanPhamTrongGioHangReducer';
import statusThayDoiGioHang from '../reducers/DungChung/statusThayDoiGioHangReducer';
import showModalDangNhapDangKy from '../reducers/DungChung/showModalDangNhapDangKyReducer';
import showHeader from '../reducers/DungChung/showHeaderReducer';
import thongTinDatHang from '../reducers/DungChung/thongTinDatHangKhachHangReducer';
import thongTinVoucher from '../reducers/DungChung/thongTinVoucherReducer';
import setKeyMenuBanHang from '../reducers/DungChung/setKeyMenu_BanHangReducer';
import reloadAnh from '../reducers/DungChung/reloadAnhReducer';
import showChiTietProduct_ChuShop from '../reducers/DungChung/showChiTietProduct_ChuShopReducer';
import statusDangXuat from '../reducers/DungChung/statusDangXuatReducer';
import showChiTietDonHang_ChuShop from '../reducers/DungChung/showChiTietDonHang_ChuShopReducer';
import showChiTietNguoiDung from '../reducers/DungChung/showChiTietNguoiDungReducer';
import showModalCapNhatKho from '../reducers/DungChung/showModalCapNhatKhoReducer';
import showModalCapNhatGiaTriGiam from '../reducers/DungChung/showModalCapNhatGiaTriGiamReducer';
import showModalThemBaiViet from '../reducers/DungChung/showModalThemBaiVietReducer';
import showChiTietBaiViet from '../reducers/DungChung/showChiTietBaiVietReducer';
import showChiTietCauHoi from '../reducers/DungChung/showChiTietCauHoiReducer';
import showChiTietNhanXet from '../reducers/DungChung/showChiTietNhanXetReducer';
import valueSearch from '../reducers/DungChung/valueSearchReducer';
import showModalThemVoucher from '../reducers/DungChung/showModalThemVoucherReducer';

const allReducers = combineReducers({
    trangThaiDangNhap,
    showMainComponent,
    reloadDatabase,
    showChiTietCauHoi,
    showChiTietNhanXet,
    setSpinner,
    isAdmin,
    objectIDDuocChon,
    showModalThemCategory,
    showChiTietCategory,
    setSpinnerChiTietCategory,
    showModalThemBrand,
    showChiTietBrand,
    setSpinnerChiTietBrand,
    showChiTietProductAdmin,
    tongSoSanPham,
    statusThayDoiGioHang,
    showModalDangNhapDangKy,
    showHeader,
    thongTinDatHang,
    thongTinVoucher,
    setKeyMenuBanHang,
    reloadAnh,
    showChiTietProduct_ChuShop,
    statusDangXuat,
    showChiTietDonHang_ChuShop,
    showChiTietNguoiDung,
    showModalCapNhatKho,
    showModalCapNhatGiaTriGiam,
    showModalThemBaiViet,
    valueSearch,
    showChiTietBaiViet,
    showModalThemVoucher
})

export default allReducers;