// testing field 
import React from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

import { StyledView } from '../../components/common/SimpleComponents'
import SwipableList from './SwipableList'
const Tabs = createMaterialTopTabNavigator()

export default SummaryContent = () => {
    return(
        <StyledView backgroundColor='#efeff0' flex={1} borderRadius='5px'>
            <Tabs.Navigator>
                <Tabs.Screen name="Cartons" component={SwipableList} />
                <Tabs.Screen name="Articles" component={SwipableList} />
            </Tabs.Navigator>
        </StyledView>
    )
}