import React, { Fragment } from 'react';

import { StyledButton, StyledText, StyledView } from '../common/SimpleComponents';

export const SomeButton = ({ handleClick }) => {
    let Wrapper = handleClick ? StyledButton : StyledView
    let AdditionalWrapper = handleClick ? Fragment : StyledView
    // if(typeof handleClick === 'function'){
    //     Wrapper = StyledButton
    // }

    const functionDump = () => null

    return (
        <AdditionalWrapper>
            <Wrapper paddingVertical='8px' backgroundColor='#56ef8c' alignItems='center' onPress={handleClick ? handleClick : functionDump}>
                <StyledText>SomeText</StyledText>
            </Wrapper>
        </AdditionalWrapper>
    );
}