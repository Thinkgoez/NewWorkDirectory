export const addPhoto = (payload) => ({ type: 'ADD_PHOTO', payload })
export const fetchPhotos = (payload) => ({ type: 'FETCH_PHOTOS', payload })
export const replacePhotos = (oldItem, newItem) => ({ type: 'REPLACE_ITEM', payload: { oldItem, newItem } })