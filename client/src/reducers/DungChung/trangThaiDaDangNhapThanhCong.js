const initState = {
    showItemComponent: false
}

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'DANG_NHAP_THANH_CONG':
            return ({
                showItemComponent: true
            });
        case 'DANG_NHAP_THAT_BAI':
            return ({
                showItemComponent: false
            });
        default:
            return state;
    }
}

export default noidung;