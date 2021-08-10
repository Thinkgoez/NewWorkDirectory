import React, { useState } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import * as Progress from 'react-native-progress';

import { StyledButton, StyledText, StyledView, StyledWithoutFeedback } from '../components/common/SimpleComponents'
import { useAudio } from '../hooks/audio';

const AudioItem = ({ audioInfo }) => {
    const [progressWidth, setProgressWidth] = useState(0)

    const { onReset, onPlay, onPause, onLoad, onRewind, progress, status, isLoaded } = useAudio(audioInfo)

    const handlePress = ({ nativeEvent }) => {
        const { locationX } = nativeEvent
        const newAudioPos = progressWidth / locationX
        onRewind(newAudioPos)
    }
    const onLayoutProgress = ({ nativeEvent: { layout } }) => {
        console.log('onLayoutProgress', layout)
        setProgressWidth(layout.width)
    }
    return (
        <StyledView
            alignItems='center'
            paddingVertical='10px'
            paddingHorizontal='10px'
            borderTop='1px rgb(180,180,180)'
            borderBottom='1px rgb(230,230,230)'
        >
            <StyledView flexDirection='row' alignItems='center' justifyContent='space-between' alignSelf='stretch'>
                <StyledText
                    flex={1}
                    fontSize='20px'
                    fontWeight='bold'
                    paddingHorizontal='20px'
                    paddingBottom='20px'
                    paddingTop='30px'
                    textAlign='center'
                >{audioInfo.title}</StyledText>
                {status
                    ? <StyledText
                        paddingHorizontal='10px'
                        fontSize='20px'
                    >{resultIcons[status] || ''}</StyledText>
                    : null
                }
                {!isLoaded && <PlayButton onPress={onLoad} />}
            </StyledView>

            {isLoaded
                &&
                <>
                    <StyledView
                        flexDirection='row'
                        alignItems='center'
                        alignSelf='stretch'
                        paddingBottom='16px'
                    >
                        <PlayButton onPress={onPlay} />
                        <StyledButton onPress={onPause} marginRight='10px'>
                            <StyledText
                                fontSize='16px'
                                backgroundColor='rgba(220,220,220,1)'
                                borderRadius='4px'
                                borderWidth='1px'
                                borderColor='rgba(80,80,80,0.5)'
                                overflow='hidden'
                                paddingVertical='7px'
                                paddingHorizontal='7px'
                            >Pause</StyledText>
                        </StyledButton>
                    </StyledView>
                    <StyledView flexDirection='row' justifyContent='space-between' flex={1} alignSelf='stretch' alignItems='center'>
                        <TouchableWithoutFeedback onPress={handlePress}><StyledView flex={1} marginRight='20px' onLayout={onLayoutProgress}><Progress.Bar progress={progress} height={7} width={null} /></StyledView></TouchableWithoutFeedback>
                        <StyledButton padding='10px' backgroundColor='#000' onPress={onReset} borderRadius='2px' alignSelf='flex-end' />
                    </StyledView>
                </>
            }
        </StyledView>
    );
}

const PlayButton = ({ onPress }) => (
    <StyledButton onPress={onPress} marginRight='10px'>
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

const resultIcons = {
    '': '',
    pending: '?',
    playing: '\u25B6',
    end: '\u2713',
    fail: '\u274C',
    pause: '\u23F8'
};

const MainView = () => {
    const audioTests = [
        {
            title: 'MASN - Psycho!',
            isRequire: true,
            url: require('../assets/psycho.mp3'),
        },
    ];
    const renderItem = ({ item }) => <AudioItem audioInfo={item} />
    return (
        <StyledView flex={1}>
            <StyledText
                fontSize='20px'
                fontWeight='bold'
                paddingHorizontal='20px'
                paddingBottom='20px'
                paddingTop='30px'
                textAlign='center'
            >react-native-sound-demo</StyledText>
            <FlatList
                data={audioTests}
                renderItem={renderItem}
                keyExtractor={({ title }) => title}
            />
        </StyledView >
    )
}
export default MainView