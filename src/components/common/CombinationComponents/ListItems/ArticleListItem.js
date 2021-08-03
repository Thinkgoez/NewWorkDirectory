import React from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import ArrowRightIcon from '../../../../assets/arrowRight.svg';
import {
    StyledButton,
    StyledView,
    StyledText,
    StyledImage,
} from '../../SimpleComponents'

const RenderRightAction = ({ onPress }) => <StyledButton onPress={onPress} width='72px' backgroundColor='#fe3b30' justifyContent='center' alignItems='center'><StyledText color='#fff'>Delete</StyledText></StyledButton>
const IMAGE_WIDTH = '40px';

const ArticleItem = ({ item: { id, img, serialCode, color, size, name, count }, onSelect, closeRow, row, handleRightSwipe }) => {
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
                backgroundColor='#fff'
                borderBottom='1px #c3c3c3'
                activeOpacity={1}
                onPress={onSelect}
                // disabled={true}
            >
                <StyledView
                    paddingVertical='4px'
                    paddingHorizontal='10px'
                    marginHorizontal='8px'
                    justifyContent='center'
                    alignItems='center'

                    borderBottom='1px #dbdbdb'
                    borderRadius='5px'
                >
                    <StyledImage source={{ uri: img }} resizeMode='contain' width={IMAGE_WIDTH} height={IMAGE_WIDTH} />
                </StyledView>
                <StyledView justifyContent='space-between' paddingVertical='4px' flexGrow='1'>
                    <StyledText>{serialCode}</StyledText>
                    <StyledView flexDirection='row'>
                        <StyledText marginRight='56px'>{color}</StyledText>
                        <StyledText>{size}</StyledText>
                    </StyledView>
                    <StyledText color='#b6abab'>{name}</StyledText>
                </StyledView>
                <StyledView
                    alignItems='center'
                    justifyContent='space-between'
                    flexDirection='row'
                    width='128px'>
                    <StyledButton
                        backgroundColor='#209652'
                        width='104px'
                        alignItems='center'
                        justifyContent='center'
                        borderRadius='30px'>
                        <StyledText color='#fff' fontWeight='bold'>
                            {count}
                        </StyledText>
                    </StyledButton>
                    <ArrowRightIcon width='10px' height='10px' fill='#878282' />
                </StyledView>
            </StyledButton>
        </Swipeable>
    );
};
export default ArticleItem