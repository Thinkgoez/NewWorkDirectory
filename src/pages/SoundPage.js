import React, { useCallback, useState } from 'react';
import DocumentPicker from 'react-native-document-picker'
import styled from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux';

import { AudioItem } from '../components/Sound/AudioItem';
import { StyledButton, StyledFlatList, StyledText, StyledView } from '../components/common/SimpleComponents'
import CustomDropDown from '../components/common/CombinationComponents/DropDown';
import { createNewSound } from '../components/Sound/tools';
import { addAudio, clearAudioStore } from '../redux/actions/audioActions';
import { useSoundOrder } from '../hooks/audio/order';

import AddIcon from '../assets/add.svg'
import ShuffleIcon from '../assets/shuffle.svg'
import SimpleOrderIcon from '../assets/simpleOrder.svg'
import LoopOneIcon from '../assets/loopOne.svg'
import LoopAllIcon from '../assets/loop.svg'
import RemoveIcon from '../assets/delete.svg'
import PrevIcon from '../assets/prev.svg'
import NextIcon from '../assets/next.svg'
import { ORDER_LOOP_ALL, ORDER_LOOP_ONE, ORDER_MIX, ORDER_SIMPLE } from '../constants';


const A = "http://muzovichkoff.com/uploads/files/2020-06/1592385003152_1592385003.mp3"
const orderList = [
    { id: 1, title: ORDER_MIX, icon: ShuffleIcon },
    { id: 2, title: ORDER_LOOP_ALL, icon: LoopAllIcon },
    { id: 3, title: ORDER_LOOP_ONE, icon: LoopOneIcon },
]
const defaultOrder = { id: 99, title: ORDER_SIMPLE, icon: SimpleOrderIcon }

const MainView = () => {
    const dispatch = useDispatch()
    const [playingSoundId, setPlayingSoundId] = useState(null)
    const [soundOrder, setSoundOrder] = useState([ORDER_SIMPLE])
    const audioItems = useSelector(({ audio }) => audio.items)
    const flatListItems = audioItems?.length > 0 ? audioItems : [{ title: 'AAAAAAAA', url: A, id: 53 }, { title: 'BBBBBBB', url: A, id: 5 }, { title: 'helb', url: A, id: 77 }]
    const { next, prev, afterCurrentPlay, isLooped, addPlayed } = useSoundOrder(flatListItems, playingSoundId, soundOrder)

    const clearAudios = () => dispatch(clearAudioStore())
    
    const loadSingleFile = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.audio],
            })
            const [error, newSoundItem] = await createNewSound(res.name, res.uri)
            if (error) {
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
    const handleSelectOrder = (orderTitle) => {
        setSoundOrder(prev => {
            if (prev.includes(orderTitle)) {
                return prev.filter(el => el !== orderTitle)
            } else {
                if (
                    orderTitle === ORDER_LOOP_ALL
                    && prev?.includes(ORDER_LOOP_ONE)
                ) {
                    return [...prev.filter(el => el !== ORDER_LOOP_ONE), orderTitle]
                } else if (
                    orderTitle === ORDER_LOOP_ONE
                    && prev?.find(el => el === ORDER_LOOP_ALL)
                ) {
                    return [...prev.filter(el => el !== ORDER_LOOP_ALL), orderTitle]
                }
                return [...prev, orderTitle]
            }
        })
    }
    const handleNext = () => {
        setPlayingSoundId(next)
    }
    const handlePrev = () => {
        setPlayingSoundId(prev)
    }
    const handleFind = () => {
        console.log('Found, that was difficult')
    }
    
    const currentFinishPlaying = useCallback((soundId) => {
        addPlayed(soundId)
        setPlayingSoundId(afterCurrentPlay)
    }, [afterCurrentPlay])

    const currentPlayingAudio = flatListItems.find(el => el.id === playingSoundId)
    const renderItem = ({ item }) => <AudioItem audioInfo={item} currentPlaying={playingSoundId} setCurrentPlaying={setPlayingSoundId} onFinishPlaying={currentFinishPlaying} isLooped={isLooped} />
    // console.log('Current playing:', playingSoundId)
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
            <StyledView>
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
                    <CustomDropDown
                        onSelect={handleSelectOrder}
                        data={orderList}
                        defaultValue={defaultOrder}
                    />
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
                {!!currentPlayingAudio && <StyledView
                    paddingVertical='10px'
                    paddingHorizontal='16px'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    borderBottom='1px #000'
                >

                    <StyledView flexDirection='row' flex={1} justifyContent='space-between'>
                        <StyledButton onPress={handlePrev} marginRight='25px' disabled={!prev} opacity={!prev ? 0.4 : 1}>
                            <PrevIcon width={30} height={30} />
                        </StyledButton>
                        <StyledButton onPress={handleFind} marginRight='25px'>
                            <StyledText color='#000' fontSize='20px' fontWeight='bold'>{currentPlayingAudio.title}</StyledText>
                        </StyledButton>
                        <StyledButton onPress={handleNext} disabled={!next} opacity={!next ? 0.4 : 1}>
                            <NextIcon width={30} height={30} />
                        </StyledButton>
                    </StyledView>
                </StyledView>}
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