const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'THAY_DOI_GIO_HANG':
            return true;
        case 'KHONG_THAY_DOI_GIO_HANG':
            return false;
        default:
            return state;
    }
}

export default noidung;