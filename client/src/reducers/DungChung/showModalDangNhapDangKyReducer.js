const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL_DANGNHAP_DANGKY':
            return true;
        case 'CLOSE_MODAL_DANGNHAP_DANGKY':
            return false;
        default:
            return state;
    }
}

export default noidung;