import React, {useState} from 'react';

import {PageHeader} from '../components/Articles/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'
import { SummaryContent } from '../components/Summary/SummaryContent';

const SummaryPageHeaderItems = [{id: 1, icon: BoxIcon, text: '1'}, {id: 2, icon: TagIcon, text: '9'}]

export const Summary = () => {
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
  return (
    <StyledView paddingBottom='16px' flex={1}>
      <PageHeader id="2601-las vegas (tst)" items={SummaryPageHeaderItems} />
      <SummaryContent />
    </StyledView>
  );
};
