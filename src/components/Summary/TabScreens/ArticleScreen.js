import React, { useState } from 'react'
import { Alert } from 'react-native';

import { StyledView } from "../../common/SimpleComponents"
import { ContentList } from '../../common/CombinationComponents'

import { itemsList } from './itemsData/ArticleScreen'

export const ArticleScreen = ({ navigation, route, ...props }) => {
    const [loading, setLoading] = useState(false);


    function fakeFecth() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }
    const handlePessItem = () => {
        Alert.alert('Alert', `You just clicked item`)
    }
    const handleRightSwipe = (id) => {
        Alert.alert('Alert', `You deleted: ${id}`)
    }
    return (
        <StyledView flex={1}>
            <ContentList
                itemsList={itemsList}
                refetching={loading}
                onRefetch={fakeFecth}
                onSelect={handlePessItem}
                handleRightSwipe={handleRightSwipe}
            />
        </StyledView>
    )
}