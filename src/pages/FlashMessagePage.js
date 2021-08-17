import React from 'react'
import { showMessage } from 'react-native-flash-message';

import { StyledButton, StyledText, StyledView } from '../components/common/SimpleComponents'

import BoxIcon from '../assets/box.svg'

const buttons = [
    {
        id: 1,
        message: 'Info message',
        type: 'info'
    },
    {
        id: 2,
        message: 'Info message',
        description: 'Message with some description',
        type: 'info'
    },
    {
        id: 3,
        message: 'success message',
        type: 'success'
    },
    {
        id: 4,
        message: 'warning message',
        type: 'warning'
    },
    {
        id: 5,
        message: 'danger message',
        type: 'danger'
    },
    {
        id: 6,
        message: 'Default message',
    },
    {
        id: 7,
        message: 'Custom message',
        description: 'Custom description, Custom description, Custom description',
        backgroundColor: 'purple',
        color: '#60f0a0',
        duration: 4000,
        position: 'center',
        titleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            lineHeight: 20
        },
        textStyle: {
            fontWeight: 'bold',
        },
        icon: {
            icon: 'warning',
            position: 'left',
        },
        renderFlashMessageIcon: (icon, style, customProps) => <BoxIcon style={style[0]} width={20} height={20} fill='#60f0a0' {...customProps} />
    },
    {
        id: 8,
        message: 'Info message',
        type: 'info',
        icon: {
            icon: 'success',
            position: 'right'
        },
        position: 'bottom'
    },
]

export default function FlashMessagePage() {
    return (
        <StyledView>
            <StyledText paddingVertical='16px' textAlign='center' fontSize='18px'>Hallo</StyledText>
            <StyledView flexDirection='row' flexWrap='wrap' justifyContent='space-around'>
                {buttons.map(({ id, ...message }) => {
                    const handler = () => {
                        showMessage(message)
                    }
                    return (
                        <StyledButton key={id} onPress={handler} paddingVertical='4px' paddingHorizontal='8px' backgroundColor='#eef' border='1px solid #0fc3ef' marginBottom='8px' borderRadius='5px'>
                            <StyledText>{message.message}</StyledText>
                        </StyledButton>
                    )
                })}
            </StyledView>
        </StyledView>
    )
}
