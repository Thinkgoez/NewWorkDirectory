import 'react-native-gesture-handler';
import React from 'react';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import { ArticlesPage } from './src/pages/Articles';
import { SummaryPage } from './src/pages/Summary';
import { CameraPage } from './src/pages/Camera';
import Test from './src/pages/Test/test'

import configureStore from './src/redux/configureStore';

const Drawer = createDrawerNavigator();
const { store, persistor } = configureStore()

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StyledSafeAreaView>
                    <NavigationContainer>
                        <Drawer.Navigator
                            screenOptions={{ headerShown: false }}
                            initialRouteName="Summary">
                            <Drawer.Screen name="Articles in Carton" component={ArticlesPage} />
                            <Drawer.Screen name="Summary" component={SummaryPage} />
                            <Drawer.Screen name="test" component={Test} />
                            <Drawer.Screen name="Camera" component={CameraPage} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </StyledSafeAreaView>
            </PersistGate>
        </Provider>
    );
};

const StyledSafeAreaView = styled.SafeAreaView`
    height: 100%;
    width: 100%;
`;

export default App;
