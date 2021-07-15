// TODO: fix distance between color and size in item
import React from 'react';

import ArrowRightIcon from '../../../../assets/arrowRight.svg';
import {
  StyledButton,
  StyledView,
  StyledText,
} from '../../SimpleComponents'


const CartonItem = ({serialCode, count, onSelect}) => {
  return (
    <StyledButton
        flexDirection="row"
        justifyContent="space-between"
        paddingLeft="16px"
        paddingVertical='12px'
        paddingRight="4px"
        borderBottom='1px #c3c3c3'
        onPress={onSelect}
      >
      <StyledText fontSize='12px' fontWeight='bold'>{serialCode}</StyledText>

      <StyledView
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        width="128px">
        <StyledButton
          backgroundColor="#828282"
          width="104px"
          alignItems="center"
          justifyContent="center"
          borderRadius="30px">
          <StyledText color="#fff" fontWeight="bold">
            {count}
          </StyledText>
        </StyledButton>
        <ArrowRightIcon width="10px" height="10px" fill="#878282" />
      </StyledView>
    </StyledButton>
  );
};
export default CartonItem