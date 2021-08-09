import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, StyleSheet } from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import BootSplash from 'react-native-bootsplash';
import * as Sentry from "@sentry/react-native";

import { StyledView } from './src/components/common/SimpleComponents';
import AppContent from './src/pages/AppContent';

const bootSplashLogo = require('./src/assets/bootsplash_logo.png');
const height = Dimensions.get('window').height;

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
setNativeExceptionHandler(() => {
    console.log('setNativeExceptionHandler');
});

// Sentry.init({
//   dsn: "https://353a8a3b40564bb5b095e8b2c167e1ae@o949599.ingest.sentry.io/5898355",
// });
// throw new Error("My first Sentry error!");

const App = () => {
    const [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
    const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);
    const opacity = useRef(new Animated.Value(1));
    const translateY = useRef(new Animated.Value(0));

    const init = async () => {
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
        <StyledView flex={1} justifyContent='center' alignItems='center' backgroundColor='#F5FCFF'>
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
        </StyledView>
    );
};


const styles = StyleSheet.create({
    bootsplash: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        width: 100,
    },
});

export default App;

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