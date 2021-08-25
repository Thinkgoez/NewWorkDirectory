import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux';

import { AudioItem } from '../components/Sound/AudioItem';
import { StyledButton, StyledFlatList, StyledText, StyledView } from '../components/common/SimpleComponents'
import { addAudio, clearAudioStore } from '../redux/actions/audioActions';
import { createNewSound } from '../components/Sound/tools';

import AddIcon from '../assets/add.svg'
import RemoveIcon from '../assets/delete.svg'

const A = "http://muzovichkoff.com/uploads/files/2020-06/1592385003152_1592385003.mp3"

const MainView = () => {
    const dispatch = useDispatch()
    const [playingSoundId, setPlayingSoundId] = useState(null)
    const audioItems = useSelector(({ audio }) => audio.items)

    const clearAudios = () => dispatch(clearAudioStore())
    const renderItem = ({ item }) => <AudioItem audioInfo={item} currentPlaying={playingSoundId} setCurrentPlaying={setPlayingSoundId} />
    const loadSingleFile = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.audio],
            })
            const [error, newSoundItem] = await createNewSound(res.name, res.uri)
            if(error){
                // handle error
                console.log(error)
            }
            if (newSoundItem) {
                dispatch(addAudio(newSoundItem))
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('ladno')
            } else {
                throw err
            }
        }
    }
    const flatListItems = audioItems?.length > 0 ? audioItems : [{title: 'AAAAAAAA', url: A, id: 53}, {title: 'BBBBBBB', url: A, id: 5}]
    return (
        <StyledView flex={1}>
            <StyledText
                fontSize='30px'
                fontWeight='bold'
                paddingHorizontal='20px'
                paddingBottom='15px'
                paddingTop='25px'
                textAlign='center'
            >Music</StyledText>
            <StyledView
                flexDirection='row'
                justifyContent='space-between'
                borderTop='1px #ccc'
                borderBottom='1px #000'
                paddingHorizontal='8px'
                paddingVertical='8px'
                aligmItems='center'
            >
                <StyledButton
                    onPress={clearAudios}
                    flexDirection='row'
                    alignItems='center'
                    borderRadius='10px'
                    paddingHorizontal='10px'
                    paddingVertical='10px'
                    justifyContent='space-between'
                    border='1px solid #000'
                >
                    <StyledRemoveIcon fill='#f53d3d' width='30px' height='30px' />
                    <StyledText
                        fontSize='20px'
                        fontWeight='bold'
                        textAlign='center'
                    >
                        Clear store
                    </StyledText>
                </StyledButton>
                <StyledButton
                    onPress={loadSingleFile}
                    flexDirection='row'
                    alignItems='center'
                    borderRadius='10px'
                    paddingHorizontal='10px'
                    paddingVertical='10px'
                    justifyContent='space-between'
                    border='1px solid #000'
                >
                    <StyledAddIcon fill='#4fab4f' width='30px' height='30px' />
                    <StyledText
                        fontSize='20px'
                        fontWeight='bold'
                        textAlign='center'
                    >Load file</StyledText>
                </StyledButton>
            </StyledView>
            <StyledFlatList
                data={flatListItems}
                renderItem={renderItem}
                keyExtractor={({ id }) => id}
                flex={1}
            />
        </StyledView>
    )
}

const StyledAddIcon = styled(AddIcon)`
    margin-right: 8px;
`
const StyledRemoveIcon = styled(RemoveIcon)`
    margin-right: 8px;
`
export default MainView