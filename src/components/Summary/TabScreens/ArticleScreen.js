import React, { useState } from 'react'
import { Alert } from 'react-native';

import { StyledView } from "../../common/SimpleComponents"
import { ContentList } from '../../common/CombinationComponents'

import { useActive } from '../../../hooks/useActive'
import { itemsList } from './itemsData/ArticleScreen'

export const ArticleScreen = ({ navigation, route, ...props }) => {
    const [loading, setLoading] = useState(false);
    const isActive = useActive(navigation)


    function fakeFecth() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }
    const handlePessItem = (el) => {
        // Some code
    }
    const handleRightSwipe = (id) => {
        Alert.alert('Alert', `You just clicked item with id: ${id}`)
    }
    return (
        <StyledView flex={1}>
            <ContentList
                key={isActive}
                itemsList={itemsList}
                refetching={loading}
                onRefetch={fakeFecth}
                onSelect={handlePessItem}
                handleRightSwipe={handleRightSwipe}
            />
        </StyledView>
    )
}