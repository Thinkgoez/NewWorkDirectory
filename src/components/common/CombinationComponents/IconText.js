import React from 'react'
import {StyledText, StyledView} from '../SimpleComponents';

const IconText = ({Icon, text}) => (
  <StyledView flexDirection='row' justifyContent='space-between'>
    <Icon width='20px' height='20px' fill='#434141'/>
    <StyledText fontSize='12px' marginLeft='4px' color='#98989a' fontWeight='bold'>{text}</StyledText>
  </StyledView>
);
export default IconText;
