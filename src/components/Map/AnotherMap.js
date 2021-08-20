import React from 'react'
import { Dimensions, Platform } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps';

import { StyledText, StyledView } from '../common/SimpleComponents';

MapboxGL.setAccessToken('pk.eyJ1IjoidGhpbmtnb2V6IiwiYSI6ImNrc2s4bGd2ZjJsZXMyb28zZ2Q5bjRjNTQifQ.KzVzyQ6kO7H3THbRMFg7nw');
const WIDTH = Dimensions.get('screen').width
export const AnotherMap = () => {
    return (
        <StyledView flex={1} justifyContent='center' alignItems='center'>
            <StyledView width={WIDTH + 'px'} flex={1}>
                <MapboxGL.MapView
                    style={{ flex: 1 }}
                    logoEnabled={false}
                    attributionEnabled={Platform.OS === 'ios'}
                >
                    <MapboxGL.PointAnnotation
                        coordinate={[35.1257554, 47.8405622]}
                        id='PointAnnotation-1'
                        title='This is a sample'
                    >
                        <MapboxGL.Callout title="This is a sample"  />
                        
                    </MapboxGL.PointAnnotation>
                    <MapboxGL.PointAnnotation
                        coordinate={[34.1257554, 47.8405622]}
                        id='PointAnnotation-2'
                        title='This is a sample'
                    >
                        <MapboxGL.Callout title="This is a sample"  />
                        
                    </MapboxGL.PointAnnotation>
                    <MapboxGL.PointAnnotation
                        coordinate={[35.1257554, 47]}
                        id='PointAnnotation-3'
                        title='This is a sample'
                    >
                        <MapboxGL.Callout title="This is a sample"  />
                        
                    </MapboxGL.PointAnnotation>

                    {/* <MapboxGL.MarkerView coordinate={[37.1257554, 48.8405622]} children={<Anotation  />}/> */}
                </MapboxGL.MapView>
            </StyledView>
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