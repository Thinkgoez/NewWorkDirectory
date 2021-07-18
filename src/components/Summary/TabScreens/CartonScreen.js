import React, { useState } from 'react'
import { Alert } from 'react-native';

import { StyledView } from "../../common/SimpleComponents"
import { ContentList } from '../../common/CombinationComponents'

import { useActive } from '../../../hooks/useActive'
import { itemsList } from './itemsData/CartonScreen';

export const CartonScreen = ({ navigation }) => {
    const isActive = useActive(navigation)
    const [loading, setLoading] = useState(false);
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