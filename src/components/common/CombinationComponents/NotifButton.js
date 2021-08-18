import React from 'react'
import { StyledButton, StyledText } from '../SimpleComponents';

const NotifButton = ({handlePress, text}) => {
    return (
        <StyledButton
            borderWidth='1px'
            borderColor='primary'
            marginVertical='5px'
            paddingVertical='5px'
            paddingHorizontal='8px'
            width='70%'
            backgroundColor='notifButtonBG'
            borderRadius='5px'
            onPress={handlePress}>
            <StyledText>{text}</StyledText>
        </StyledButton>
    )
}
export default NotifButton