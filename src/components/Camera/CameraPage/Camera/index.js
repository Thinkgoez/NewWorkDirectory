import React, { useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll';
import { useDispatch } from 'react-redux'
import { RNCamera } from 'react-native-camera';
import { StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import I18n from 'react-native-i18n';

import { PendingView } from '../../../common/SimpleComponents';
import { addPhoto } from '../../../../redux/actions/galleryActions';
import { CameraTools } from './CameraTools';

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
    // saving to phone's gallery
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
    }
    return CameraRoll.save(tag, { type: 'photo' })
};

export const Camera = () => {
    const [flashMode, setFlashMode] = useState('off')
    const dispatch = useDispatch()

    const takePicture = async (camera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        // await savePicture(data.uri)
        dispatch(addPhoto(data.uri))
    };

    return (
        <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode[flashMode]}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
        >
            {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />; // color='#00ff00' - green 
                const takePictureHandle = () => {
                    takePicture(camera)
                }
                return (
                    <CameraTools takePictureHandle={takePictureHandle} changeFlashMode={setFlashMode} activeFlashMode={flashMode} />
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

