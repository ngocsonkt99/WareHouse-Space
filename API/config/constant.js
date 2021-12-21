// const DbUrl = "mongodb://localhost:27017";
// const DbName = "OnlineSelling0";

const DbUrl = 'mongodb+srv://admin:admin123456@develop.o5a0o.mongodb.net/test'
const DbName = 'ShopOnline'

const soItemMoiPage = 8;
const soItemMoiPageCategory = 16;
const soItemMoiPageAdmin = 4;
const phanTramLoiNhuan = 10;

const vnp_TmnCode = "45PMXZ0H";
const vnp_HashSecret = "CFZOAITQKICYDBRGNLGWJGNZAAGAPWLR";
const vnp_Url = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl =
    "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html";

// Table

const user = "NguoiDung";
const voucher = "MaGiamGia";
const product = "SanPham";
const order = "DonHang";
const producttype = "PhanLoaiSanPham";
const orderdetail = "ChiTietDonHang";
const comment = "NhanXetKhachHang";
const orderhistorydetail = "LichSuDonHang";
const News = "BaiViet";
const brands = "ThuongHieu";
const question = "CauHoiKhachHang";
const category = "DanhMucSanPham";
const datasearch = "TimKiem";
const country = "QuocGia";
const local = "KhuVuc";

module.exports = {
    DbUrl,
    DbName,
    soItemMoiPage,
    soItemMoiPageAdmin,
    soItemMoiPageCategory,
    vnp_TmnCode,
    vnp_HashSecret,
    vnp_Url,
    vnp_ReturnUrl,
    phanTramLoiNhuan,
    voucher,
    user,
    product,
    order,
    producttype,
    orderdetail,
    comment,
    orderhistorydetail,
    News,
    brands,
    question,
    category,
    datasearch,
    country,
    local,
};

// Get first two documents that match the query
// .limit(2)

//hàm shuffle
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }
