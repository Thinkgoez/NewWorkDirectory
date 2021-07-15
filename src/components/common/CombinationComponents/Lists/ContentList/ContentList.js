import React from 'react'
import styled from 'styled-components/native'

import { ListHeader } from '../../';
import { StyledView, StyledText} from "../../../SimpleComponents";

// Take itemsList strutucre like: {list: [listItems], headerItems: [string], ListItemComponent: Component}
// listItems: { id: string | number, img: string(url), serialCode: string, color: string, size: string, name: string, count: string | number }

const ContentList = ({ itemsList, refetching=false, onRefetch, onSelect, ...props}) => {
    return(
        <StyledView flex={1} backgroundColor='#fff'>
            {itemsList?.list && itemsList.list.length > 0
            ? <StyledFlatList
                data={itemsList.list}
                renderItem={({item}) => <itemsList.ListItemComponent {...item} onSelect={onSelect}/>}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <ListHeader items={itemsList.headerItems} />}
                refreshing={refetching}
                onRefresh={onRefetch}
            />
            : <StyledView paddingTop='16px'><StyledText textAlign='center' fontSize='22px' fontWeight='bold'>Here is no any article ...</StyledText></StyledView>
        }
            
        </StyledView>
    )
}

const StyledFlatList = styled.FlatList`
`
export default ContentList