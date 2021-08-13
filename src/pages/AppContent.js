import 'react-native-gesture-handler';
import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

const ArticlesPage = React.lazy(() => import('./Articles'));
const CameraPage = React.lazy(() => import('./Camera'));
const WebViewPage = React.lazy(() => import('./WebViewPage'));
const FingerPrint = React.lazy(() => import('./FingerPrint'));
const Map = React.lazy(() => import('./Map'));
const Login = React.lazy(() => import('./Login'));
const Summary = React.lazy(() => import('./Summary'));
const Chart = React.lazy(() => import('./Chart'));

import configureStore from '../redux/configureStore';
import { PendingView, StyledSafeAreaView } from '../components/common/SimpleComponents';
import { mapHeader } from '../components/Map/header';

const Drawer = createDrawerNavigator();
const { store, persistor } = configureStore()

const AppContent = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <StyledSafeAreaView height='100%' width='100%'>
                <Suspense fallback={<PendingView color='#00ff00' />}>
                    <NavigationContainer>
                        <Drawer.Navigator
                            screenOptions={{ headerShown: false }}
                            initialRouteName='Chart'>
                            <Drawer.Screen name='Articles in Carton' component={ArticlesPage} />
                            <Drawer.Screen name='Summary' component={Summary} />
                            <Drawer.Screen name='Camera' component={CameraPage} />
                            <Drawer.Screen name='Map' component={Map} options={{ header: mapHeader, headerShown: true }} />
                            <Drawer.Screen name='Login' component={Login} />
                            <Drawer.Screen name='WebViewPage' component={WebViewPage} />
                            <Drawer.Screen name='FingerPrint' component={FingerPrint} />
                            <Drawer.Screen name='Chart' component={Chart} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </Suspense>
            </StyledSafeAreaView>
        </PersistGate>
    </Provider>
)

export default AppContent;

// Total cleaning:
// echo "Cleaning all the things";
// watchman watch-del-all;
// rm -rf node_modules;
// rm -rf $TMPDIR/react-*
// rm -rf $TMPDIR/npm-*
// cd ios
// rm -rf Pods;
// rm -rf Podfile.lock;
// rm -rf build;
// npm cache clean --force
// pod cache clean --all
// cd ../android
// rm -rf build
// cd ..
// rm -rf ~/Library/Developer/Xcode/DerivedData

// echo "Installing things again";
// npm install;
// cd ios
// pod install
// cd ..;

// npm start -- --reset-cache;