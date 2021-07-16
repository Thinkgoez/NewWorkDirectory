import React, {useState} from 'react';
import { useRoute } from '@react-navigation/native';

import { ContentList } from '../components/common/CombinationComponents';
import { PageHeader } from '../components/Header/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';
import { Header } from '../components/Header/Header'

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'
import { ArticleItem } from '../components/common/CombinationComponents';

const ArticlesPageHeaderItems = [{id: 1, icon: BoxIcon, text: '321312312321312409496349058'}, {id: 2, icon: TagIcon, text: '9'}]

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

export const Articles = () => {
  const [loading, setLoading] = useState(false);
  const headerTitles = {title: {text: useRoute()?.name || 'Home', disabled: true}, leftText: 'Cancel', rightText: 'Confirm'}

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
      <Header headerTitles={headerTitles} />
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
