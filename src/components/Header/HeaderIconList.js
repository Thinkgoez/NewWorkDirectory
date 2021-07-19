import React from 'react';

import { StyledView, StyledButton } from '../common/SimpleComponents'

import SignalIcon from '../../assets/signal.svg'
import CloudIcon from '../../assets/cloud.svg'
import BluetoothIcon from '../../assets/bluetooth.svg'

import { HeaderIcon } from './HeaderIcon'

const Bluetooth = ({ ...props }) => <BluetoothIcon width={50} height={35} {...props} />
const Signal = ({ ...props }) => <SignalIcon width={40} height={40} {...props} />
const Cloud = ({ ...props }) => <CloudIcon width={45} height={45} {...props} />

export const HeaderIconList = ({center}) => (
    <StyledView
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        borderBottom='1px #d9d9d9'
        width='100%'
        height='60%'
    >
        <StyledButton flex='1'><HeaderIcon Icon={Bluetooth} text={'100%'} /></StyledButton>
        <StyledButton onPress={center.handleClick} flex='2'><HeaderIcon Icon={Signal} /></StyledButton>
        <StyledButton flex='1'><HeaderIcon Icon={Cloud} /></StyledButton>
    </StyledView>
)