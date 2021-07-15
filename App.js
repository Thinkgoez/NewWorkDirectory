import 'react-native-gesture-handler';
import React from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Articles } from './src/pages/Articles';
import { Summary } from './src/pages/Summary';
import Test from './src/components/common/CombinationComponents/ListItems/test'

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <StyledSafeAreaView>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Summary">
                    <Drawer.Screen name="Articles in Carton" component={Articles} />
                    <Drawer.Screen name="Summary" component={Summary} />
                    <Drawer.Screen name="test" component={Test} />
                </Drawer.Navigator>
            </NavigationContainer>
        </StyledSafeAreaView>
    );
};

const StyledSafeAreaView = styled.SafeAreaView`
    height: 100%;
    width: 100%;
`;

export default App;
