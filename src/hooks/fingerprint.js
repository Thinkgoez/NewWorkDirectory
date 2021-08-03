import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

export const useFingerprint = ({ close, onSucces }) => {
    const [errorMessageLegacy, setErrorMessageLegacy] = useState(null)
    const [biometricLegacy, setBiometricLegacy] = useState(null)
    const description = useRef()

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
    return [errorMessageLegacy, biometricLegacy, description, requiresLegacyAuthentication]
}