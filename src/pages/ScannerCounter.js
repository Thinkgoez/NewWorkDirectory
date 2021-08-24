import React from 'react';

import { PageHeader } from '../components/Header/PageHeader/PageHeader';
import { InfoBlock, StyledText, StyledView } from '../components/common/SimpleComponents';
import { Header } from '../components/Header/Header'

import BoxIcon from '../assets/box.svg'
import ScanningIcon from '../assets/scanningIcon.svg'
import { useCounterBarcodeError } from '../hooks/counterbarcode';

const ArticlesPageHeaderItems = [{ id: 1, icon: BoxIcon, text: '4327648937293290090867' }]
const headerTitles = { title: { text: 'Articles on carton', disabled: true }, leftText: 'Cancel', rightText: 'Confirm' }
const headerIcons = { center: { handleClick: () => { } }, leftText: 'Cancel', rightText: 'Confirm' }

const ScannerCounter = () => {
    const [barcodeError, counter, isVisible] = useCounterBarcodeError()

    let blockInfoText = isVisible ? 'Pull the trigger again to stop reading' : 'Pull the trigger to scan a carton barcode'
    if (barcodeError) blockInfoText = 'Invalid barcode'

    return (
        <StyledView flex={1} paddingBottom='8px' backgroundColor='#fff'>
            <Header headerTitles={headerTitles} headerIcons={headerIcons} />
            <PageHeader items={ArticlesPageHeaderItems} />
            <StyledView justifyContent={isVisible ? 'space-between': 'flex-end'} flex={1}>
                {isVisible && 
                     <StyledView alignItems='center'>
                     <StyledText color='#003556' fontSize='150px' lineHeight='150px'>{counter}</StyledText>
                     <StyledView alignItems='center' paddingTop='50px'>
                         <ScanningIcon width={100} height={100} />
                         <StyledText color='#9a9a9f' fontSize='20px'>Reading RFID...</StyledText>
                     </StyledView>
                 </StyledView>
                }
               
                <InfoBlock color={!!barcodeError ? '#fff' : '#003556'} text={blockInfoText} borderColor={!!barcodeError ? '#b51145' : '#003556'} fill={!!barcodeError} />
            </StyledView>
        </StyledView>
    );
};
export default ScannerCounter