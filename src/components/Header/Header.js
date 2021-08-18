import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { StyledView } from '../common/SimpleComponents';
import { HeaderIconList } from './HeaderIconList'
import { HeaderTitleList } from './HeaderTitleList'

export const Header = React.memo(({ headerTitles: { title, leftText, rightText }, headerIcons: {center} }) => {
    const theme = useContext(ThemeContext);
    return (
        <StyledView borderBottom={`1px ${theme['headerBORDER']}`}>
            <HeaderIconList center={center}/>
            <HeaderTitleList title={title} left={leftText} right={rightText} />
        </StyledView>
    );
})