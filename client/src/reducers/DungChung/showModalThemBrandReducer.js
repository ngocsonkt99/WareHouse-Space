const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_THEM_BRAND':
            return true;
        case 'CLOSE_THEM_BRAND':
            return false;
        default:
            return state;
    }
}

export default noidung;