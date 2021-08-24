import React from 'react'
import { useNavigation, StackActions } from '@react-navigation/core'
import { StyledButton, StyledImage } from '../../common/SimpleComponents'

export const GalleryItem = ({ item }) => {
    const navigation = useNavigation()
    const pushAction = StackActions.push('Canvas', { url: item })
    const handlePress = () => {
        navigation.dispatch(pushAction)
    }
    return(
        <StyledButton onPress={handlePress} backgroundColor='#c9c9c9'><StyledImage width='100px' height='100px' source={{ uri: item }}/></StyledButton>
    )
}