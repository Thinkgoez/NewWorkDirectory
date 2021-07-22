import React, { useState } from 'react'
import { Alert } from 'react-native';

import { StyledView } from "../../common/SimpleComponents"
import { ContentList } from '../../common/CombinationComponents'
import { ArticleItem } from '../../common/CombinationComponents';

import {useActive} from '../../../hooks/useActive'

const itemsList = {
    list: [
        {
            id: '1',
            img: 'https://content.mycutegraphics.com/graphics/clothing/blue-sweater.png',
            serialCode: 'CGO934',
            color: 'White',
            size: 'XS',
            name: 'Langsleeve Women X',
            count: 3,
        },
        {
            id: '2',
            img: 'https://content.mycutegraphics.com/graphics/clothing/blue-sweater.png',
            serialCode: 'CGO934',
            color: 'White',
            size: 'XS',
            name: 'Langsleeve Women X',
            count: 3,
        },
        {
            id: '3',
            img: 'https://content.mycutegraphics.com/graphics/clothing/blue-sweater.png',
            serialCode: 'CGO934',
            color: 'White',
            size: 'XS',
            name: 'Langsleeve Women X',
            count: 3,
        },
        {
            id: '4',
            img: 'https://content.mycutegraphics.com/graphics/clothing/blue-sweater.png',
            serialCode: 'CGO934',
            color: 'White',
            size: 'XS',
            name: 'Langsleeve Women X',
            count: 3,
        },
        {
            id: '5',
            img: 'https://content.mycutegraphics.com/graphics/clothing/blue-sweater.png',
            serialCode: 'CGO934',
            color: 'White',
            size: 'XS',
            name: 'Langsleeve Women X',
            count: 3,
        },
        {
            id: '6',
            img: 'https://content.mycutegraphics.com/graphics/clothing/blue-sweater.png',
            serialCode: 'CGO934',
            color: 'White',
            size: 'XS',
            name: 'Langsleeve Women X',
            count: 3,
        },
        {
            id: '7',
            img: 'https://content.mycutegraphics.com/graphics/clothing/blue-sweater.png',
            serialCode: 'CGO934',
            color: 'White',
            size: 'XS',
            name: 'Langsleeve Women X',
            count: 3,
        }
    ],
    headerItems: ['Article no.', 'act'],
    ListItemComponent: ArticleItem
};


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