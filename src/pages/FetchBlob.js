import React, { useState, useEffect } from 'react'
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs'
import { StyledImage, StyledText, StyledView } from '../components/common/SimpleComponents'
import { IMAGE_URL } from '../constants'
import { Platform } from 'react-native';

const FILE_PATH = RNFS.DocumentDirectoryPath + '/file.jpg'

const FetchBlob = () => {
    const [imageData, setImageData] = useState(null)
    useEffect(async () => {
        try {
            const res = await RNFetchBlob.fetch('GET', IMAGE_URL,)
            try {
                const base64 = await res.base64()
                try {
                    await RNFS.writeFile(FILE_PATH, base64, 'base64')
                    setImageData(FILE_PATH)
                } catch (err) {
                    console.log('writeFile error:', err)
                }
            } catch (err) {
                console.log("base64 error", err)
            }
        } catch (err) {
            console.error('Fetch error:', err)
        }
    }, [])
    const extension = (Platform.OS === 'android') ? 'file://' : ''
    return (
        <StyledView>
            {!!imageData && <StyledText textAlign='center' fontSize='20px' fontWeight='bold' textTransform='uppercase' paddingVertical='8px'>hola mericos</StyledText>}
            {!!imageData && <StyledImage source={{ uri: extension + imageData }} width='100%' height='400px' />}
        </StyledView>
    )
}

export default FetchBlob