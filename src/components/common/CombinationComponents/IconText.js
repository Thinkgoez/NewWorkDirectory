import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components';
import { StyledText, StyledView } from '../SimpleComponents';

const IconText = ({ Icon, text, ...props }) => {
    const theme = useContext(ThemeContext);
    return (
        <StyledView flexDirection='row' justifyContent='space-between' {...props}>
            {Icon && <Icon width='20px' height='20px' fill={theme['iconTextFILL']} />}
            {text && <StyledText
                fontSize='12px'
                marginLeft='4px'
                color='iconText'
                fontWeight='bold'
                textTransform='uppercase'
            >{text}</StyledText>}
        </StyledView>
    )
}
export default IconText;
