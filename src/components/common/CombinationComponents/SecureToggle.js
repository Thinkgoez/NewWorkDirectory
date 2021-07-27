import React from 'react'

import Visible from '../../../assets/visible.svg'
import Invisible from '../../../assets/invisible.svg'
import { StyledButton } from '../SimpleComponents'

const SecureToggle = ({ isSecure, secureToggle }) => {
    return (
        <StyledButton onPress={secureToggle}
            position='absolute'
            bottom='20px'
            right='10px'
            alignItems='center'
            justifyContent='center'
        >
                {isSecure ? <Invisible width='20px' height='20px' fill='#b8b8b8'/> : <Visible width='20px' height='20px' fill='#434141'/>}
        </StyledButton>
    )
}

export default SecureToggle