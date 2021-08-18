// TODO: fix distance between color and size in item
import React, { useContext } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ThemeContext } from 'styled-components';

import ArrowRightIcon from '../../../../assets/arrowRight.svg';
import {
    StyledButton,
    StyledView,
    StyledText,
} from '../../SimpleComponents'

const RenderRightAction = ({onPress}) => <StyledButton onPress={onPress} width='72px' backgroundColor='swipableRightBG' justifyContent='center' alignItems='center'><StyledText color='secondary'>Delete</StyledText></StyledButton>

const CartonItem = ({ item: {id, serialCode, count}, onSelect, closeRow, row, handleRightSwipe }) => {
    const theme = useContext(ThemeContext)
    const swipeRightHandler = () => {
        handleRightSwipe(id)
    }
    const swipeOpenHandler = () => {
        closeRow(id)
    }
    return (
        <Swipeable
            ref={ref => row[id] = ref}
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={30}
            renderRightActions={() => <RenderRightAction onPress={swipeRightHandler} />}
            overshootRight={false}
            onSwipeableOpen={swipeOpenHandler}
        >
            <StyledButton
                flexDirection='row'
                justifyContent='space-between'
                paddingLeft='16px'
                paddingVertical='12px'
                paddingRight='4px'
                borderBottom={`1px ${theme['headerBORDER']}`}
                borderRight={`1px ${theme['headerBORDER']}`}
                backgroundColor='secondary'
                onPress={onSelect}
            >
                <StyledText fontSize='12px' fontWeight='bold'>{serialCode}</StyledText>
                <StyledView
                    alignItems='center'
                    justifyContent='space-between'
                    flexDirection='row'
                    width='128px'>
                    <StyledButton
                        backgroundColor='cartonsCountButtonBG'
                        width='104px'
                        alignItems='center'
                        justifyContent='center'
                        borderRadius='30px'>
                        <StyledText color='secondary' fontWeight='bold'>
                            {count}
                        </StyledText>
                    </StyledButton>
                    <ArrowRightIcon width='10px' height='10px' fill={theme['arrowRightFILL']} />
                </StyledView>
            </StyledButton>
        </Swipeable>
    );
};
export default CartonItem