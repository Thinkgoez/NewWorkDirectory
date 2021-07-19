// import 'react-native-get-random-values';
// import { v4 as uuid } from 'uuid';

const initialState = {
    items: []
}

export const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PHOTO':
            return {...state, items: [action.payload, ...state.items]}
        case 'FETCH_PHOTOS':
            const items = Array.from(new Set([...state.items, ...action.payload]))
            // console.log('ITEMS:', items)
            return {...state, items}
        default:
            return state
    }
}