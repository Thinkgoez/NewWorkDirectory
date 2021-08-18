import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { useIsFocused } from '@react-navigation/native';

import { ListHeader } from '../../';
import { StyledView, StyledText } from '../../../SimpleComponents';

// Take itemsList strutucre like: {list: [listItems], headerItems: [string], ListItemComponent: Component}
// listItems: { id: string | number, img: string(url), serialCode: string, color: string, size: string, name: string, count: string | number }

const ContentList = ({ itemsList, refetching = false, onRefetch, onSelect, handleRightSwipe, ...props }) => {
    const isFocused = useIsFocused();
    let row = {};
    const closeRow = (index) => {
        if (row.prev && row.prev !== row[index]) {
            row.prev.close();
        }
        row.prev = row[index];
    }
    useEffect(() => {
        return () => {
            if(isFocused && row.prev) row.prev.close()
        }
    }, [isFocused])

    return (
        <StyledView flex={1} backgroundColor='secondary'>
            {itemsList?.list && itemsList.list.length > 0
                ? <FlatList
                    data={itemsList.list}
                    renderItem={({ item }) => <itemsList.ListItemComponent item={item} onSelect={onSelect} row={row} closeRow={closeRow} handleRightSwipe={handleRightSwipe} />}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={() => <ListHeader items={itemsList.headerItems} />}
                    refreshing={refetching}
                    onRefresh={onRefetch}
                />
                : <StyledView paddingTop='16px'><StyledText textAlign='center' fontSize='22px' fontWeight='bold'>Here is no any items ...</StyledText></StyledView>
            }
        </StyledView>
    )
}

export default ContentList