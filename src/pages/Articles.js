import React, {useState} from 'react';

import {ArticlesList} from '../components/Articles/ArticlesList/ArticlesList';
import {PageHeader} from '../components/Articles/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'

const ArticlesPageHeaderItems = [{id: 1, icon: BoxIcon, text: '321312312321312409496349058'}, {id: 2, icon: TagIcon, text: '9'}]

const itemsList = [
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
];

export const Articles = () => {
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
    <StyledView flex={1} paddingBottom='16px'>
      <PageHeader items={ArticlesPageHeaderItems} />
      <ArticlesList
        list={itemsList}
        refetching={loading}
        onRefetch={fakeFecth}
        onSelect={handlePessItem}
      />
    </StyledView>
  );
};
