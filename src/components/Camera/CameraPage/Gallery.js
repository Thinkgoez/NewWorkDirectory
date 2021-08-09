import React from 'react'
import { FlatList } from 'react-native'

import { StyledView } from '../../common/SimpleComponents'
import { GalleryItem } from './GalleyItem'

export const Gallery = ({gallery}) => {
    const renderGalleryItem = ({ item }) => <GalleryItem item={item} />
    return (
        <StyledView height='100px'>
            <FlatList
                data={gallery}  
                renderItem={renderGalleryItem}
                keyExtractor={(i) => i}
                horizontal
            />
        </StyledView>
    )
}