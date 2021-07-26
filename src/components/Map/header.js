import React from 'react'
import { StyledButton, StyledText } from '../common/SimpleComponents'

export const mapHeader = ({ scene: { descriptor: { navigation } } }) => {
    const handlePress = () => {
        navigation.openDrawer()
    }
    return (
        <StyledButton onPress={handlePress} height='32px' alignItems='center' flexDirection='row' justifyContent='center' borderBottom='1px #000'><StyledText>Navigation</StyledText></StyledButton>
    )
}