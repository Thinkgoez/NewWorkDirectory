import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, StyleSheet } from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import BootSplash from 'react-native-bootsplash';
import I18n from 'react-native-i18n';

import en from './src/i18n/en'
import fr from './src/i18n/fr'
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
I18n.fallbacks = true;
I18n.locale = 'fr';
I18n.translations = { en, fr };

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