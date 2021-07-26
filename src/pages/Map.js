import React, { useEffect } from 'react'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions'
import { Platform, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native'

import { StyledText, StyledView } from '../components/common/SimpleComponents';
import { setNewCoords } from '../redux/actions/mapAction'
import MarkerSVG from '../assets/marker.svg'
import { Text } from 'react-native';
import Svg, { Image } from 'react-native-svg';
// import MarkerSVG from '../assets/marker2.png'

const coordsList = [
    { latitude: 47.8405622, longitude: 35.1257554, title: 'Good place', id: 1 },
    { latitude: 47.8405622, longitude: 35.1257533, title: 'Good place', id: 2 },
]

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
                console.log('latitude:', position.coords.latitude, 'longitude:', position.coords.longitude)
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
                {!loading && <Marker coordinate={{ latitude, longitude }} >
                    <MarkerSVG fill='#000' width='50px' height='50px' />
                    <StyledCallout>
                        <StyledView flex={1} backgroundColor='#988fac' alignItems='center'>
                            <StyledText color='#fff'>You are here!</StyledText>
                            {/* <WebView source={{uri: 'https://soleato.com/images/slider/Sunny_beach_general_view1_small.jpg'}} style={{height: 200, width: 200}} /> */}
                            <Svg height="200" width="200">
                                <Image
                                    width={200}
                                    height={150}
                                    href={'https://worldgoo.com/wp-content/uploads/2019/05/The-beaches-of-Sunny-Beach.jpg'}
                                />
                            </Svg>
                            {/* <Text><Image source={{ uri: 'https://worldgoo.com/wp-content/uploads/2019/05/The-beaches-of-Sunny-Beach.jpg' }} resizeMode='cover' flex={1} /></Text> */}
                        </StyledView>
                    </StyledCallout>
                </Marker>}
                {coordsList.map(place => (
                    <Marker key={place.id} coordinate={{ latitude: place.latitude, longitude: place.longitude }} pinColor='#c934eb' title={place.title} />
                ))}
            </MapView>
        </StyledView>
    )
}

const StyledCallout = styled(Callout)`
    width: 200px;
    height: 150px;
`

// image={MarkerSVG}