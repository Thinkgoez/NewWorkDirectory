const initialState = {
    latitude: 48.264920,
    longitude: 31.105520,
    latitudeDelta: 20,
    longitudeDelta: 20,
    loading: true,
}

export const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NEW_COORDS':
            return { ...state, ...action.payload, loading: false }
        default:
            return state
    }
}