import React from 'react'
import I18n from 'react-native-i18n'
import { StyledButton, StyledText } from '../common/SimpleComponents'

export const mapHeader = ({ scene: { descriptor: { navigation } } }) => {
    const handlePress = () => {
        navigation.openDrawer()
    }
    return (
        <StyledButton onPress={handlePress} paddingVertical='8px' alignItems='center' flexDirection='row' justifyContent='center' borderBottom='1px #000'><StyledText>{I18n.t('pages.Map.Navigation')}</StyledText></StyledButton>
    )
}