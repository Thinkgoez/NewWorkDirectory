import React from 'react'
import {StyledText, StyledView} from '../SimpleComponents';

const IconText = ({Icon, text, ...props}) => (
  <StyledView flexDirection='row' justifyContent='space-between' {...props}>
    {Icon && <Icon width='20px' height='20px' fill='#434141'/>}
    {text && <StyledText
        fontSize='12px'
        marginLeft='4px'
        color='#98989a'
        fontWeight='bold'
        textTransform='uppercase'
      >{text}</StyledText>}
  </StyledView>
);
export default IconText;
