import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CameraRoll from '@react-native-community/cameraroll';

import { StyledView } from '../../common/SimpleComponents';
import { Gallery } from './Gallery';
import { Camera } from './Camera';
import { fetchPhotos } from '../../../redux/actions/galleryActions';

export const CameraScreen = () => {
    const dispatch = useDispatch()
    useEffect(async () => {
        const params = { first: 10 }
        const res = await CameraRoll.getPhotos(params)
        const items = res.edges.map(it => it.node.image.uri)
        dispatch(fetchPhotos(items))
        console.log('Opa here are some images')
    }, [])
    const gallery = useSelector(({ gallery }) => gallery.items)

    return (
        <StyledView flex={1} flexDirection='column' backgroundColor='black'>
            <Camera />
            <Gallery gallery={gallery} />
        </StyledView>
    );
}