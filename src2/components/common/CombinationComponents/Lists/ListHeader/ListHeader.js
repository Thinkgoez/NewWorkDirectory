import React from 'react'
import styled from 'styled-components/native'
import { StyledText, StyledView } from "../../../SimpleComponents"

const ListHeader = ({items=[]}) => {
    return(
        <StyledView flexDirection='row' justifyContent='space-between' alignItems='center'
            paddingHorizontal='32px'
            paddingVertical='12px'
            borderBottom='1px #c3c3c3'
        >
            {items.map(el =>  <StyledHeaderText key={el}>{el}</StyledHeaderText>)}
        </StyledView>
    )
}

const StyledHeaderText = styled(StyledText)`
    color: #a7a7aa;
    text-transform: uppercase;
`
export default ListHeader
// #a7a7aa
// research how to add color to parent node, because now it works only with Text based components