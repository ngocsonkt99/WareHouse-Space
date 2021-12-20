const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_DONHANG_CHUSHOP':
            return true;
        case 'CLOSE_CHITIET_DONHANG_CHUSHOP':
            return false;
        default:
            return state;
    }
}

export default noidung;