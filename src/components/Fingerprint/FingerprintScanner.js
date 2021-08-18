import React from 'react';
import { Dimensions } from 'react-native';

import ShakingText from './ShakingText';
import { FPImage, StyledText, StyledView } from '../common/SimpleComponents';
import { useFingerprint } from '../../hooks/fingerprint';

const { width } = Dimensions.get('window');

export const FingerPrintScanner = ({ close, onSucces }) => {
    const [errorMessageLegacy, biometricLegacy, description, requiresLegacyAuthentication] = useFingerprint({close, onSucces})

    const renderLegacy = () => {
        return (
            <StyledView position='absolute' top={0} bottom={0} left={0} right={0}
                backgroundColor='fingerPrintModalBG'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <StyledView
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    backgroundColor='secondary'
                    width={width * 0.8 + 'px'}
                >
                    <FPImage marginVertical='45px' />
                    <StyledText
                        color='secondary'
                        fontSize='22px'
                        marginTop='30px'
                        marginBottom='5px'
                    >
                        Biometric{'\n'}Authentication
                    </StyledText>
                    <ShakingText
                        ref={description}
                        error={!!errorMessageLegacy}>
                        {errorMessageLegacy || `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
                    </ShakingText>
                </StyledView>
            </StyledView>
        );
    }
    if (requiresLegacyAuthentication()) {
        return renderLegacy();
    }
    return <StyledView alignItems='center' justifyContent='center' flex={1}>
        <StyledText color='access'>Done</StyledText>
    </StyledView>
}