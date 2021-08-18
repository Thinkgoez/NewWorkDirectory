import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { StyledView, StyledText } from '../common/SimpleComponents';

export const HeaderIcon = ({ Icon, text }) => {
    const theme = useContext(ThemeContext);
    return(
        <StyledView
            flexDirection={'row'}
            alignItems='center'
            justifyContent={'center'}>
            {Icon && <Icon fill={theme['primary']} />}
            {text && <StyledText fontSize='20px'>{text}</StyledText>}
        </StyledView>
    )
}
