const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'DANG_XUAT':
            return true;
        case 'KHONG_DANG_XUAT':
            return false;
        default:
            return state;
    }
}

export default noidung;