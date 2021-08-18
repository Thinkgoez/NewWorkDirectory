import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { StyledText, StyledView } from "../SimpleComponents"

const InfoBlock = ({ text = '', color, fill, borderColor= 'primary' }) => {
    const theme = useContext(ThemeContext)
    return (
        <StyledView
            border={`2px solid ${theme[borderColor]}`}
            backgroundColor={fill ? borderColor : 'transparent'}
            borderRadius='10px'
            alignItems='center'
            paddingVertical='16px'
            marginHorizontal='8px'
        >
            <StyledText color={color} fontSIze='16px' fontWeight='bold'>{text}</StyledText>
        </StyledView>
    )
}

export default InfoBlock