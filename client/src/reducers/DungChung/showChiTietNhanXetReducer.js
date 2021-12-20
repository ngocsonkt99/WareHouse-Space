const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_COMMENT':
            return true;
        case 'CLOSE_CHITIET_COMMENT':
            return false;
        default:
            return state;
    }
}

export default noidung;