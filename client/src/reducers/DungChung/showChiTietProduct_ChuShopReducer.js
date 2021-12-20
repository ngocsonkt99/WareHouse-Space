const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_PRODUCT_CHUSHOP':
            return true;
        case 'CLOSE_CHITIET_PRODUCT_CHUSHOP':
            return false;
        default:
            return state;
    }
}

export default noidung;