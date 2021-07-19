import React from 'react'
import { FlatList } from 'react-native'
import { useNavigation, StackActions } from '@react-navigation/native';

import { StyledView, StyledImage, StyledButton } from '../../common/SimpleComponents'

const GalleryItem = ({ item }) => {
    const navigation = useNavigation()
    const pushAction = StackActions.push('Canvas', { uri: item })
    const handlePress = () => {
        navigation.dispatch(pushAction)
    }
    return(
        <StyledButton onPress={handlePress}><StyledImage width='100px' height='100px' source={{ uri: item }}/></StyledButton>
    )
}

const renderItem = ({ item }) => <GalleryItem item={item}  />


export const Gallery = ({gallery, fetchGallery}) => {
    return (
        <StyledView>
            <FlatList
                data={gallery}
                renderItem={renderItem}
                keyExtractor={(i) => i}
                horizontal
                // onEndReached={fetchGallery}
            />
        </StyledView>
    )
}