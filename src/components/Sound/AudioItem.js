import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native'

import { StyledButton, StyledText, StyledView } from '../common/SimpleComponents';
import { useAudio } from '../../hooks/audio'

export const AudioItem = ({ audioInfo }) => {
    const [progressWidth, setProgressWidth] = useState(0)

    const { onReset, onPlay, onPause, onLoad, onRewind, progress, isPlaying, isOpen, gifRef } = useAudio(audioInfo)

    const handlePress = ({ nativeEvent }) => {
        const { locationX } = nativeEvent
        const newAudioPos = progressWidth / locationX
        onRewind(newAudioPos)
    }
    const onLayoutProgress = ({ nativeEvent: { layout } }) => {
        setProgressWidth(layout.width)
    }
    return (
        <StyledView
            position='relative'
            paddingHorizontal='20px'
            paddingBottom='10px'
            paddingTop='20px'
            borderBottom='1px rgb(210,210,210)'
            alignSelf='stretch'
        >
            <StyledView flexDirection='row' alignItems='center' justifyContent='space-between'>
                <StyledText
                    flex={1}
                    fontSize='14px'
                    fontWeight='bold'
                    textAlign='center'
                    width='80%'
                    paddingBottom='10px'
                >{audioInfo.title}</StyledText>
                {isOpen
                    ? <StyledLottieView ref={gifRef} source={require('../../assets/sound.json')} />
                    : <PlayButton onPress={onLoad} />
                }
            </StyledView>
            {isOpen
                &&
                <>
                    <StyledView
                        flexDirection='row'
                        alignItems='center'
                        marginBottom='8px'
                    >
                        {/* <PlayButton onPress={onPlay} disabled={isPlaying}/> */}
                        <StyledButton onPress={!isPlaying ? onPlay : onPause} marginRight='10px'>
                            <StyledText
                                fontSize='24px'
                                backgroundColor='rgba(220,220,220,1)'
                                borderRadius='4px'
                                borderWidth='1px'
                                borderColor='rgba(80,80,80,0.5)'
                                overflow='hidden'
                                paddingVertical='2px'
                                paddingHorizontal='7px'
                            >{!isPlaying ? '\u25B6' : '='}</StyledText>
                        </StyledButton>
                    </StyledView>
                    <StyledView flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <TouchableWithoutFeedback onPress={handlePress}><StyledView flex={1} marginRight='20px' onLayout={onLayoutProgress} height='7px'><Progress.Bar progress={progress} height={7} width={null} /></StyledView></TouchableWithoutFeedback>
                        <StyledButton width='20px' height='20px' backgroundColor='#000' onPress={onReset} borderRadius='2px' alignSelf='flex-end' />
                    </StyledView>
                </>
            }
        </StyledView>
    );
}
// playing: '\u25B6',
// pause: '\u23F8'
const StyledLottieView = styled(LottieView)`
    position: relative;
    width: 25px;
    height: 25px;
`

const PlayButton = ({ onPress, disabled }) => (
    <StyledButton onPress={onPress} marginRight='10px' disabled={disabled} backgroundColor={disabled ? '#ccc' : 'transparent'}>
        <StyledText
            fontSize='16px'
            backgroundColor='rgba(220,220,220,1)'
            borderRadius='4px'
            borderWidth='1px'
            borderColor='rgba(80,80,80,0.5)'
            overflow='hidden'
            paddingVertical='7px'
            paddingHorizontal='7px'
        >Play</StyledText>
    </StyledButton>
)