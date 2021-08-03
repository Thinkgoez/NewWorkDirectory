import React, { useEffect } from 'react'
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions'
import { Platform, PermissionsAndroid } from 'react-native';
import Svg, { Image } from 'react-native-svg';

import { StyledCallout, StyledMapView, StyledText, StyledView } from '../components/common/SimpleComponents';
import { setNewCoords } from '../redux/actions/mapAction'
import MarkerSVG from '../assets/marker.svg'

const coordsList = [
    { latitude: 47.8405622, longitude: 35.1257554, title: 'Good place', id: 1 },
    { latitude: 47.8404428, longitude: 34.2257533, title: 'Simple place', id: 2 },
]

const Map = () => {
    const dispatch = useDispatch()
    const { longitude, latitude, latitudeDelta, longitudeDelta, loading } = useSelector(({ map }) => map)

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
            <StyledMapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta,
                    longitudeDelta,
                }}
                flex={1}
            >
                {!loading && <Marker coordinate={{ latitude, longitude }} >
                    <MarkerSVG fill='#000' width='50px' height='50px' />
                    <StyledCallout paddingVertical='4px'>
                        <StyledView flex={1} backgroundColor='#988fac' alignItems='center'>
                            <StyledText color='#fff'>You are here!</StyledText>
                            <Svg height='150' width='200'>
                                <Image
                                    width={200}
                                    height={150}
                                    href={'https://worldgoo.com/wp-content/uploads/2019/05/The-beaches-of-Sunny-Beach.jpg'}
                                />
                            </Svg>
                        </StyledView>
                    </StyledCallout>
                </Marker>}
                {coordsList.map(place => (
                    <Marker key={place.id} coordinate={{ latitude: place.latitude, longitude: place.longitude }} pinColor='#c934eb' title={place.title} />
                ))}
            </StyledMapView>
        </StyledView>
    )
}

export default Map