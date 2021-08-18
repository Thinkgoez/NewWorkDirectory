import React, { useContext } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ThemeContext } from 'styled-components';

import ArrowRightIcon from '../../../../assets/arrowRight.svg';
import {
    StyledButton,
    StyledView,
    StyledText,
    StyledImage,
} from '../../SimpleComponents'

const RenderRightAction = ({ onPress }) => <StyledButton onPress={onPress} width='72px' backgroundColor='swipableRightBG' justifyContent='center' alignItems='center'><StyledText color='secondary'>Delete</StyledText></StyledButton>
const IMAGE_WIDTH = '40px';

const ArticleItem = ({ item: { id, img, serialCode, color, size, name, count }, onSelect, closeRow, row, handleRightSwipe }) => {
    const theme = useContext(ThemeContext);
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
                backgroundColor='secondary'
                borderBottom={`1px ${theme['headerBORDER']}`}
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

                    borderBottom={`1px ${theme['articleItemImgBORDER']}`}
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
                    <StyledText color='articlesItemName'>{name}</StyledText>
                </StyledView>
                <StyledView
                    alignItems='center'
                    justifyContent='space-between'
                    flexDirection='row'
                    width='128px'>
                    <StyledButton
                        backgroundColor='articlesCountButtonBG'
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
export default ArticleItem