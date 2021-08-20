import React, { useEffect, useState } from 'react'
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions'
import { Platform, PermissionsAndroid } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import I18n from 'react-native-i18n';
import { ClusterMap } from 'react-native-cluster-map';

import { StyledCallout, StyledMapView, StyledText, StyledView } from '../common/SimpleComponents';
import { setNewCoords } from '../../redux/actions/mapAction'
import MarkerSVG from '../../assets/marker.svg'

const coordsList = [
    { latitude: 47.8405622, longitude: 35.1257554, title: I18n.t('pages.Map.Markers.goodPlace'), id: 1 },
    { latitude: 47.8404428, longitude: 34.2257533, title: I18n.t('pages.Map.Markers.simplePlace'), id: 2 },
]


export const ContentMap = () => {
    const [region, setRegion] = useState({
        latitude: 48.264920,
        longitude: 31.105520,
        latitudeDelta: 20,
        longitudeDelta: 20,
    })
    const dispatch = useDispatch()
    const { longitude, latitude, loading } = useSelector(({ map }) => map)

    useEffect(() => {
        requestLoactionPermission()
    }, [])

    const locationCurrPosition = () => {
        Geolocation.getCurrentPosition(
            position => {
                const newCoords = { latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 5, longitudeDelta: 5 } // delta props means zoom
                setRegion(newCoords)
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
                    title: 'Location Permission',
                    message: 'App needs access to your location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Ok'
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
    const handleRegion = (Region) => {
        setRegion(Region)
    }
    return (
        <StyledView flex={1}>
            {!loading && <ClusterMap
                provider={'google'}
                onRegionChangeComplete={handleRegion}
                // showsUserLocation={true}
                region={region}
                style={{ flex: 1 }}
            // flex={1}
            >

                <Marker coordinate={{ latitude, longitude }} >
                    <MarkerSVG fill='#000' width='50px' height='50px' />
                    <StyledCallout paddingVertical='4px'>
                        <StyledView flex={1} backgroundColor='#988fac' alignItems='center'>
                            <StyledText color='#fff'>{I18n.t('pages.Map.Markers.youAreHere')}!</StyledText>
                            <Svg height='150' width='200'>
                                <Image
                                    width={200}
                                    height={150}
                                    href={'https://worldgoo.com/wp-content/uploads/2019/05/The-beaches-of-Sunny-Beach.jpg'}
                                />
                            </Svg>
                        </StyledView>
                    </StyledCallout>
                </Marker>
                {coordsList.map(place => {
                    return (
                        <Marker key={place.id} coordinate={{ latitude: place.latitude, longitude: place.longitude }} pinColor='#c934eb' title={place.title} />
                    )
                })}
                <Marker coordinate={{ latitude: latitude + 1, longitude: longitude + 1 }} pinColor='tomato' />
            </ClusterMap>
            }
        </StyledView>
    )
}