const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CHITIET_CATEGORY':
            return true;
        case 'CLOSE_CHITIET_CATEGORY':
            return false;
        default:
            return state;
    }
}

export default noidung;