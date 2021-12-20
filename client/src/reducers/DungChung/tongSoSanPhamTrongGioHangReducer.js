var initState = -1

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'TONGSO_SANPHAM':
            return action.tongSoSanPham
        default:
            return state;
    }
}

export default noidung;