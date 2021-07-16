import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import { Gallery } from './Gallery';

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);
async function getGallery(setGallery) {
    const params = { first: 10 }
    const res = await CameraRoll.getPhotos(params)
    // console.log('gallery:', res)
    console.log('Opa here are some images')
    return setGallery(res.edges)
}
const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

export const CameraView = () => {
    const [galleryData, setGalleryData] = useState([])

    useEffect(() => {
        getGallery(setGalleryData)
    }, [])

    const takePicture = async (camera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        const newUri = await savePicture(data.uri)
        getGallery(setGalleryData)
        console.log(newUri);
    };

    const savePicture = async (tag) => {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }
        return CameraRoll.save(tag, { type: 'photo' })
    };
    return (
        <View style={styles.container}>
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
                {({ camera, status, recordAudioPermissionStatus }) => {
                    if (status !== 'READY') return <PendingView />;
                    return (
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                                <Text style={{ fontSize: 14 }}> SNAP </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </RNCamera>
            <Gallery gallery={galleryData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});