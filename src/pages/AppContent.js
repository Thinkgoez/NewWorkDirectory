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
const Chart = React.lazy(() => import('./Chart'));
const Notifications = React.lazy(() => import('./Notifications'));
const Settings = React.lazy(() => import('./Settings'));

import configureStore from '../redux/configureStore';
import { PendingView, StyledSafeAreaView } from '../components/common/SimpleComponents';
import { mapHeader } from '../components/Map/header';
import {
    renderContent, ArticlesIcon, SummaryIcon, NorificationsIcon,
    CameraIcon, MapIcon, WebViewIcon, FingerprintIcon,
    ChartIcon, SettingsIcon, LoginIcon
} from './renderDrawerIcons';

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
                                    initialRouteName='Articles in Carton'
                                    drawerContent={renderContent}
                                >
                                    <Drawer.Screen name='Articles in Carton' component={ArticlesPage} options={{ Icon: ArticlesIcon }} />
                                    <Drawer.Screen name='Summary' component={Summary} options={{ Icon: SummaryIcon }} />
                                    <Drawer.Screen name='Camera' component={CameraPage} options={{ Icon: CameraIcon }} />
                                    <Drawer.Screen name='Map' component={Map} options={{ header: mapHeader, headerShown: true, Icon: MapIcon }} />
                                    <Drawer.Screen name='Login' component={Login} options={{ Icon: LoginIcon }} />
                                    <Drawer.Screen name='WebViewPage' options={{ title: I18n.t('pages.WebViewPage.title'), Icon: WebViewIcon }} component={WebViewPage} />
                                    <Drawer.Screen name='FingerPrint' component={FingerPrint} options={{ Icon: FingerprintIcon }} />
                                    <Drawer.Screen name='Chart' component={Chart} options={{ Icon: ChartIcon }} />
                                    <Drawer.Screen name='Notifications' component={Notifications} options={{ Icon: NorificationsIcon }} />
                                    <Drawer.Screen name='Settings' component={Settings} options={{ Icon: SettingsIcon, bottom: true }} />
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