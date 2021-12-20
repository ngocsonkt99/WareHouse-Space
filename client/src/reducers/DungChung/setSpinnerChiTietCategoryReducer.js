var initState = -1;

const noidung = (state = initState, action) => {
    switch (action.type) {

        case 'SPINNER_CHITIETCATEGORY':
            return 1;
        case 'NO_SPINNER_CHITIETCATEGORY':
            return 0;
        default:
            return state;
    }
}

export default noidung;