import { CartonItem } from '../../../common/CombinationComponents';
import I18n from 'react-native-i18n';

export const itemsList = {
    list: [
        {
            id: '1',
            serialCode: '9437257326478324283892O934',
            count: 3,
        },
        {
            id: '2',
            serialCode: '11112232193214489732857328',
            count: 2,
        },
    ],
    headerItems: [I18n.t('pages.Summary.listHeaders.CartonNo'), I18n.t('pages.Articles.listHeaders.act')],
    ListItemComponent: CartonItem
};
