const initState = null;

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'OBJECT_ID_NOW':
            return action.id
        default:
            return state
    }
}

export default noidung;