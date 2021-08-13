import React from 'react'
import { useIsFocused } from '@react-navigation/core';
import I18n from 'react-native-i18n';

import { StyledText } from '../components/common/SimpleComponents'
import { CameraContent } from '../components/Camera/CameraContent';

const CameraPage = () => {
    const isFocused = useIsFocused();

    if (isFocused === false) {
        return <StyledText>{I18n.t('pages.Camera.fallBack')}</StyledText>;
    } else if (isFocused !== null && isFocused) {
        return <CameraContent />;
    } else {
        return null;
    }

}
export default CameraPage