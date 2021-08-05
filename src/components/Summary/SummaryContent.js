import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import I18n from 'react-native-i18n'

import { StyledView } from '../common/SimpleComponents'
import { SummaryTab } from './SummaryTab';
import { CartonScreen } from './TabScreens/CartonScreen';
import { ArticleScreen } from './TabScreens/ArticleScreen';

const Tabs = createMaterialTopTabNavigator()

export const SummaryContent = () => {
    return(
        <StyledView backgroundColor='#efeff0' flex={1} borderRadius='5px'>
            <Tabs.Navigator tabBar={SummaryTab}>
                <Tabs.Screen name='Cartons' options={{title: I18n.t('pages.Summary.pages.Cartons')}} component={CartonScreen} />
                <Tabs.Screen name='Articles' options={{title: I18n.t('pages.Summary.pages.Articles')}} component={ArticleScreen} />
            </Tabs.Navigator>
        </StyledView>
    )
}