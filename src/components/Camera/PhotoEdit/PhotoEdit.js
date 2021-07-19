import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PhotoEditor from 'react-native-photo-editor'
import RNFS from 'react-native-fs';

import { StyledButton, StyledText, StyledView } from '../../common/SimpleComponents';
import { replacePhotos } from '../../../redux/actions/galleryActions';


export const PhotoEdit = ({ route }) => {
    const dispatch = useDispatch()
    const path = RNFS.DocumentDirectoryPath + '/photo.jpg'
    useEffect(async () => {
        const res = await RNFS.readFile(route.params.uri, 'base64')
        await RNFS.writeFile(path, res, 'base64')
    }, [route])
    console.log(route.params.uri)
    console.log(RNFS.DocumentDirectoryPath + '/photo.jpg')
    const handlePress = () => {
        PhotoEditor.Edit({
            path: path,
            // colors: undefined,
            onDone: async (path) => {
                let newPath = route.params.uri.split('.')
                newPath[newPath.length - 2] += '_edited_' + (new Date(Date.now())).getDate(); // edit new name
                newPath = newPath.join('.')
                const res = await RNFS.readFile(path, 'base64')
                await RNFS.writeFile(newPath, res, 'base64')
                dispatch(replacePhotos(route.params.uri, newPath))
                console.log('on done', path);
                // await RNFS.moveFile(path, route.params.uri)
            },
            onCancel: (...props) => {
                console.log('on cancel', props);
            },
        });

    }
    return (
        <StyledView alignItems='center' justifyContent='space-around' flex={1}>
            <StyledButton onPress={handlePress} backgroundColor='#c3c9cc' width='100px' height='30px' borderRadius='5px' alignItems='center' justifyContent='center'><StyledText color='#fff'>Edit</StyledText></StyledButton>
        </StyledView>
    )
}