import React from 'react';

import { StyledView } from '../common/SimpleComponents';
import { HeaderIconList } from './HeaderIconList'
import { HeaderTitleList } from './HeaderTitleList'

export const Header = React.memo(({ headerTitles: { title, leftText, rightText }, headerIcons: {center} }) => {
    return (
        <StyledView height='110px' borderBottom={'1px #c3c3c3'}>
            <HeaderIconList center={center}/>
            <HeaderTitleList title={title} left={leftText} right={rightText} />
        </StyledView>
    );
})