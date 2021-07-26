import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Formik } from 'formik';

import { StyledText, StyledView, StyledButton } from '../components/common/SimpleComponents'
import { CunstomInput, SecureToggle } from '../components/common/CombinationComponents/';
import Check from '../assets/check.svg'

// const passreg = /(?!.*([A-Za-z0-9#?!@$ %^&*-,.])\1{2})(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-,.])/ // at least one upper case English letter, one lower case English letter, one number and one special character

export const Login = () => {
    return (
        <ScrollView>
            <StyledView backgroundColor='#ed993f' alignItems='center' justifyContent='center' height='228px'>
                <StyledText color='#fff' fontSize='100px'>D</StyledText>
            </StyledView>
            <StyledView paddingHorizontal='32px' paddingTop='8px'>
                <Form />
            </StyledView>
        </ScrollView>
    )
}
export const Form = () => {
    const [isSecure, setIsSecure] = useState(true)
    const [passObjectValidation, setPassObject] = useState({})

    const toggleViewPass = () => setIsSecure(!isSecure)
    const validate = (values) => {
        const { email, password } = values
        const errors = {};
        let validObj = {}
        if(email !== undefined){
            if (!email.trim()) {
                errors.email = 'Required'
            } else if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) {
                errors.email = 'Invalid email'
            }
        }
        if (!password.trim()) {
            errors.password = 'Required'
        } else {
            validObj.required = true
            if(!/(?=.*?[a-z])/.test(password)){
                errors.password = 'Invalid password'
            } else {
                validObj.lower = true
            }
            if(!/(?=.*?[A-Z])/.test(password)){
                errors.password = 'Invalid password'
            } else {
                validObj.upper = true
            }
            if(!/(?=.*?[0-9])/.test(password)){
                errors.password = 'Invalid password'
            } else {
                validObj.number = true
            }
            if(!/(?=.*?[#?!@$ %^&*-,.])/.test(password)){
                errors.password = 'Invalid password'
            } else {
                validObj.special = true
            }
            if(!/(?!.*([A-Za-z0-9#?!@$ %^&*-,.])\1{2})/.test(password)){
                errors.password = 'Invalid password'
            } else {
                validObj.repeat = true
            }
            if(password.length < 8) {
                errors.password = 'Too short'
            } else {
                validObj.count = true
            }
        }
        setPassObject(validObj)
        return errors
    }
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => console.log(values)}
            validateOnChange={false}
            validate={validate}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldError, validateForm }) => (
                <StyledView>
                    <StyledView paddingBottom='16px'>
                        {errorList.map(error => {
                            return (
                                <StyledView key={error.id} flexDirection='row' alignItems='center'>
                                    <StyledView width='5px' height='5px' borderRadius='2px' backgroundColor={passObjectValidation[error.id]? 'green' :'#b8b8b8'} marginRight='8px' />
                                    <StyledText marginRight='16px'>{error.title}</StyledText>
                                    {passObjectValidation[error.id] && <Check fill='green' width='16px' height='16px'/>}
                                </StyledView>
                            )
                        })}
                    </StyledView>
                    <CunstomInput
                        onChangeText={value => {
                            handleChange('email')(value)
                            setFieldError('email', null)
                        }}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        label='Username'
                        autoCapitalize='none'
                        paddingVertical='2px'
                        paddingHorizontal='4px'
                        borderBottom={touched.email && errors.email ? '1px red' : '1px #e2e2e3'}
                        marginBottom='16px'
                        error={touched.email && errors.email}
                    />
                    <CunstomInput
                        onChangeText={value => {
                            validateForm({password: value, email: values.email})
                            handleChange('password')(value)
                        }}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        label='Password'
                        autoCapitalize='none'
                        paddingVertical='2px'
                        paddingHorizontal='4px'
                        borderBottom={touched.password && errors.password ? '1px red' : '1px #e2e2e3'}
                        marginBottom='16px'
                        secureTextEntry={isSecure}
                        error={touched.password && errors.password}
                        SecureToggle={() => <SecureToggle isSecure={isSecure} secureToggle={toggleViewPass} />}
                    />
                    <StyledButton
                        onPress={handleSubmit}
                        backgroundColor='#003556'
                        paddingVertical='16px'
                        alignItems='center'
                        justifyContent='center'
                    ><StyledText textTransform='uppercase' color='#dfe6e9'>Login</StyledText></StyledButton>
                </StyledView>
            )}
        </Formik>
    )
}

const errorList = [
    { id: 'required', title: 'non empty', order: 0 },
    { id: 'lower', title: 'at least 1 lower', order: 1 },
    { id: 'upper', title: 'at least 1 upper', order: 2 },
    { id: 'number', title: 'at least 1 number', order: 3 },
    { id: 'special', title: 'at least 1 special character', order: 4 },
    { id: 'repeat', title: "don't repeat repeat more than 2 in row", order: 5 },
    { id: 'count', title: 'better than 7 characters', order: 6 }
]