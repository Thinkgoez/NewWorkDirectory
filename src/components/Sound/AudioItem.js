import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native'
import { useDispatch } from 'react-redux';

import { StyledButton, StyledText, StyledView } from '../common/SimpleComponents';
import { removeAudioItem } from '../../redux/actions/audioActions';
import { useAudio } from '../../hooks/audio'

import PlayIcon from '../../assets/play.svg'
import PauseIcon from '../../assets/pause.svg'
import RemoveIcon from '../../assets/delete.svg'

const gifColors = [
    { keypath: 'path1', color: '#F00000' },
    { keypath: 'path2', color: '#FF000F' },
    { keypath: 'path3', color: '#4f3df5' },
    { keypath: 'path4', color: '#f5e33d' },
    { keypath: 'path5', color: '#4fab4f' },
    { keypath: 'path6', color: '#00FF44' },
    { keypath: 'path7', color: '#4f3df5' },
]

export const AudioItem = ({ audioInfo }) => {
    const dispatch = useDispatch()
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
    const handleRemove = () => {
        dispatch(removeAudioItem(audioInfo.id, audioInfo.url))
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
            <StyledView flexDirection='row' alignItems={isOpen ? 'flex-start' : 'center'} justifyContent='space-between'>
                <StyledButton onPress={handleRemove} marginRight='15px'>
                    <RemoveIcon fill='#f53d3d' width={20} height={20} />
                </StyledButton>
                <StyledText
                    flex={1}
                    fontSize='14px'
                    fontWeight='bold'
                    textAlign='center'
                    width='80%'
                    paddingBottom='10px'
                >{audioInfo.title}</StyledText>
                {isOpen
                    ? <StyledLottieView ref={gifRef} source={require('../../assets/sound.json')} colorFilters={gifColors} />
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
                    </StyledView>
                    <StyledView flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <StyledButton width='25px' height='25px' backgroundColor='#000' onPress={onReset} borderRadius='2px' alignSelf='flex-end' marginRight='15px' />
                        <TouchableWithoutFeedback onPress={handlePress}><StyledView flex={1} marginRight='20px' onLayout={onLayoutProgress} height='7px'><Progress.Bar progress={progress} height={7} width={null} /></StyledView></TouchableWithoutFeedback>
                        <StyledButton
                            onPress={!isPlaying ? onPlay : onPause}
                            alignItems='center' justifyContent='center'
                        >
                            {!isPlaying ? <PlayIcon width={30} height={30} fill='#000' /> : <PauseIcon width={30} height={30} fill='#000' />}
                        </StyledButton>
                    </StyledView>
                </>
            }
        </StyledView>
    );
}
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