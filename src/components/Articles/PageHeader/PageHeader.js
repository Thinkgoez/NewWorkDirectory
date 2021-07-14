import React from 'react'

import { StyledButton } from '../../common/SimpleComponents'
import { IconText } from '../../common/CombinationComponents'
import BoxIcon from '../../../assets/box.svg'
import TagIcon from '../../../assets/tag.svg'

export const PageHeader = ({id, count}) => (
    <StyledButton flexDirection='row' justifyContent='space-between' paddingVertical='16px' paddingHorizontal='4px' backgroundColor='#e5e5e5'>
        <IconText text={id} Icon={BoxIcon}/>
        <IconText text={count} Icon={TagIcon}/>
    </StyledButton>
)