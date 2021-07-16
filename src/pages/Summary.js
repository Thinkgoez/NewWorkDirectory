import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';

import { PageHeader } from '../components/Header/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';
import { SummaryContent } from '../components/Summary/SummaryContent';
import { Header } from '../components/Header/Header'

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'


const SummaryPageHeaderItems = [{id: 1, icon: BoxIcon, text: '1'}, {id: 2, icon: TagIcon, text: '9'}]

export const Summary = () => {
  const pageTitle = {text: useRoute()?.name || 'Home', disabled: true}
  const leftText = 'Cancel'
  const rightText = 'Prepare'
  const handlePressItem = (el) => {
    // Some code
  }
  return (
    <StyledView paddingBottom='16px' flex={1}>
        <Header title={pageTitle} leftText={leftText} rightText={rightText} />
        <PageHeader id="2601-las vegas (tst)" items={SummaryPageHeaderItems} />
        <SummaryContent />
    </StyledView>
  );
};
