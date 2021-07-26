import 'react-native-gesture-handler';
import React, { Suspense } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

const ArticlesPage = React.lazy(() => import('./src/pages/Articles'));
const CameraPage = React.lazy(() => import('./src/pages/Camera'));
import { SummaryPage } from './src/pages/Summary';
import { Map } from './src/pages/Map'
import { Login } from './src/pages/Login'
// import Test from './src/pages/Test/test';

import configureStore from './src/redux/configureStore';
import { PendingView } from './src/components/common/SimpleComponents';
import { mapHeader } from './src/components/Map/header';

const Drawer = createDrawerNavigator();
const { store, persistor } = configureStore()

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        Alert.alert(
            'Unexpected error occurred',
            `Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
            We have reported this to our team ! Please close the app and start again!
            `,
            [{
                text: 'Close'
            }]
        );
    } else {
        console.log(e);
    }
};

setJSExceptionHandler(errorHandler, true);
setNativeExceptionHandler((errorString) => {
    console.log('setNativeExceptionHandler');
});

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StyledSafeAreaView>
                    <Suspense fallback={<PendingView />}>
                        <NavigationContainer>
                            <Drawer.Navigator
                                screenOptions={{ headerShown: false }}
                                initialRouteName='Map'>
                                <Drawer.Screen name='Articles in Carton' component={ArticlesPage} />
                                <Drawer.Screen name='Summary' component={SummaryPage} />
                                {/* <Drawer.Screen name='test' component={Test} /> */}
                                <Drawer.Screen name='Camera' component={CameraPage} />
                                <Drawer.Screen name='Map' component={Map} options={{header: mapHeader, headerShown: true}} />
                                <Drawer.Screen name='Login' component={Login}/>
                            </Drawer.Navigator>
                        </NavigationContainer>
                    </Suspense>
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
