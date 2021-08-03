import React from 'react'
import { useDispatch } from 'react-redux'
import { PhotoEditorModal } from 'react-native-photoeditorsdk';
import RNFS from 'react-native-fs'

import { replacePhotos } from '../../../redux/actions/galleryActions';


export const PhotoEditorSdk = ({ route, navigation }) => {
    const dispatch = useDispatch()

    const imageUrl = route.params.url
    let newPath = imageUrl.split('.')
    newPath[newPath.length - 2] += '_edited_' + (new Date(Date.now())).getDate(); // edited image's new name
    newPath = newPath.join('.')
    
    const handleExport = (result) => { // result: {hasChanges: Boolean, image: String(path to new file), serialization: default = null(read the doc)}
        navigation?.goBack()
        RNFS.unlink(imageUrl)
            .then(() => {
                console.log('FILE DELETED');
            })
            .catch((err) => {
                console.log(err.message);
            });
        dispatch(replacePhotos(imageUrl, result.image))
    }
    return (
        <PhotoEditorModal visible={true} image={imageUrl} onExport={handleExport} configuration={{ export: { filename: newPath } }} onCancel={navigation.goBack} />
    )
}