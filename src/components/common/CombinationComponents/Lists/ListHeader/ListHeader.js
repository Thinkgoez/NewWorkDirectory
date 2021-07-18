import React from 'react'
import { StyledText, StyledView } from "../../../SimpleComponents"

const ListHeader = ({items=[]}) => {
    return(
        <StyledView flexDirection='row' justifyContent='space-between' alignItems='center'
            paddingHorizontal='32px'
            paddingVertical='12px'
            borderBottom='1px #c3c3c3'
        >
            {items.map(el =>  <StyledText textTransform='uppercase' color='#a7a7aa' key={el}>{el}</StyledText>)}
        </StyledView>
    )
}

export default ListHeader