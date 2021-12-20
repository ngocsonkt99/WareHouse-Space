const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'RELOAD_DATABASE':
            return true;
        case 'NO_RELOAD_DATABASE':
            return false;
        default:
            return state;
    }
}

export default noidung;