import React, { useEffect, useState } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request, PERMISSIONS } from 'react-native-permissions'
import { Platform, PermissionsAndroid } from 'react-native';

import { StyledText, StyledView } from '../components/common/SimpleComponents';



export const Map = () => {
    const [latitude, setLatitude] = useState(37.78825)
    const [longitude, setLongitude] = useState(-122.4324)
    let mapRef

    useEffect(() => {
        requestLoactionPermission()
        // Geolocation.requestAuthorization();
    }, [])
    const locationCurrPosition = () => {
        Geolocation.getCurrentPosition(position => {
            console.log(position)
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        }, (e) => console.log('Error:', e), { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 });
    }
    const requestLoactionPermission = async () => {
        if (Platform.OS === 'ios') {
            const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            if (res === 'granted') {
                locationCurrPosition()
            }
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Loaction Permission",
                    message:
                        "App needs access to your location ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                locationCurrPosition()
                console.log('Permission access')
            } else {
                console.log("Location permission denied");
            }
        }
    }
    return (
        <StyledView flex={1}>
            <MapView
                ref={ref => mapRef = ref}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{ flex: 1 }}
            >
                <Marker coordinate={{ latitude, longitude }}>
                    <Callout>
                        <StyledText>You are here!</StyledText>
                    </Callout>
                </Marker>
            </MapView>
        </StyledView>
    )
}