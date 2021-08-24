import 'react-native-gesture-handler';
import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import I18n from 'react-native-i18n';
import { NotifierWrapper } from 'react-native-notifier';

const ArticlesPage = React.lazy(() => import('./Articles'));
const CameraPage = React.lazy(() => import('./Camera'));
const WebViewPage = React.lazy(() => import('./WebViewPage'));
const FingerPrint = React.lazy(() => import('./FingerPrint'));
const Map = React.lazy(() => import('./Map'));
const Login = React.lazy(() => import('./Login'));
const Summary = React.lazy(() => import('./Summary'));
const SoundPage = React.lazy(() => import('./SoundPage'));
const SignaturePage = React.lazy(() => import('./SignaturePage'));
const ModalPage = React.lazy(() => import('./ModalPage'));
const Chart = React.lazy(() => import('./Chart'));
const Notifications = React.lazy(() => import('./Notifications'));

import configureStore from '../redux/configureStore';
import { PendingView, StyledSafeAreaView } from '../components/common/SimpleComponents';
import { mapHeader } from '../components/Map/header';

const Drawer = createDrawerNavigator();
const { store, persistor } = configureStore()

const AppContent = () => {
    return (
        <NotifierWrapper>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <StyledSafeAreaView height='100%' width='100%'>
                        <Suspense fallback={<PendingView color='#00ff00' />}>
                            <NavigationContainer>
                                <Drawer.Navigator
                                    screenOptions={{ headerShown: false }}
                                    initialRouteName='Articles in Carton'>
                                    <Drawer.Screen name='Articles in Carton' component={ArticlesPage} />
                                    <Drawer.Screen name='Summary' component={Summary} />
                                    <Drawer.Screen name='Camera' component={CameraPage} />
                                    <Drawer.Screen name='Map' component={Map} options={{ header: mapHeader, headerShown: true }} />
                                    <Drawer.Screen name='Login' component={Login} />
                                    <Drawer.Screen name={'WebViewPage'} options={{title: I18n.t('pages.WebViewPage.title')}} component={WebViewPage} />
                                    <Drawer.Screen name='FingerPrint' component={FingerPrint} />
                                    <Drawer.Screen name='Chart' component={Chart} />
                                    <Drawer.Screen name='Notifications' component={Notifications} />
                                    <Drawer.Screen name='Modal' component={ModalPage} />
                                    <Drawer.Screen name='Signature' component={SignaturePage} />
                                    <Drawer.Screen name='SoundPage' component={SoundPage} />
                                </Drawer.Navigator>
                            </NavigationContainer>
                        </Suspense>
                    </StyledSafeAreaView>
                </PersistGate>
            </Provider>
        </NotifierWrapper>
    )
}

export default AppContent;