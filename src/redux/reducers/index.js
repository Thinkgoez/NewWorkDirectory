import { combineReducers } from 'redux';
import { audioReducer } from './audio';
import { galleryReducer } from './gallery';
import { mapReducer } from './map';
import { notificationReducer } from './notification';

export default rootReducer = combineReducers({
    gallery: galleryReducer,
    map: mapReducer,
    notification: notificationReducer,
    audio: audioReducer,
})