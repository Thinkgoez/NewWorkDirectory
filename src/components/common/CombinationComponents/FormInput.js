import React from 'react'
import { StyledInput, StyledLabel, StyledText, StyledView } from '../SimpleComponents'

const CunstomInput = ({label, wrapperProps, error, SecureToggle, ...props}) => {
    return(
        <StyledView {...wrapperProps}>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledInput {...props}/>
            {error && <StyledText color='red' position='absolute' right='0'>{error}</StyledText>}
            {SecureToggle && SecureToggle()}
        </StyledView>
    )
}

export default CunstomInput