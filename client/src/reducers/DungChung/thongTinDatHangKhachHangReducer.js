const initState = {
    hoTen: '',
    sdt: '',
    diaChi: '',
    phuong: '',
    quan: '',
    thanhPho: ''
}

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'THONGTIN_DATHANG':
            return ({
                hoTen: action.thongTin.hoTen,
                sdt: action.thongTin.sdt,
                diaChi: action.thongTin.diaChi,
                phuong: action.thongTin.phuong,
                quan: action.thongTin.quan,
                thanhPho: action.thongTin.thanhPho
            });
        default:
            return state;
    }
}

export default noidung;