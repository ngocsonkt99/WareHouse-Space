const initState = {
    showAdminMain: false
}

const noidung = (state = initState, action) => {
    switch (action.type) {
        case 'SHOW_MAIN_ADMIN':
            return ({
                showAdminMain: true
            });
        case 'SHOW_MAIN_NORMAL_VA_CHUSHOP':
            return ({
                showAdminMain: false
            });
        default:
            return state;
    }
}

export default noidung;