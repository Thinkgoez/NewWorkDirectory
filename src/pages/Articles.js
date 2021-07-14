import React, {useState} from 'react';
import {ArticlesList} from '../components/Articles/ArticlesList/ArticlesList';
import {PageHeader} from '../components/Articles/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';

// let deviceH = Dimensions.get('screen').height;
// let windowH = Dimensions.get('window').height;
// let bottomNavBarH = deviceH - windowH - StatusBar.currentHeight;
// // should fix

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
  },
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
    <StyledView paddingBottom='16px'>
      <PageHeader id="321312312321312409496349058" count="9" />
      <ArticlesList
        list={[]}
        refetching={loading}
        onRefetch={fakeFecth}
        onSelect={handlePessItem}
      />
    </StyledView>
  );
};
