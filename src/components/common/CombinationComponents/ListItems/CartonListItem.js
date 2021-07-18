// TODO: fix distance between color and size in item
import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import ArrowRightIcon from '../../../../assets/arrowRight.svg';
import {
    StyledButton,
    StyledView,
    StyledText,
} from '../../SimpleComponents'

const RenderRightAction = ({onPress}) => <StyledButton onPress={onPress} width='72px' backgroundColor='#fe3b30' justifyContent='center' alignItems='center'><StyledText color='#fff'>Delete</StyledText></StyledButton>

const CartonItem = ({ item: {id, serialCode, count}, onSelect, closeRow, row, handleRightSwipe }) => {
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
                flexDirection="row"
                justifyContent="space-between"
                paddingLeft="16px"
                paddingVertical='12px'
                paddingRight="4px"
                borderBottom='1px #c3c3c3'
                borderRight='1px #c3c3c3'
                backgroundColor='#fff'
                onPress={onSelect}
            >
                <StyledText fontSize='12px' fontWeight='bold'>{serialCode}</StyledText>

                <StyledView
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                    width="128px">
                    <StyledButton
                        backgroundColor="#828282"
                        width="104px"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="30px">
                        <StyledText color="#fff" fontWeight="bold">
                            {count}
                        </StyledText>
                    </StyledButton>
                    <ArrowRightIcon width="10px" height="10px" fill="#878282" />
                </StyledView>
            </StyledButton>
        </Swipeable>
    );
};
export default CartonItem