const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_THEM_PRODUCT':
            return true;
        case 'CLOSE_THEM_PRODUCT':
            return false;
        default:
            return state;
    }
}

export default noidung;