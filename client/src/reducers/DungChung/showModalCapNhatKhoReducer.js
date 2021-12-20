const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CAPNHATKHO':
            return true;
        case 'CLOSE_CAPNHATKHO':
            return false;
        default:
            return state;
    }
}

export default noidung;