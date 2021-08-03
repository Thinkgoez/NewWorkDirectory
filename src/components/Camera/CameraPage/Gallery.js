import React, { useCallback } from 'react'
import { FlatList } from 'react-native'

import { StyledView } from '../../common/SimpleComponents'
import { GalleryItem } from './GalleyItem'

export const Gallery = ({gallery}) => {
    const renderItem = useCallback(renderGalleryItem, [])
    const renderGalleryItem = ({ item }) => <GalleryItem item={item}  />
    return (
        <StyledView>
            <FlatList
                data={gallery}
                renderItem={renderItem}
                keyExtractor={(i) => i}
                horizontal
            />
        </StyledView>
    )
}