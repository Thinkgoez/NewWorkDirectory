// Question: Does it worth to create separate action consts like : ACTION: {FETCH_PHOTOS: 'FETCH_PHOTOS', REPLACE_ITEM: 'REPLACE_ITEM'} ?
export const addPhoto = (payload) => ({ type: 'ADD_PHOTO', payload })
export const fetchPhotos = (payload) => ({ type: 'FETCH_PHOTOS', payload })
export const replacePhotos = (oldItem, newItem) => ({ type: 'REPLACE_ITEM', payload: { oldItem, newItem } })