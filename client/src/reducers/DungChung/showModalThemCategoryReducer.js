const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_THEM_CATEGORY':
            return true;
        case 'CLOSE_THEM_CATEGORY':
            return false;
        default:
            return state;
    }
}

export default noidung;