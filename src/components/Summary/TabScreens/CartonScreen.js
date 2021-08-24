import React, { useState } from 'react'
import { Alert } from 'react-native';
import I18n from 'react-native-i18n';

import { StyledView } from '../../common/SimpleComponents'
import { ContentList } from '../../common/CombinationComponents'

import { itemsList } from './itemsData/CartonScreen';

export const CartonScreen = () => {
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
        Alert.alert('Alert', `${I18n.t('You just clicked item with id')}: ${id}`)
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