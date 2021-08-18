import React from 'react';
import I18n from 'react-native-i18n';

import { PageHeader } from '../components/Header/PageHeader/PageHeader';
import { StyledView } from '../components/common/SimpleComponents';
import { SummaryContent } from '../components/Summary/SummaryContent';
import { Header } from '../components/Header/Header'
import { useBarcode } from '../hooks/barcode'

import TagIcon from '../assets/tag.svg'
import BoxIcon from '../assets/box.svg'
import { InfoBlock } from '../components/common/CombinationComponents';

const SummaryPageHeaderItems = [{ id: 1, icon: BoxIcon, text: '1' }, { id: 2, icon: TagIcon, text: '9' }]

const SummaryPage = ({ navigation, route, ...props }) => {
    const headerTitles = { title: { text: I18n.t('pages.Summary.title'), disabled: true }, leftText: I18n.t('pageHeader.Cancel'), rightText: I18n.t('pageHeader.Prepare') }
    const headerIcons = { center: { handleClick: () => { navigation.navigate('Camera') } } }

    const barcodeError = useBarcode()
    let blockInfoText = 'Pull the trigger to scan a carton barcode'
    if (barcodeError) blockInfoText = 'Invalid barcode'
    return (
        <StyledView paddingBottom='16px' flex={1}>
            <Header headerTitles={headerTitles} headerIcons={headerIcons} />
            <PageHeader id="2601-las vegas (tst)" items={SummaryPageHeaderItems} />
            <SummaryContent />
            <InfoBlock color={!!barcodeError ? 'secondary' : 'infoBlock'} text={blockInfoText} borderColor={!!barcodeError ? 'infoBlockErrFILLBORDER' : 'infoBlock'} fill={!!barcodeError} />
        </StyledView>
    );
};
export default SummaryPage