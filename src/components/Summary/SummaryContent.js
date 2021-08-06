import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { StyledView } from '../common/SimpleComponents'
import { InfoBlock } from '../common/CombinationComponents';
import { SummaryTab } from './SummaryTab';
import { CartonScreen } from './TabScreens/CartonScreen';
import { ArticleScreen } from './TabScreens/ArticleScreen';
import { useBarcode } from '../../hooks/barcode'

const Tabs = createMaterialTopTabNavigator()

export const SummaryContent = () => {
    const barcodeError = useBarcode()
    let blockInfoText = 'Pull the trigger to scan a carton barcode'
    if (barcodeError) blockInfoText = 'Invalid barcode'
    return (
        <StyledView backgroundColor='#efeff0' flex={1} borderRadius='5px'>
            <Tabs.Navigator tabBar={SummaryTab}>
                <Tabs.Screen name='Cartons' component={CartonScreen} />
                <Tabs.Screen name='Articles' component={ArticleScreen} />
            </Tabs.Navigator>
            <InfoBlock color={!!barcodeError ? '#fff' : '#003556'} text={blockInfoText} borderColor={!!barcodeError ? '#b51145' : '#003556'} fill={!!barcodeError} />
        </StyledView>
    )
}