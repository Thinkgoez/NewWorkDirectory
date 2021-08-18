import 'react-native-gesture-handler';
import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import I18n from 'react-native-i18n';
import { NotifierWrapper } from 'react-native-notifier';
import { ThemeProvider } from 'styled-components';

const ArticlesPage = React.lazy(() => import('./Articles'));
const Summary = React.lazy(() => import('./Summary'));
const CameraPage = React.lazy(() => import('./Camera'));
const Map = React.lazy(() => import('./Map'));
const Login = React.lazy(() => import('./Login'));
const WebViewPage = React.lazy(() => import('./WebViewPage'));
const FingerPrint = React.lazy(() => import('./FingerPrint'));
const Chart = React.lazy(() => import('./Chart'));
const Notifications = React.lazy(() => import('./Notifications'));

import configureStore from '../redux/configureStore';
import { PendingView, StyledSafeAreaView } from '../components/common/SimpleComponents';
import { mapHeader } from '../components/Map/header';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();
const { store, persistor } = configureStore()

const standartTheme = {
    transparent: 'transparent',
    access: 'green',
    link: '#0d81ff',
    primary: '#000',
    secondary: '#fff',
    loaderColor: 'green',
    headerBORDER: '#c3c3c3',
    headerIListBORDER: '#9d9d9d',
    pageHeaderBG: '#e5e5e5',
    articlesItemName: '#b6abab',
    articlesCountButtonBG: '#209652',
    articleItemImgBORDER: '#dbdbdb',
    // articleItemImgBORDER: 'firebrick',
    arrowRightFILL: '#878282',
    iconTextFILL: '#434141',
    swipableRightBG: '#fe3b30',
    iconText: '#98989a',
    listHeader: '#a7a7aa',
    loginButton: '#dfe6e9',
    loginNotifTitle: '#ffc7c7',
    loginError: 'red',
    loginNotifDesc: '#faa5a5',
    loginInputBORDER: '#e2e2e3',
    loginLogoBG: '#ed993f',
    loginPointBG: '#b8b8b8',
    loginNotifBG: '#f54242',
    label: '#b9b9b9',
    webView: '#ebe834',
    webViewBG: '#345678',
    infoBlock: '#003556',
    infoBlockErrFILLBORDER: '#b51145',
    cartonsCountButtonBG: '#828282',
    summaryContentBG: '#efeff0',
    cameraFlash: '#fff',
    cameraFlashModesBG: 'rgba(0,0,0,0.3)',
    cameraFlashModeBG: '#fff',
    cameraFlashModeActiveBG: '#8a8a8a',
    cameraSnapBG: '#fff',
    mapCalloutBG: '#988fac',
    mapPinColorFILL: '#c934eb',
    fingerPrintModalBG: 'rgba(0, 164, 222, 0.9)',
    figerprintBtnBORDER: '#c9c9c9',
    chartPageBG: '#c9c9c9',
    chartBORDER: '#c0c0c0',
    chartBG: '#f0f0c0',
    chartMarkerFILL: '#f030c0',
    chartBarFILL: '#c0e5fe',
    chartMarker: '#fff',
    notificationPageBG: '#f5fcff',
    notifButtonBG: '#ddd',
}
const unstandartTheme = {
    transparent: 'transparent',
    access: 'red',
    link: 'blueviolet', //'aliceblue',
    primary: 'blue',
    secondary: 'aliceblue',
    loaderColor: 'green',
    headerBORDER: 'darkkhaki',
    headerIListBORDER: '#9d9d9d',
    articlesItemName: '#808080',
    articlesCountButtonBG: 'darkgoldenrod',
    articleItemImgBORDER: 'firebrick',
    arrowRightFILL: '#878282',
    iconTextFILL: 'coral',
    iconText: 'crimson',
    swipableRightBG: 'darkred',
    listHeader: '#a7a7aa',
    pageHeaderBG: 'lightblue',
    loginButton: '#dfe6e9',
    loginNotifTitle: '#ffc7c7',
    loginError: 'rebeccapurple',
    loginNotifDesc: '#faa5a5',
    loginInputBORDER: 'sandybrown',
    loginLogoBG: 'plum',
    loginPointBG: 'sandybrown',
    loginNotifBG: '#f54242',
    webView: '#ebe834',
    infoBlock: 'peru',
    infoBlockErrFILLBORDER: 'tomato',
    label: '#b9b9b9',
    cartonsCountButtonBG: '#828282',
    summaryContentBG: 'maroon',
    cameraFlash: 'navy',
    cameraFlashModesBG: 'rgba(46, 139, 87, .4)',
    cameraFlashModeBG: 'lightgoldenrodyellow',
    cameraFlashModeActiveBG: 'slateblue',
    cameraSnapBG: 'lightgoldenrodyellow',
    cameraSnap: 'magenta',
    mapCalloutBG: '#988fac',
    mapPinColorFILL: '#c934eb',
    webViewBG: '#345678',
    fingerPrintModalBG: 'rgba(0, 164, 222, 0.9)',
    chartPageBG: '#c9c9c9',
    notificationPageBG: '#f5fcff',
    figerprintBtnBORDER: '#c9c9c9',
    chartBORDER: '#c0c0c0',
    chartBG: '#f0f0c0',
    chartMarkerFILL: '#f030c0',
    chartBarFILL: '#c0e5fe',
    chartMarker: '#fff',
    notifButtonBG: 'seashell',
}

const AppContent = () => {
    return (
        <ThemeProvider theme={unstandartTheme}>
            <NotifierWrapper>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <StyledSafeAreaView height='100%' width='100%'>
                            <Suspense fallback={<PendingView color='loaderColor' />}>
                                <NavigationContainer>
                                    <Drawer.Navigator
                                        screenOptions={{ headerShown: false }}
                                        drawerStyle={styles.drawer}
                                        initialRouteName='Articles in Carton'>
                                        <Drawer.Screen name='Articles in Carton' component={ArticlesPage} />
                                        <Drawer.Screen name='Summary' component={Summary} />
                                        <Drawer.Screen name='Camera' component={CameraPage} />
                                        <Drawer.Screen name='Map' component={Map} options={{ header: mapHeader, headerShown: true }} />
                                        <Drawer.Screen name='Login' component={Login} />
                                        <Drawer.Screen name='WebViewPage' options={{ title: I18n.t('pages.WebViewPage.title') }} component={WebViewPage} />
                                        <Drawer.Screen name='FingerPrint' component={FingerPrint} />
                                        <Drawer.Screen name='Chart' component={Chart} />
                                        <Drawer.Screen name='Notifications' component={Notifications} />
                                    </Drawer.Navigator>
                                </NavigationContainer>
                            </Suspense>
                        </StyledSafeAreaView>
                    </PersistGate>
                </Provider>
            </NotifierWrapper>
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: 'peachpuff'
    }
})

export default AppContent;