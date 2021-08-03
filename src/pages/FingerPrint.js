import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { StyledButton, StyledText, StyledView } from '../components/common/SimpleComponents';
import { FingerPrintScanner } from '../components/Fingerprint/FingerprintScanner';
import { Timer } from '../components/common/CombinationComponents';

const FingerPrint = () => {
    const [show, setShow] = useState(true)
    const [isTimer, setIsTimer] = useState(false)
    const { navigate } = useNavigation()

    const open = () => {
        setShow(true)
    }
    const close = (err) => {
        setShow(false)
        if (err.name === 'DeviceLocked') {
            setIsTimer(true)
        }
    }
    const handleTimerDone = () => {
        setIsTimer(false)
    }
    const handleSuccess = () => {
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully')
        setShow(false)
        navigate('Login')
    }
    return (
        <StyledView alignItems='center'>
            {show && <FingerPrintScanner close={close} onSucces={handleSuccess} />}
            <StyledButton
                onPress={open}
                marginVertical='50px'
                paddingVertical='20px'
                borderRadius='10px'
                border='1px solid #c9c9c9'
                width='100px'
                alignItems='center'
            ><StyledText>Try again</StyledText></StyledButton>
            {isTimer && <Timer onDone={handleTimerDone} />}
        </StyledView>

    )
}

export default FingerPrint