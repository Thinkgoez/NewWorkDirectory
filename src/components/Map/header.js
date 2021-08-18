import React, { useContext } from 'react'
import I18n from 'react-native-i18n'
import { ThemeContext } from 'styled-components'
import { StyledButton, StyledText } from '../common/SimpleComponents'

export const mapHeader = ({ scene: { descriptor: { navigation } } }) => {
    const handlePress = () => {
        navigation.openDrawer()
    }
    return (<NavigationButton handlePress={handlePress} />
    )
}
const NavigationButton = ({ handlePress }) => {
    const theme = useContext(ThemeContext)
    return (
        <StyledButton onPress={handlePress} paddingVertical='8px' alignItems='center' flexDirection='row' justifyContent='center' borderBottom={`1px ${theme['primary']}`}><StyledText>{I18n.t('pages.Map.Navigation')}</StyledText></StyledButton>
    )
}