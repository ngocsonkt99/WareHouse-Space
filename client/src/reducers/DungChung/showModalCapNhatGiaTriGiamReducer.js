const initState = false;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_CAPNHATGIATRIGIAM':
            return true;
        case 'CLOSE_CAPNHATGIATRIGIAM':
            return false;
        default:
            return state;
    }
}

export default noidung;