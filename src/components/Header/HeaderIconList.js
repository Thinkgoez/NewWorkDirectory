import React from 'react';

import {StyledView, StyledButton} from '../common/SimpleComponents'

import SignalIcon from '../../assets/signal.svg'
import CloudIcon from '../../assets/cloud.svg'
import BluetoothIcon from '../../assets/bluetooth.svg'

import {HeaderIcon} from './HeaderIcon'

const Bluetooth = ({...props}) => <BluetoothIcon width={50} height={35} {...props}/>
const Signal = ({...props}) => <SignalIcon width={40} height={40} {...props}/>
const Cloud = ({...props}) => <CloudIcon width={45} height={45} {...props}/>

export const HeaderIconList = () => (
  <StyledView
    flexDirection='row'
    justifyContent='space-between'
    alignItems='center'
    width='100%'
    height='70%'
  >
    <StyledButton flex='1'><HeaderIcon Icon={Bluetooth} text={'100%'}/></StyledButton>
    <StyledButton flex='2'><HeaderIcon Icon={Signal}/></StyledButton>
    <StyledButton flex='1'><HeaderIcon Icon={Cloud}/></StyledButton>
  </StyledView>
)















































const e = {
  0: {
    insets: {bottom: 0, left: 0, right: 0, top: 0},
    layout: {height: 659.4285888671875, width: 411.4285583496094},
    mode: 'screen',
    navigation: {
      addListener: [Function],
      canGoBack: [Function],
      dangerouslyGetParent: [Function],
      dangerouslyGetState: [Function],
      dispatch: [Function],
      goBack: [Function],
      isFocused: [Function],
      navigate: [Function],
      pop: [Function],
      popToTop: [Function],
      push: [Function],
      removeListener: [Function],
      replace: [Function],
      reset: [Function],
      setOptions: [Function],
      setParams: [Function],
    },
    previous: undefined,
    scene: {
      __memo: [Array],
      descriptor: [Object],
      progress: [Object],
      route: [Object],
    },
    styleInterpolator: [Function],
  },
};
