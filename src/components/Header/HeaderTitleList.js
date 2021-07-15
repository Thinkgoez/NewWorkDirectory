// FIX IT WITH HEADER.js

import React from 'react';
import styled from 'styled-components/native'
import {StyledView, StyledButton, StyledText} from '../common/SimpleComponents';

const defaultTitles = [
  {title: 'Cancel', pressable: true},
  {title: 'Articles in Carton', color: '#000'},
  {title: 'Confirm', pressable: true},
];

export const HeaderTitleList = ({title, right, left}) => {
  return (
    <StyledView
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="40%"
      paddingHorizontal='4px'
      paddingVertical='8px'>
        {right && <StyledButton key={right.text} disabled={right.disabled}>
          <TitleText color={right.color || '#0d81ff'}>
          {right?.text || right}
          </TitleText>
        </StyledButton>}
        {title && <StyledButton key={title.text} disabled={title.disabled}>
          <TitleText color={title.disabled ? '#000' : title.color || '#0d81ff'}>
            {title?.text || title}
          </TitleText>
        </StyledButton>}
        {left && <StyledButton key={left.text} disabled={left.disabled}>
          <TitleText color={left.color || '#0d81ff'}>
          {left?.text || left}
          </TitleText>
        </StyledButton>}
    </StyledView>
  );
};

const TitleText = styled(StyledText)`
  font-size:16px;
  font-weight: bold;
`