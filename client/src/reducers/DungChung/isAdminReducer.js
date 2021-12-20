var initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'ADMIN':
            return true;
        case 'NO_ADMIN':
            return false;
        default:
            return state;
    }
}

export default noidung;