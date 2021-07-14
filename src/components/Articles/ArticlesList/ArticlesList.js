import React from 'react'
import styled from 'styled-components/native'
import { StyledView, StyledText} from "../../common/SimpleComponents";
import { ArticleItem } from "./ArticleItem";
import { ArticlesListHeader } from './ArticlesListHeader';

export const ArticlesList = ({ list=[], refetching=false, onRefetch, onSelect, ...props}) => {
    return(
        <StyledView>
            {list && list.length > 0
            ? <StyledFlatList
                data={list}
                renderItem={({item}) => <ArticleItem {...item} onSelect={onSelect}/>}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <ArticlesListHeader />}
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