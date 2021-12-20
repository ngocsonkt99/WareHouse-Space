var initState = -1;

const noidung = (state = initState, action) => {
    switch (action.type) {

        case 'SPINNER_CHITIETBRAND':
            return 1;
        case 'NO_SPINNER_CHITIETBRAND':
            return 0;
        default:
            return state;
    }
}

export default noidung;