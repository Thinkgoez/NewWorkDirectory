// Component dispalay passed Icon and title within touchableOpacity,
// was in App.js passed to creenOptions -> as headerRight and headerLeft
import React from 'react';

import {StyledText, StyledButton} from '../SimpleComponents';
import {HeaderIcon} from './HeaderIcon'

export const HeaderButton = ({
  title,
  Icon,
  handlePress,
  textIcon,
  alignText,
  padding,
  disablePressable,
  color='#0d81ff',
  flex,
  ...props
}) => {
  return (
    <StyledButton
      onPress={handlePress}
      width={'150px'}
      height={'100px'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={padding}
      disabled={disablePressable}
      flex={flex}
      padding={'18px 4px 15px'}
      >
      <HeaderIcon Icon={Icon} text={textIcon}/>
      <StyledText
        color={color}
        fontSize={'16px'}
        fontWeight={'bold'}
        alignSelf={alignText}>
        {title}
      </StyledText>
    </StyledButton>
  );
};