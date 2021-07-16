import React from 'react'
import { useIsFocused } from '@react-navigation/core';

import { StyledText } from '../components/common/SimpleComponents'
import { CameraView } from '../components/Camera/CameraView';

export const Camera = () => {
    const isFocused = useIsFocused();

    if (isFocused === false) {
        return <StyledText>No access to camera</StyledText>;
    } else if (isFocused !== null && isFocused) {
        return <CameraView />;
    } else {
        return null;
    }

}