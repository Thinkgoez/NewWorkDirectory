import React from 'react';

import {StyledView, StyledButton, StyledText} from '../common/SimpleComponents';

const defaultTitles = [
  {title: 'Cancel', pressable: true},
  {title: 'Articles in Carton', color: '#000'},
  {title: 'Confirm', pressable: true},
];

export const HeaderTitleList = ({titles=defaultTitles}) => {
  return (
    <StyledView
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="30%"
      paddingHorizontal='4px'
      paddingBottom='8px'>
      {titles.map(item => (
        <StyledButton key={item.title} disabled={!item.pressable}>
          <StyledText
            color={item.color || '#0d81ff'}
            fontSize={'16px'}
            fontWeight={'bold'}>
            {item.title}
          </StyledText>
        </StyledButton>
      ))}
    </StyledView>
  );
};
