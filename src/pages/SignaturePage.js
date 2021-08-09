import React from 'react'
import { useIsFocused } from '@react-navigation/core';

import { StyledText } from '../components/common/SimpleComponents'
import { Signature } from '../components/Signature/Signature';

const SignaturePage = () => {
    const isFocused = useIsFocused();

    if (isFocused === false) {
        return <StyledText>No access to camera</StyledText>;
    } else if (isFocused !== null && isFocused) {
        return <Signature />
    } else {
        return null;
    }
}

export default SignaturePage