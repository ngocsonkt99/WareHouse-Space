const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_HEADER':
            return true;
        case 'CLOSE_HEADER':
            return false;
        default:
            return state;
    }
}

export default noidung;