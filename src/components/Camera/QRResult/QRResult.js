import React from 'react'
import { StyledText, StyledView } from '../../common/SimpleComponents'

export const QRResult = ({route, ...props}) => {
    // console.log('route', route)
    return(
        <StyledView>
            <StyledText>{route.params.data}</StyledText>
        </StyledView>
    )
}