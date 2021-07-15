import React, {useState} from 'react'

import { StyledView } from "../../common/SimpleComponents"
import { ContentList } from '../../common/CombinationComponents'
import { CartonItem } from '../../common/CombinationComponents';

const itemsList = {
  list: [
    {
      id: '1',
      serialCode: '9437257326478324283892O934',
      count: 3,
    },
  ],
  headerItems: ['carton no.', 'act'],
  ListItemComponent: CartonItem
};

export const CartonScreen = () => {
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
    return(
        <StyledView flex={1}>
            <ContentList
                itemsList={itemsList}
                refetching={loading}
                onRefetch={fakeFecth}
                onSelect={handlePessItem}
            />
        </StyledView>
    )
}