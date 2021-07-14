import React from 'react'
import styled from 'styled-components/native'
import { StyledView } from "../../common/SimpleComponents";
import { ArticleItem } from "./ArticleItem";
import { ArticlesListHeader } from './ArticlesListHeader';

export const ArticlesList = ({list=[], refetching=false, onRefetch, onSelect, ...props}) => {
    return(
        <StyledView>
            <StyledFlatList
                data={list}
                renderItem={({item}) => <ArticleItem {...item} onSelect={onSelect}/>}
                keyExtractor={item => item.id}
                ListHeaderComponent={() => <ArticlesListHeader />}
                refreshing={refetching}
                onRefresh={onRefetch}
            />
        </StyledView>
    )
}

const StyledFlatList = styled.FlatList`
    
`