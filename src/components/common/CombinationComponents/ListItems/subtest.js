import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ReAnimated from 'react-native-reanimated'
import { StyledText, StyledView } from '../../SimpleComponents';



{/* <ReAnimated.Text
    style={[
        styles.actionText,
        {
            transform: [{ translateX: trans }],
        },
    ]}>
    Archive
</ReAnimated.Text> */}
const renderLeftActions = () => <RectButton style={styles.leftAction}><StyledText>Text</StyledText></RectButton>
const renderRightAction = (_) => <StyledView backgroundColor={_} />

{/* <ReAnimated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
    <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={pressHandler}>
        <Text style={styles.actionText}>{text}</Text>
    </RectButton>
</ReAnimated.View> */}

const renderRightActions = (_dragAnimatedValue) => (
    <StyledView width='192px'>
        {renderRightAction('#C8C7CD')}
    </StyledView>
);

export default AppleStyleSwipeableRow = ({children}) => {
    return (
        <Swipeable
            friction={2}
            enableTrackpadTwoFingerGesture
            leftThreshold={30}
            rightThreshold={40}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}>
            {children}
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
        alignItems: 'center'
    },
});