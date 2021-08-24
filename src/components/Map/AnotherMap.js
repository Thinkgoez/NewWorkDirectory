import React, { useEffect, useState } from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions'
import { Dimensions, PermissionsAndroid, Platform } from 'react-native'
import { lineString as makeLineString } from '@turf/helpers'
import { request, PERMISSIONS } from 'react-native-permissions'

import { StyledButton, StyledText, StyledView } from '../common/SimpleComponents';
import { MAPBOX_GL_ACCESS_TOKEN } from '../../constants';

const directionsClient = MapboxDirectionsFactory({ accessToken: MAPBOX_GL_ACCESS_TOKEN })

MapboxGL.setAccessToken(MAPBOX_GL_ACCESS_TOKEN);
const WIDTH = Dimensions.get('screen').width

const styles = {
    lineLayer: {
        lineColor: 'navy',
        lineCap: 'round',
        lineJoin: 'round',
        lineWidth: 3.2,
        lineOpacity: 1.84,
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
}

const requestLocPermission = async () => {
    let res = null
    if (Platform.OS === 'ios') {
        res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else {
        res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'App needs access to your location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'Ok'
            }
        );
    }
    if (res === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission access')
        return true
    }

    console.log('Location permission denied');
    return false
}
const getStartPosition = async (callBack) => {
    await Geolocation.getCurrentPosition(
        position => {
            const currentPosition = { latitude: position.coords.latitude, longitude: position.coords.longitude } // delta props means zoom
            callBack(currentPosition)
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
    const [isStreetRoute, setStreetRoute] = useState(false)
    const [userHistoryCoords, setUserHistoryCoords] = useState([])
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
                    setStartPosition([pos.longitude, pos.latitude])
                }
            })
        }
    }
    const onUserLocationUpdate = async ({ coords: { longitude, latitude } }) => {
        const currentPosition = [longitude, latitude]
        if (userStartPosition) {
            const resRoute = await getDirections(currentPosition, userStartPosition)
            setRoute(resRoute)
        }
        setUserHistoryCoords(prev => [...prev, currentPosition])
    }
    const onShowWay = () => {
        setShowRoute(el => !el)
    }
    const onStreetRoute = () => {
        setStreetRoute(el => !el)
    }

    const showPath = isShowRoute && route
    const showOriginRoute = showPath && !isStreetRoute
    const showStreetRoute = showPath && isStreetRoute
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
                    {userStartPosition
                        && <MapboxGL.PointAnnotation
                            coordinate={userStartPosition}
                            id='PointAnnotation-3'
                            title='This is a sample'
                        >
                            <MapboxGL.Callout title='This is a sample' />
                        </MapboxGL.PointAnnotation>
                    }

                    {
                        showOriginRoute && (
                            <MapboxGL.ShapeSource
                                id='source1'
                                lineMetrics={true}
                                shape={{
                                    type: 'Feature',
                                    geometry: {
                                        type: 'LineString',
                                        coordinates: userHistoryCoords,
                                    },
                                }}
                            >
                                <MapboxGL.LineLayer id='layer1' style={styles.lineLayer} />
                            </MapboxGL.ShapeSource>
                        )
                    }
                    {
                        showStreetRoute && (
                            <MapboxGL.ShapeSource id='routeSource' shape={route.geometry}>
                                <MapboxGL.LineLayer id='routeFill' style={styles.lineLayer} />
                            </MapboxGL.ShapeSource>

                        )
                    }

                </MapboxGL.MapView>
            </StyledView>
            <StyledView flexDirection='row'>
                <StyledButton
                    flex={1}
                    onPress={onShowWay}
                    paddingVertical='16px'
                    border='1px solid navy'
                    alignItems='center'
                >
                    <StyledText>{isShowRoute ? 'Hide route' : 'Show last way'}</StyledText>
                </StyledButton>
                {isShowRoute
                    ? <StyledButton
                        flex={1}
                        onPress={onStreetRoute}
                        paddingVertical='16px'
                        border='1px solid navy'
                        alignItems='center'
                    >
                        <StyledText>{isStreetRoute ? 'Origin route' : 'Street route'}</StyledText>
                    </StyledButton>
                    : null
                }
            </StyledView>
        </StyledView>
    );
}