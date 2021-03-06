import React from 'react'
import { StyledText } from '.'

const Label = ({children, ...props}) => <StyledText color='#b9b9b9' textTransform='uppercase' fontSize='13px' {...props} >{children}</StyledText>

export default Label