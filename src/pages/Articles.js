import React, { useState } from 'react';
import I18n from 'react-native-i18n';
import { useNavigationState, useRoute } from '@react-navigation/native';

import { ContentList } from '../components/common/CombinationComponents';
import { PageHeader } from '../components/Header/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';
import { Header } from '../components/Header/Header'

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'
import { itemsList } from '../components/items/ArticleItems';
import { useNotification } from '../hooks/notification';


const ArticlesPageHeaderItems = [{ id: 1, icon: BoxIcon, text: '321312312321312409496349058' }, { id: 2, icon: TagIcon, text: '9' }]
const headerTitles = { title: { text: I18n.t('pages.Articles.title'), disabled: true }, leftText: I18n.t('pageHeader.Cancel'), rightText: I18n.t('pageHeader.Confirm') }
const headerIcons = { center: { handleClick: () => { } } }

export default ArticlesPage = ({ navigation }) => {
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

    // initialization push notifications
    const routeNames = useNavigationState(({ routeNames }) => routeNames)
    const onRegister = (token) => {
        console.log('Registered')
    }
    const onNotif = (notif) => {
        if (notif?.data?.screen && routeNames.includes(notif.data.screen)) {
            navigation.navigate(notif.data.screen)
        }
    }
    useNotification({ onNotif, onRegister })
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
