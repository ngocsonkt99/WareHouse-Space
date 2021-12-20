var initState = 0;

const noidung = (state = initState, action) => {
    switch (action.type) {

        case 'MENU_TRANGCHU':
            return 0;
        case 'MENU_DONHANG':
            return 1;
        case 'MENU_DANHSACHSANPHAM':
            return 2;
        case 'MENU_TAOMOISANPHAM':
            return 3;
        case 'MENU_BAOCAOTONKHO':
            return 4;
        case 'MENU_DANHSACHGIAMGIA':
            return 5;
        case 'MENU_DANHSACHCOUPON':
            return 6;
        case 'MENU_CHUONGTRINHKHUYENMAI':
            return 7;
        default:
            return state;
    }
}

export default noidung;