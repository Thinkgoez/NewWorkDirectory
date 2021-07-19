import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { ContentList } from '../components/common/CombinationComponents';
import { PageHeader } from '../components/Header/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';
import { Header } from '../components/Header/Header'

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'
import { itemsList } from './items/ArticleItems';

const ArticlesPageHeaderItems = [{ id: 1, icon: BoxIcon, text: '321312312321312409496349058' }, { id: 2, icon: TagIcon, text: '9' }]

export const ArticlesPage = () => {
    const [loading, setLoading] = useState(false);
    const headerTitles = { title: { text: useRoute()?.name || 'Home', disabled: true }, leftText: 'Cancel', rightText: 'Confirm' }
    const headerIcons = { center: { handleClick: () => { } }, leftText: 'Cancel', rightText: 'Confirm' }
    
    function fakeFecth() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }
    const handlePessItem = (el) => {
        // Some code
    }
    return (
        <StyledView flex={1}>
            <Header headerTitles={headerTitles} headerIcons={headerIcons} />
            <PageHeader items={ArticlesPageHeaderItems} />
            <ContentList
                itemsList={itemsList}
                refetching={loading}
                onRefetch={fakeFecth}
                onSelect={handlePessItem}
            />
        </StyledView>
    );
};
