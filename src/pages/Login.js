import React from 'react'
import { Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Notifier, Easing } from 'react-native-notifier';

import { CustomNotification } from '../components/common/CombinationComponents';
import { StyledText, StyledView } from '../components/common/SimpleComponents'
import { LoginForm } from '../components/Login/Form';

const Login = () => {
    const customNotOptions = {
        imgSource: require('../assets/thief.jpeg'),
        iconProps: { borderColor: '#fff' },
        titleProps: { color: '#ffc7c7' },
        descProps: { color: '#faa5a5' }
    }

    const keyboardVerticalOffset = Platform.select({ ios: 50, android: 40 })
    const NotificationComponent = CustomNotification(customNotOptions)
    const handleSubmit = (values) => {
        Notifier.showNotification({
            title: 'Hacked!(was ez)',
            description: `Is this "${values.password}" your pass?`,
            duration: 5000,
            showAnimationDuration: 800,
            showEasing: Easing.bounce,
            hideEasing: Easing.ease,
            hideOnPress: true,
            Component: NotificationComponent
        });
    }
    return (
        <KeyboardAvoidingView behavior={Platform.select({ ios: 'position', android: 'height' })} keyboardVerticalOffset={keyboardVerticalOffset}>
            <ScrollView>
                <StyledView backgroundColor='#ed993f' alignItems='center' justifyContent='center' height='228px'>
                    <StyledView>   
                        <StyledText color='#fff' fontSize='100px' lineHeight='100px'>D</StyledText>
                        <StyledView
                            position='absolute'
                            right='-10px'
                            top='-5px'
                        >
                            <StyledText color='#fff' fontSize='24px'>®</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
                <StyledView paddingHorizontal='32px' paddingTop='8px'>
                    <LoginForm handleSubmit={handleSubmit} />
                </StyledView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login