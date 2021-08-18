import React, { useContext } from 'react'
import { ActivityIndicator, Platform } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { StyledView } from '.';

const PendingView = ({ size = 'large', color = (Platform.OS === 'android' && 'secondary'), ...props }) => {
    const theme = useContext(ThemeContext);
    return (
        <StyledView paddingBottom='32px' flex={1} justifyContent='center' alignItems='center'>
            <ActivityIndicator color={theme[color]} size={size} {...props} />
        </StyledView>
    )
}

export default PendingView