import React from 'react'
import { StyledText, StyledView } from "../SimpleComponents"

const InfoBlock = ({ text = '', color = '#000', fill, borderColor = '#000' }) => {
    return (
        <StyledView
            border={`2px solid ${borderColor}`}
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