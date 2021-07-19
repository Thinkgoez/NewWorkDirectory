import React from 'react'
import { useIsFocused } from '@react-navigation/core';

import { StyledText } from '../components/common/SimpleComponents'
import { CameraContent } from '../components/Camera/CameraContent';

export const CameraPage = () => {
    const isFocused = useIsFocused();

    if (isFocused === false) {
        return <StyledText>No access to camera</StyledText>;
    } else if (isFocused !== null && isFocused) {
        return <CameraContent />;
    } else {
        return null;
    }

}