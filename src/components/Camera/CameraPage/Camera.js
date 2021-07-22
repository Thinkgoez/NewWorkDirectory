import React from 'react'
import CameraRoll from "@react-native-community/cameraroll";
import {useDispatch} from 'react-redux'
import { RNCamera } from 'react-native-camera';
import { StyleSheet, PermissionsAndroid, Platform, ActivityIndicator } from 'react-native';

import { StyledButton, StyledText, StyledView } from '../../common/SimpleComponents';
import { addPhoto } from '../../../redux/actions/galleryActions';

const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}
const PendingView = () => (
    <StyledView paddingBottom='32px'>
        <ActivityIndicator color="#00ff00" size='large'/>
    </StyledView>
);

const savePicture = async (tag) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
    }
    return CameraRoll.save(tag, { type: 'photo' })
};

export const Camera = () => {
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
            flashMode={RNCamera.Constants.FlashMode.off}
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
                    <StyledView flexDirection='row' justifyContent='center'>
                        <StyledButton
                            onPress={takePictureHandle}
                            backgroundColor='#fff'
                            borderRadius='5px'
                            paddingHorizontal='20px'
                            paddingVertical='15px'
                            alignItems='center'
                            marginVertical='20px'
                            marginHorizontal='20px'
                        >
                            <StyledText fontSize='14px'>SNAP</StyledText>
                        </StyledButton>
                    </StyledView>
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