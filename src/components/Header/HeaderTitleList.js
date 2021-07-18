import React from 'react';
import { StyledView, StyledButton, StyledTitleText } from '../common/SimpleComponents';

export const HeaderTitleList = ({ title, right, left }) => {
    return (
        <StyledView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            height="40%"
            paddingHorizontal='4px'
            paddingVertical='8px'>
            {left && <StyledButton key={left.text} disabled={left.disabled}>
                <StyledTitleText color={left.color || '#0d81ff'}>
                    {left?.text || left}
                </StyledTitleText>
            </StyledButton>}
            {title && <StyledButton key={title.text} disabled={title.disabled}>
                <StyledTitleText color={title.disabled ? '#000' : title.color || '#0d81ff'}>
                    {title?.text || title}
                </StyledTitleText>
            </StyledButton>}
            {right && <StyledButton key={right.text} disabled={right.disabled}>
                <StyledTitleText color={right.color || '#0d81ff'}>
                    {right?.text || right}
                </StyledTitleText>
            </StyledButton>}

        </StyledView>
    );
};

