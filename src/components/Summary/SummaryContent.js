import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import { StyledView } from '../common/SimpleComponents'
import { SummaryTab } from './SummaryTab';
import { CartonScreen } from './TabScreens/CartonScreen';
import { ArticleScreen } from './TabScreens/ArticleScreen';

const Tabs = createMaterialTopTabNavigator()

export const SummaryContent = () => {
    return(
        <StyledView backgroundColor='#efeff0' flex={1} borderRadius='5px'>
            <Tabs.Navigator tabBar={SummaryTab}>
                <Tabs.Screen name='Cartons' component={CartonScreen} />
                <Tabs.Screen name='Articles' component={ArticleScreen} />
            </Tabs.Navigator>
        </StyledView>
    )
}