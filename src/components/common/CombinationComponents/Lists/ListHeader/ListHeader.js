import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { StyledText, StyledView } from '../../../SimpleComponents'

const ListHeader = ({items=[]}) => {
    const theme = useContext(ThemeContext)
    return(
        <StyledView flexDirection='row' justifyContent='space-between' alignItems='center'
            paddingHorizontal='32px'
            paddingVertical='12px'
            borderBottom={`1px ${theme['headerBORDER']}`}
        >
            {items.map(el =>  <StyledText textTransform='uppercase' color='listHeader' key={el}>{el}</StyledText>)}
        </StyledView>
    )
}

export default ListHeader