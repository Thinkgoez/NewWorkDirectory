import React from 'react';
import {
    Animated,
    StyleSheet,
} from 'react-native';

const ShakingText = (props) => {
    const shakedValue = new Animated.Value(0);

    const animatedStyle = () => {
        return {
            transform: [
                {
                    translateY: shakedValue.interpolate({
                        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        outputRange: [0, 10, -15, 12, -9, 18, -7, 10, -11, 5, 0],
                    }),
                },
                {
                    translateX: shakedValue.interpolate({
                        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        outputRange: [0, 2, -3, 4, -4, 3, -3, 4, -5, 2, 0],
                    }),
                },
            ],
        };
    }
    return (
        <Animated.Text
            {...props}
            style={[animatedStyle(), styles.description(props.erros)]}
        />
    );
}

const styles = StyleSheet.create({
    description: (error) => ({
        textAlign: 'center',
        color: error ? '#ea3d13' : '#a5a5a5',
        height: 65,
        fontSize: 18,
        marginVertical: 10,
        marginHorizontal: 20,
    })
});

export default ShakingText;