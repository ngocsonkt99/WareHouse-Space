const initState = {
    idShow:'',
    loaiGiamGia:'',
    giaTriGiam:''
}

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'THONGTIN_VOUCHER':
            return ({
                idShow:action.thongTinVoucher.idShow,
                loaiGiamGia:action.thongTinVoucher.loaiGiamGia,
                giaTriGiam:action.thongTinVoucher.giaTriGiam
            });
        default:
            return state;
    }
}

export default noidung;