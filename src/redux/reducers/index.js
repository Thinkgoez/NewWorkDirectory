import { combineReducers } from 'redux';
import { audioReducer } from './audio';
import { galleryReducer } from './gallery';
import { mapReducer } from './map';

export default rootReducer = combineReducers({
    gallery: galleryReducer,
    map: mapReducer,
    audio: audioReducer,
})