import React from 'react';
import { StyledView, StyledButton, StyledTitleText } from '../common/SimpleComponents';

export const HeaderTitleList = ({ title, right, left }) => {
    return (
        <StyledView
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
            paddingHorizontal='4px'
            paddingVertical='8px'>
            {left && <StyledButton key={left.text} disabled={left.disabled}>
                <StyledTitleText color={left.color || 'link'}>
                    {left?.text || left}
                </StyledTitleText>
            </StyledButton>}
            {title && <StyledButton key={title.text} disabled={title.disabled}>
                <StyledTitleText color={title.disabled ? 'primary' : title.color || 'link'}>
                    {title?.text || title}
                </StyledTitleText>
            </StyledButton>}
            {right && <StyledButton key={right.text} disabled={right.disabled}>
                <StyledTitleText color={right.color || 'link'}>
                    {right?.text || right}
                </StyledTitleText>
            </StyledButton>}

        </StyledView>
    );
};

