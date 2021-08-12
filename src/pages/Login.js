import React from 'react'
import { Platform, ScrollView, KeyboardAvoidingView } from 'react-native';

import { StyledText, StyledView } from '../components/common/SimpleComponents'
import { LoginForm } from '../components/Login/Form';

const Login = () => {
    const keyboardVerticalOffset = Platform.select({ ios: 50, android: 40 })
    return (
        <KeyboardAvoidingView behavior={Platform.select({ ios: 'position', android: 'height' })} keyboardVerticalOffset={keyboardVerticalOffset}>
            <ScrollView>
                <StyledView backgroundColor='#ed993f' alignItems='center' justifyContent='center' height='228px'>
                    <StyledView
                        // border='1px solid #fff'
                    >   
                        <StyledText color='#fff' fontSize='100px' lineHeight='100px'>D</StyledText>
                        <StyledView
                            // borderRadius='100px'
                            // border='1px solid #fff'
                            // paddingHorizontal='5px'
                            // paddingVertical='5px'
                            position='absolute'
                            right='-10px'
                            top='-5px'
                        >
                            {/* <StyledText textTransform='uppercase' color='#fff'>r</StyledText> */}
                            <StyledText color='#fff' fontSize='24px'>®</StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
                <StyledView paddingHorizontal='32px' paddingTop='8px'>
                    <LoginForm />
                </StyledView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login