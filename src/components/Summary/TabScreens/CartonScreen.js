import React, { useState } from 'react'
import { Alert } from 'react-native';

import { StyledView } from "../../common/SimpleComponents"
import { ContentList } from '../../common/CombinationComponents'
import { CartonItem } from '../../common/CombinationComponents';

import {useActive} from '../../../hooks/useActive'


const itemsList = {
    list: [
        {
            id: '1',
            serialCode: '9437257326478324283892O934',
            count: 3,
        },
        {
            id: '2',
            serialCode: '11112232193214489732857328',
            count: 2,
        },
    ],
    headerItems: ['carton no.', 'act'],
    ListItemComponent: CartonItem
};

export const CartonScreen = ({navigation}) => {
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