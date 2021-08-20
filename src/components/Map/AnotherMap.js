import React, { useEffect, useState } from 'react'
import { Dimensions, PermissionsAndroid, Platform } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { lineString as makeLineString } from '@turf/helpers'
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions'
import Geolocation from 'react-native-geolocation-service';

import { StyledButton, StyledText, StyledView } from '../common/SimpleComponents';
import { request, PERMISSIONS } from 'react-native-permissions'

const accessToken = 'pk.eyJ1IjoidGhpbmtnb2V6IiwiYSI6ImNrc2s4bGd2ZjJsZXMyb28zZ2Q5bjRjNTQifQ.KzVzyQ6kO7H3THbRMFg7nw'
const directionsClient = MapboxDirectionsFactory({ accessToken })

MapboxGL.setAccessToken(accessToken);
const WIDTH = Dimensions.get('screen').width

const styles = {
    lineLayer: {
        lineColor: 'red',
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 7,
        lineGradient: [
            'interpolate',
            ['linear'],
            ['line-progress'],
            0,
            'blue',
            0.1,
            'royalblue',
            0.3,
            'cyan',
            0.5,
            'lime',
            0.7,
            'yellow',
            1,
            'red',
        ],
    },
};

const requestLocPermission = async () => {
    if (Platform.OS === 'ios') {
        const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        if (res === 'granted') {
            return true
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
            console.log('Permission access')
            return true
        } else {
            console.log('Location permission denied');
        }
    }
    return false
}

const getStartPosition = async (cb) => {
    await Geolocation.getCurrentPosition(
        position => {
            const currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude } // delta props means zoom
            cb(currentPosition)
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
}
const getDirections = async (startLoc, destLoc) => {
    const reqOptions = {
        waypoints: [
            { coordinates: startLoc },
            { coordinates: destLoc },
        ],
        profile: 'driving',
        geometries: 'geojson',
    };
    try {
        const res = await directionsClient.getDirections(reqOptions).send()
        const route = makeLineString(res.body.routes[0].geometry.coordinates)
        return route
    } catch (err) {
        console.log('getDirections error:', err)
    }
}
export const AnotherMap = () => {
    const [route, setRoute] = useState(null)
    const [isShowRoute, setShowRoute] = useState(false)
    const [userPosition, setUserPosition] = useState(null)
    const [userStartPosition, setStartPosition] = useState(null)
    useEffect(async () => {
        MapboxGL.setConnected(true);
        MapboxGL.setTelemetryEnabled(true);
        const permission = await MapboxGL.requestAndroidLocationPermissions();
        requestLocationPermission()
    }, [])

    const requestLocationPermission = async () => {
        const access = await requestLocPermission()
        if (access) {
            getStartPosition(async (pos) => {
                if (pos) {
                    setUserPosition(pos)
                    setStartPosition(pos)
                    // const resRoute = await getDirections([-122.084, 37.3], [pos.longitude, pos.latitude])
                    // setRoute(resRoute)
                }
            })
        }
    }
    const onUserLocationUpdate = async (location) => {
        const currentPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setUserPosition(currentPosition);
        if(userStartPosition){
            const resRoute = await getDirections([currentPosition.longitude, currentPosition.latitude], [userStartPosition.longitude, userStartPosition.latitude])
            setRoute(resRoute)
        }
        
        // console.log('resRoute', resRoute)
    }
    const onShowWay = () => {
        setShowRoute(el => !el)
    }
    return (
        <StyledView flex={1} justifyContent='center' alignItems='center'>
            <StyledView width={WIDTH + 'px'} flex={1}>
                <MapboxGL.MapView
                    style={{ flex: 1 }}
                    logoEnabled={false}
                    attributionEnabled={Platform.OS === 'ios'}
                >
                    <MapboxGL.UserLocation
                        visible={true}
                        onUpdate={onUserLocationUpdate}
                    />
                    <MapboxGL.Camera
                        zoomLevel={10}
                        followUserMode={'normal'}
                        followUserLocation
                    />
                    <MapboxGL.PointAnnotation
                        coordinate={[35.1257554, 47.8405622]}
                        id='PointAnnotation-1'
                        title='This is a sample'
                    >
                        <MapboxGL.Callout title='This is a sample' />

                    </MapboxGL.PointAnnotation>
                    <MapboxGL.PointAnnotation
                        coordinate={[-122.084, 37.3]}
                        id='PointAnnotation-3'
                        title='This is a sample'
                    >
                        <MapboxGL.Callout title='This is a sample' />

                    </MapboxGL.PointAnnotation>
                    {userPosition
                        && <MapboxGL.PointAnnotation
                            coordinate={[userPosition.longitude, userPosition.latitude]}
                            id='PointAnnotation-3'
                            title='This is a sample'
                        >
                            <MapboxGL.Callout title='This is a sample' />

                        </MapboxGL.PointAnnotation>
                    }
                    {isShowRoute && route
                        ? <MapboxGL.ShapeSource id='routeSource' shape={route.geometry}>
                            <MapboxGL.LineLayer id='routeFill' style={{ lineColor: 'navy', lineWidth: 3.2, lineCap: MapboxGL.LineJoin.Round, lineOpacity: 1.84 }} />
                        </MapboxGL.ShapeSource>
                        : null
                    }
                </MapboxGL.MapView>
            </StyledView>
            <StyledButton onPress={onShowWay} paddingVertical='16px' border='1px solid navy' width='100%' alignItems='center'><StyledText>{isShowRoute ? 'Hide route' :'Show last way'}</StyledText></StyledButton>
        </StyledView>
    );
}

const Anotation = () => {
    return (
        <StyledView>
            <StyledText>Anoitation text</StyledText>
        </StyledView>
    )
}