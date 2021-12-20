const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'RELOAD_IMG':
            return true;
        case 'NO_RELOAD_IMG':
            return false;
        default:
            return state;
    }
}

export default noidung;