import React from 'react';

import {StyledView} from '../common/SimpleComponents';
import {HeaderIconList} from './HeaderIconList'
import {HeaderTitleList} from './HeaderTitleList'

export const Header = React.memo(() => {
  return (
    <StyledView height='100px' borderBottom={'1px #c3c3c3'}>
        <HeaderIconList />
        <HeaderTitleList />
    </StyledView>
  );
})