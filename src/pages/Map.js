import React, { useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions'
import { Platform, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { StyledText, StyledView } from '../components/common/SimpleComponents';
import { setNewCoords } from '../redux/actions/mapAction'

export const Map = () => {
    const dispatch = useDispatch()
    const { longitude, latitude, latitudeDelta, longitudeDelta, loading } = useSelector(({ map }) => map)
    let mapRef

    useEffect(() => {
        requestLoactionPermission()
    }, [])
    const locationCurrPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                const newCoords = { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 5, longitudeDelta: 5 } // delta props means zoom
                dispatch(setNewCoords(newCoords))
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
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
                    title: 'Loaction Permission',
                    message:
                        'App needs access to your location ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                locationCurrPosition()
                console.log('Permission access')
            } else {
                console.log('Location permission denied');
            }
        }
    }
    return (
        <StyledView flex={1}>
            <MapView
                ref={ref => mapRef = ref}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta,
                }}
                style={{ flex: 1 }}
            >
                {!loading && <Marker coordinate={{ latitude, longitude }}>
                    <Callout>
                        <StyledText>You are here!</StyledText>
                    </Callout>
                </Marker>}
                
            </MapView>
        </StyledView>
    )
}