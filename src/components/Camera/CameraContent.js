import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import { StyledView } from "../common/SimpleComponents"
import { CameraScreen } from './CameraPage/CameraScreen';
import { PhotoEditorSdk } from './PhotoEditorSdk/PhotoEditorSdk';

const Stack = createStackNavigator()

export const CameraContent = () => {

    return (
        <StyledView backgroundColor='#efeff0' flex={1} borderRadius='5px'>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Camera" component={CameraScreen} />
                <Stack.Screen name="Canvas" component={PhotoEditorSdk} />
            </Stack.Navigator>
        </StyledView>
    );
}