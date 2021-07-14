import React from 'react'
import styled from 'styled-components/native'
import { StyledText, StyledView } from "../../common/SimpleComponents"

export const ArticlesListHeader = () => {
    return(
        <StyledView flexDirection='row' justifyContent='space-between' alignItems='center'
            paddingHorizontal='32px'
            paddingVertical='12px'
            borderBottom='1px #c3c3c3'
        >
            <StyledHeaderText>Article</StyledHeaderText>
            <StyledHeaderText>act</StyledHeaderText>
        </StyledView>
    )
}

const StyledHeaderText = styled(StyledText)`
    color: #a7a7aa;
    text-transform: uppercase;
`

// #a7a7aa
// research how to add color to parent node