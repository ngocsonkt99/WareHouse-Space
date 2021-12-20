const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_BRAND':
            return true;
        case 'CLOSE_CHITIET_BRAND':
            return false;
        default:
            return state;
    }
}

export default noidung;