// Should check
import React from 'react'
import { StyledButton, StyledText, StyledView } from '../common/SimpleComponents';

export function SummaryTab({ state, descriptors, navigation }) {
    return (
        <StyledView flexDirection='row'>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel || options.title || route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };


                return (
                    <StyledButton
                        accessibilityRole='button'
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={label}
                        backgroundColor={isFocused ? 'secondary' : 'summaryContentBG'}
                        borderRadius='5px'
                        alignItems='center'
                        paddingVertical='4px'
                        flex={1}
                        margin='2px'
                    >
                        <StyledText fontWeight='bold'>
                            {label}
                        </StyledText>
                    </StyledButton>
                );
            })}
        </StyledView>
    );
}