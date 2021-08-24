import React from 'react'
import { useIsFocused } from '@react-navigation/core';

import { StyledText } from '../components/common/SimpleComponents'
import { Signature } from '../components/Signature/Signature';

const SignaturePage = () => {
    const isFocused = useIsFocused();

    if (isFocused === null) {
        return null
    }
    return (
        <>
            { isFocused ? <Signature /> : <StyledText>No access to camera</StyledText> }
        </>
    )
}

export default SignaturePage