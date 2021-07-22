import React from 'react';
import {StyledView, StyledText} from '../common/SimpleComponents';

export const HeaderIcon = ({Icon, text}) => (
  <StyledView
    flexDirection={'row'}
    alignItems="center"
    justifyContent={'center'}>
    {Icon && <Icon fill="#000" />}
    {text && <StyledText fontSize="20px">{text}</StyledText>}
  </StyledView>
);
