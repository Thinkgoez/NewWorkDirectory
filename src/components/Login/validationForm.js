import * as Yup from 'yup';

const MESSAGES = {
    lower: 'Must contain lower letter',
    upper: 'Must contain upper letter',
    number: 'Must contain number',
    special: 'Must contain special character',
    repeat: 'Could not repeat more than 2 in row',
    required: 'Required',
    count: 'Too short'
}

export const errorList = [
    { id: 'required', title: 'non empty', message: MESSAGES.required },
    { id: 'lower', title: 'at least 1 lower', message: MESSAGES.lower },
    { id: 'upper', title: 'at least 1 upper', message: MESSAGES.upper },
    { id: 'number', title: 'at least 1 number', message: MESSAGES.number },
    { id: 'special', title: 'at least 1 special character', message: MESSAGES.special },
    { id: 'repeat', title: 'do not repeat more than 2 in row', message: MESSAGES.repeat },
    { id: 'count', title: 'better than 7 characters', message: MESSAGES.count }
]

export const emailSchema = Yup.string().email('Invalid email').required(MESSAGES.required);
export const passSchema = Yup.string()
    .matches(/(?=.*?[a-z])/, MESSAGES.lower)
    .matches(/(?=.*?[A-Z])/, MESSAGES.upper)
    .matches(/(?=.*?[0-9])/, MESSAGES.number)
    .matches(/(?=.*?[#?!@$ %^&*-,./])/, MESSAGES.special)
    .test('repeat', MESSAGES.repeat, (value) => !/([A-Za-z0-9#?!@$ %^&*-,./])\1{2,}/.test(value) && !!value.trim())
    .min(8, MESSAGES.count)
    .required(MESSAGES.required)

export const validateLoginSchema = (setPassErrors) => async ({ email, password }) => {
    const errors = {}
    try {
        await passSchema.validate(password, { abortEarly: false });
        setPassErrors([])
    } catch (e) {
        setPassErrors(e.errors)
        errors.password = e.errors[0]
    }
    try {
        await emailSchema.validate(email, { abortEarly: false });
    } catch (e) {
        errors.email = e.errors[0]
    }
    return errors
} 