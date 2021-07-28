import React, { useEffect, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import ShakingText from './ShakingText';
import { FPImage, StyledText, StyledView } from '../common/SimpleComponents';

const { width } = Dimensions.get('window');

export const FingerPrintScanner = ({ close, onSucces }) => {
    const [errorMessageLegacy, setErrorMessageLegacy] = useState()
    const [biometricLegacy, setBiometricLegacy] = useState()
    let description = null

    useEffect(() => {
        authRequest()
        return () => {
            FingerprintScanner.release();
        }
    }, [])

    const authRequest = () => {
        if (requiresLegacyAuthentication()) {
            authLegacy();
        } else {
            authCurrent();
        }
    }

    const requiresLegacyAuthentication = () => {
        return Platform.OS === 'android' && Platform.Version < 23;

    }
    const authCurrent = () => {
        FingerprintScanner
            .authenticate(Platform.select({ ios: { description: 'Log in with Biometrics' }, android: { title: 'Log in with Biometrics' } }))
            .then(() => {
                onSucces()
            })
            .catch(close);
    }
    const authLegacy = () => {
        FingerprintScanner
            .authenticate({ onAttempt: handleAuthenticationAttemptedLegacy })
            .then(() => {
                onSucces()
            })
            .catch((error) => {
                setErrorMessageLegacy(error.message)
                setBiometricLegacy(error.biometric)
                description.shake();
            });
    }

    const handleAuthenticationAttemptedLegacy = (error) => {
        setErrorMessageLegacy(error.message);
        description.shake();
    };

    const renderLegacy = () => {
        return (
            <StyledView position='absolute' top={0} bottom={0} left={0} right={0}
                backgroundColor='rgba(0, 164, 222, 0.9)'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <StyledView
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    backgroundColor='#ffffff'
                    width={width * 0.8 + 'px'}
                >
                    <FPImage marginVertical='45px' />
                    <StyledText
                        color='#ffffff'
                        fontSize='22px'
                        marginTop='30px'
                        marginBottom='5px'
                    >
                        Biometric{'\n'}Authentication
                    </StyledText>
                    <ShakingText
                        ref={(instance) => { description = instance; }}
                        error={!!errorMessageLegacy}>
                        {errorMessageLegacy || `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
                    </ShakingText>
                    <StyledButton
                        paddingVertical='20px'
                        paddingHorizontal='20px'
                    >
                        <StyledText
                            color='#8fbc5a'
                            fontSize='15px'
                            fontWeight='bold'
                        >
                            BACK TO MAIN
                        </StyledText>
                    </StyledButton>
                </StyledView>
            </StyledView>
        );
    }
    if (requiresLegacyAuthentication()) {
        return renderLegacy();
    }
    return <StyledView alignItems='center' justifyContent='center' flex={1}>
        <StyledText color='green'>Done</StyledText>
    </StyledView>
}