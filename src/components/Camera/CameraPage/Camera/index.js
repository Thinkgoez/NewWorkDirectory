import React, { useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll';
import { useDispatch } from 'react-redux'
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { StyleSheet, PermissionsAndroid, Platform } from 'react-native';

import { PendingView, StyledButton, StyledText, StyledView } from '../../../common/SimpleComponents';
import { addPhoto } from '../../../../redux/actions/galleryActions';
import { CameraTools } from './CameraTools';
import { QR_SCANNER_HEIGHT, QR_SCANNER_WIDTH, SCREEN_VIEW_HEIGHT, SCREEN_VIEW_WIDTH } from '../../../../constants';
import { StackActions, useNavigation } from '@react-navigation/native';

const hasAndroidPermission = async () => {
    // asking for permission (from lib's doc)
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}
const savePicture = async (tag) => {
    // save to phone's gallery
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
    }
    return CameraRoll.save(tag, { type: 'photo' })
};

export const Camera = () => {
    const [flashMode, setFlashMode] = useState('off')
    const [isQRCodeScanning, setQRCodeScanning] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const takePicture = async (camera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        // await savePicture(data.uri)
        dispatch(addPhoto(data.uri))
    };
    const handleQrCode = (e) => {
        closeQRScanner()

        const pushAction = StackActions.push('QRResult', { data: e.data })
        navigation.dispatch(pushAction)
    }

    const openQRScanner = () => {
        setQRCodeScanning(true)
    }
    const closeQRScanner = () => {
        setQRCodeScanning(false)
    }

    const scanAreaWidth = QR_SCANNER_WIDTH / SCREEN_VIEW_WIDTH;
    const scanAreaHeight = QR_SCANNER_HEIGHT / SCREEN_VIEW_HEIGHT;

    const scanAreaY = (1 - scanAreaWidth) / 2; // from right
    const scanAreaX = (1 - scanAreaHeight) / 2; // from top

    return (
        <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode[flashMode]}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            onBarCodeRead={isQRCodeScanning ? handleQrCode : undefined}
            rectOfInterest={isQRCodeScanning ? {
                x: scanAreaX,
                y: scanAreaY,
                width: scanAreaHeight, // real height
                height: scanAreaWidth, // real width
            } : undefined}
            cameraViewDimensions={{
                width: SCREEN_VIEW_WIDTH,
                height: SCREEN_VIEW_HEIGHT,
            }}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
        >
            {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />;
                const takePictureHandle = () => {
                    takePicture(camera)
                }
                return (
                    <>
                        <CameraTools takePictureHandle={takePictureHandle} changeFlashMode={setFlashMode} activeFlashMode={flashMode} />
                        {
                            isQRCodeScanning
                                ? <>
                                    <BarcodeMask width={QR_SCANNER_WIDTH} height={QR_SCANNER_HEIGHT} />
                                    <StyledButton
                                        backgroundColor='#cff'
                                        marginBottom='16px'
                                        borderRadius='5px'
                                        paddingVertical='4px'
                                        paddingHorizontal='8px'
                                        onPress={closeQRScanner}
                                    >
                                        <StyledText>Off scanner</StyledText>
                                    </StyledButton>
                                </>
                                : <StyledButton
                                    backgroundColor='#ffc'
                                    marginBottom='16px'
                                    borderRadius='5px'
                                    paddingVertical='4px'
                                    paddingHorizontal='8px'
                                    onPress={openQRScanner}
                                >
                                    <StyledText>Scann QR</StyledText>
                                </StyledButton>
                        }
                    </>
                );
            }}
        </RNCamera>
    )
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
});

