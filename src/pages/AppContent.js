import 'react-native-gesture-handler';
import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import I18n from 'react-native-i18n';

const ArticlesPage = React.lazy(() => import('./Articles'));
const CameraPage = React.lazy(() => import('./Camera'));
const WebViewPage = React.lazy(() => import('./WebViewPage'));
const FingerPrint = React.lazy(() => import('./FingerPrint'));
const Map = React.lazy(() => import('./Map'));
const Login = React.lazy(() => import('./Login'));
const Summary = React.lazy(() => import('./Summary'));

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
                            initialRouteName={'Articles in Carton'}>
                            <Drawer.Screen name={'Articles in Carton'} options={{title: I18n.t('pages.ArticlesInCarton.title')}} component={ArticlesPage} />
                            <Drawer.Screen name={'Summary'} options={{title: I18n.t('pages.Summary.title')}} component={Summary} />
                            <Drawer.Screen name={'Camera'} options={{title: I18n.t('pages.Camera.title')}} component={CameraPage} />
                            <Drawer.Screen name={'Map'} options={{title: I18n.t('pages.Map.title'), header: mapHeader, headerShown: true}} component={Map} />
                            <Drawer.Screen name={'Login'} options={{title: I18n.t('pages.Login.title')}} component={Login} />
                            <Drawer.Screen name={'FingerPrint'} options={{title: I18n.t('pages.FingerPrint.title')}} component={FingerPrint} />
                            <Drawer.Screen name={'WebViewPage'} options={{title: I18n.t('pages.WebViewPage.title')}} component={WebViewPage} />
                        </Drawer.Navigator>
                    </NavigationContainer>
                </Suspense>
            </StyledSafeAreaView>
        </PersistGate>
    </Provider>
)

export default AppContent;