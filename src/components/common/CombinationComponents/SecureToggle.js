import React, { useContext } from 'react'

import Visible from '../../../assets/visible.svg'
import Invisible from '../../../assets/invisible.svg'
import { StyledButton } from '../SimpleComponents'
import { ThemeContext } from 'styled-components'

const SecureToggle = ({ isSecure, secureToggle }) => {
    const theme = useContext(ThemeContext)
    return (
        <StyledButton onPress={secureToggle}
            position='absolute'
            bottom='20px'
            right='10px'
            alignItems='center'
            justifyContent='center'
        >
                {isSecure ? <Invisible width='20px' height='20px' fill={theme['loginPointBG']}/> : <Visible width='20px' height='20px' fill={theme['iconTextFILL']}/>}
        </StyledButton>
    )
}

export default SecureToggle