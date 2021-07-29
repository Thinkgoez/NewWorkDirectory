import 'react-native-gesture-handler';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import BootSplash from "react-native-bootsplash";

let bootSplashLogo = require("./src/assets/bootsplash_logo.png");

const ArticlesPage = React.lazy(() => import('./src/pages/Articles'));
const CameraPage = React.lazy(() => import('./src/pages/Camera'));
const WebViewPage = React.lazy(() => import('./src/pages/WebViewPage'));
const FingerPrint = React.lazy(() => import('./src/pages/FingerPrint'));
// const FingerPrint = React.lazy(() => import('./src/pages/FingerPrint2'));
import { SummaryPage } from './src/pages/Summary';
import { Map } from './src/pages/Map'
import { Login } from './src/pages/Login'
// import Test from './src/pages/Test/test';

import configureStore from './src/redux/configureStore';
import { PendingView } from './src/components/common/SimpleComponents';
import { mapHeader } from './src/components/Map/header';

const Drawer = createDrawerNavigator();
const { store, persistor } = configureStore()
var width = Dimensions.get('window').width; //full width: ;
var height = Dimensions.get('window').height; //full height

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

const AppContent = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StyledSafeAreaView>
                    <Suspense fallback={<PendingView color='#00ff00'/>}>
                        <NavigationContainer>
                            <Drawer.Navigator
                                screenOptions={{ headerShown: false }}
                                initialRouteName='Articles in Carton'>
                                <Drawer.Screen name='Articles in Carton' component={ArticlesPage} />
                                <Drawer.Screen name='Summary' component={SummaryPage} />
                                {/* <Drawer.Screen name='test' component={Test} /> */}
                                <Drawer.Screen name='Camera' component={CameraPage} />
                                <Drawer.Screen name='Map' component={Map} options={{ header: mapHeader, headerShown: true }} />
                                <Drawer.Screen name='Login' component={Login} />
                                <Drawer.Screen name='WebViewPage' component={WebViewPage} />
                                <Drawer.Screen name='FingerPrint' component={FingerPrint} />
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

let App = () => {
    let [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
    let [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
    let opacity = useRef(new Animated.Value(1));
    let translateY = useRef(new Animated.Value(0));

    let init = async () => {
        // You can uncomment this line to add a delay on app startup
        // await fakeApiCallWithoutBadNetwork(3000);

        await BootSplash.hide();

        Animated.stagger(250, [
            Animated.spring(translateY.current, {
                useNativeDriver: true,
                toValue: -50,
            }),
            Animated.spring(translateY.current, {
                useNativeDriver: true,
                toValue: height,
            }),
        ]).start();

        Animated.timing(opacity.current, {
            useNativeDriver: true,
            toValue: 0,
            duration: 150,
            delay: 350,
        }).start(() => {
            setBootSplashIsVisible(false);
        });
    };

    useEffect(() => {
        bootSplashLogoIsLoaded && init();
    }, [bootSplashLogoIsLoaded]);

    return (
        <View style={styles.container}>
            {bootSplashIsVisible
                ? <Animated.View
                    style={[
                        styles.bootsplash,
                        { opacity: opacity.current },
                    ]}
                >
                    <Animated.Image
                        source={bootSplashLogo}
                        fadeDuration={0}
                        onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
                        resizeMode='stretch'
                        style={[
                            styles.logo,
                            { transform: [{ translateY: translateY.current }] },
                        ]}
                    />
                </Animated.View>

                : <AppContent />
            }
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    bootsplash: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        width,
    },
    logo: {
        aspectRatio: width / 100 
    },
});

export default App;