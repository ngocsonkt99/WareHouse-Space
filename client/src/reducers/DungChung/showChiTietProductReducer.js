const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_PRODUCT_ADMIN':
            return true;
        case 'CLOSE_CHITIET_PRODUCT_ADMIN':
            return false;
        default:
            return state;
    }
}

export default noidung;