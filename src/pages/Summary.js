import React from 'react';

import { PageHeader } from '../components/Header/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';
import { SummaryContent } from '../components/Summary/SummaryContent';
import { Header } from '../components/Header/Header'

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'

const SummaryPageHeaderItems = [{ id: 1, icon: BoxIcon, text: '1' }, { id: 2, icon: TagIcon, text: '9' }]

export const SummaryPage = ({navigation, route, ...props}) => {
    const headerTitles = { title: { text: route?.name || 'Summary', disabled: true }, leftText: 'Cancel', rightText: 'Prepare' }
    const headerIcons = { center: { handleClick: () => { navigation.navigate('Camera') } }, leftText: 'Cancel', rightText: 'Confirm' }

    const handlePressItem = (el) => {
        // Some code
    }
    return (
        <StyledView paddingBottom='16px' flex={1}>
            <Header headerTitles={headerTitles} headerIcons={headerIcons} />
            <PageHeader id="2601-las vegas (tst)" items={SummaryPageHeaderItems} />
            <SummaryContent />
        </StyledView>
    );
};
