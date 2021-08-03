import React from 'react'

import { StyledView } from '../../common/SimpleComponents'
import { IconText } from '../../common/CombinationComponents'

export const PageHeader = ({ id, items }) => (
    <StyledView flexDirection='row' justifyContent='space-between' paddingVertical='16px' paddingHorizontal='4px' backgroundColor='#e5e5e5'>
        {id !== undefined && <IconText flex={4} text={id} />}
        <StyledView flexDirection='row' justifyContent='space-between' flex={1} paddingRight={id ? '16px' : '0'}>
            {items.map(item => <IconText key={item.id} text={item.text} Icon={item.icon} />)}
        </StyledView>
    </StyledView>
)