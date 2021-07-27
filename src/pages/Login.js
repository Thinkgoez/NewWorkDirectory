import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Formik } from 'formik';

import { StyledText, StyledView, StyledButton } from '../components/common/SimpleComponents'
import { CunstomInput, SecureToggle } from '../components/common/CombinationComponents/';
import Check from '../assets/check.svg'

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

    const toggleViewPass = () => setIsSecure(prev => !prev)
    const validate = ({ email, password }) => {
        const errors = {};
        let validObj = {}; // object of valid requirements for errorList
        errorList.forEach(err => validObj[err.id] = true) // setting default value true, below if pass is invalid change to false

        if (!email.trim()) {
            errors.email = 'Required'
        } else if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email)) { // email check
            errors.email = 'Invalid email'
        }

        if (!password.trim()) {
            errors.password = 'Required'
            validObj = {}
        } else {
            if (!/(?=.*?[a-z])/.test(password)) { // check for lower
                errors.password = 'Invalid password'
                validObj.lower = false
            }
            if (!/(?=.*?[A-Z])/.test(password)) { // check for upper
                errors.password = 'Invalid password'
                validObj.upper = false
            }
            if (!/(?=.*?[0-9])/.test(password)) { // check for number
                errors.password = 'Invalid password'
                validObj.number = false
            }
            if (!/(?=.*?[#?!@$ %^&*-,./])/.test(password)) { // check for special character
                errors.password = 'Invalid password'
                validObj.special = false
            }
            if (/([A-Za-z0-9#?!@$ %^&*-,./])\1{2,}/.test(password)) { // true when 2 or more repeat in row
                errors.password = 'Invalid password'
                validObj.repeat = false
            }
            if (password.length < 8) {
                errors.password = 'Too short'
                validObj.count = false
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
                            const isValid = passObjectValidation[error.id]
                            return (
                                <StyledView key={error.id} flexDirection='row' alignItems='center'>
                                    <StyledView width='5px' height='5px' borderRadius='2px' backgroundColor={isValid ? 'green' : '#b8b8b8'} marginRight='8px' />
                                    <StyledText marginRight='16px'>{error.title}</StyledText>
                                    {isValid && <Check fill='green' width='16px' height='16px' />}
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
                            validateForm({ password: value, email: values.email })
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
    { id: 'required', title: 'non empty' },
    { id: 'lower', title: 'at least 1 lower' },
    { id: 'upper', title: 'at least 1 upper' },
    { id: 'number', title: 'at least 1 number' },
    { id: 'special', title: 'at least 1 special character' },
    { id: 'repeat', title: 'do not repeat repeat more than 2 in row' },
    { id: 'count', title: 'better than 7 characters' }
]