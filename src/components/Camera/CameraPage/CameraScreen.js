import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CameraRoll from '@react-native-community/cameraroll';

import { StyledButton, StyledText, StyledView } from '../../common/SimpleComponents';
import { Gallery } from './Gallery';
import { Camera } from './Camera';
import { fetchPhotos } from '../../../redux/actions/galleryActions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Linking } from 'react-native';

export const CameraScreen = () => {
    const [data, setData] = useState(null)
    const dispatch = useDispatch()
    useEffect(async () => {
        const params = { first: 10 }
        const res = await CameraRoll.getPhotos(params)
        const items = res.edges.map(it => it.node.image.uri)
        dispatch(fetchPhotos(items))
        console.log('Opa here are some images')
    }, [])
    const gallery = useSelector(({ gallery }) => gallery.items)

    const onSuccess = (qrCode) => {
        setData(qrCode.data)
        console.log('QR code data:', qrCode)
    }
    const handleGoLink = () => {
        Linking.openURL(data).catch(err =>
            console.error('An error occured', err)
        );
    }
    return (
        <StyledView flex={1} flexDirection='column' backgroundColor='#000'>
            {/* <Camera /> */}
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
                topContent={
                    data
                    &&
                    <StyledView
                        flex={1}
                        // paddingVertical='32px'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <StyledText color='#fff' fontSize='18px'> Here is some link =_= {data}</StyledText>
                    </StyledView>
                }
                bottomContent={
                    <StyledButton paddingVertical='16px' onPress={handleGoLink}>
                        <StyledText fontSize='21px' color='rgb(0,122,255)'>Go to it!</StyledText>
                    </StyledButton>
                }
            />
            <Gallery gallery={gallery} />
        </StyledView>
    );
}