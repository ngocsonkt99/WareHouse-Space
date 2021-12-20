const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_THEM_BAIVIET':
            return true;
        case 'CLOSE_THEM_BAIVIET':
            return false;
        default:
            return state;
    }
}

export default noidung;