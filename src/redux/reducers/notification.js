const initialState = {
    notif: {}
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIF':
            return {...state, notif: action.payload}
        default:
            return state
    }
}