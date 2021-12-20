const initState = '';

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'VALUE_SEARCH':
            return action.valueSearch;
        default:
            return state;
    }
}

export default noidung;