import React from 'react';

import { StyledView, StyledButton } from '../common/SimpleComponents'
import { BluetoothIcon, CloudIcon, SignalIcon } from './HeaderIcons';
import { HeaderIcon } from './HeaderIcon'

export const HeaderIconList = ({center}) => (
    <StyledView
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        borderBottom='1px #d9d9d9'
        width='100%'
        paddingVertical='4px'
    >
        <StyledButton flex='1'><HeaderIcon Icon={BluetoothIcon} text={'100%'} /></StyledButton>
        <StyledButton onPress={center.handleClick} flex='2'><HeaderIcon Icon={SignalIcon} /></StyledButton>
        <StyledButton flex='1'><HeaderIcon Icon={CloudIcon} /></StyledButton>
    </StyledView>
)