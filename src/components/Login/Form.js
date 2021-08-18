import React, { useContext, useState } from 'react'
import { Formik } from 'formik';

import { StyledText, StyledView, StyledButton } from '../common/SimpleComponents'
import { CunstomInput, SecureToggle } from '../common/CombinationComponents/';
import { errorList, validateLoginSchema } from './validationForm';
import Check from '../../assets/check.svg'
import { ThemeContext } from 'styled-components';

export const LoginForm = ({handleSubmit}) => {
    const theme = useContext(ThemeContext)
    const [isSecure, setIsSecure] = useState(true)
    const [passErrors, setPassErrors] = useState(errorList.map(errItem => errItem.message)) // default value is all posible password errors
   
    const toggleViewPass = () => setIsSecure(prev => !prev)
    const validate = validateLoginSchema(setPassErrors)
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validate={validate}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldError, validateForm }) => {
                return (
                    <StyledView paddingBottom='20px'>
                        <StyledView paddingBottom='16px' marginBottom='64px'>
                            {errorList.map(error => {
                                const isValid = !passErrors.includes(error.message)
                                return (
                                    <StyledView key={error.id} flexDirection='row' alignItems='center'>
                                        <StyledView width='5px' height='5px' borderRadius='2px' backgroundColor={isValid ? 'access' : 'loginPointBG'} marginRight='8px' />
                                        <StyledText marginRight='16px'>{error.title}</StyledText>
                                        {isValid && <Check fill={theme['access']} width='16px' height='16px' />}
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
                            borderBottom={touched.email && errors.email ? `1px ${theme['loginError']}` : `1px ${theme['loginInputBORDER']}`}
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
                            borderBottom={touched.password && errors.password ? `1px ${theme['loginError']}` : `1px ${theme['loginInputBORDER']}`}
                            marginBottom='16px'
                            secureTextEntry={isSecure}
                            error={touched.password && errors.password}
                            SecureToggle={() => <SecureToggle isSecure={isSecure} secureToggle={toggleViewPass} />}
                        />
                        <StyledButton
                            onPress={handleSubmit}
                            backgroundColor='infoBlock'
                            paddingVertical='16px'
                            alignItems='center'
                            justifyContent='center'
                        ><StyledText textTransform='uppercase' color='loginButton'>Login</StyledText></StyledButton>
                    </StyledView>
                )
            }}
        </Formik>
    )
}
