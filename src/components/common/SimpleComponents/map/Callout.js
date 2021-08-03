import styled from 'styled-components/native'
import { flexMixin, borderMixin, paddingMixin, sizesMixin, shadowMixin, marginMixin} from '../StylesMixins/Mixins'
import { Callout } from 'react-native-maps';

const Styled = styled(Callout)`
    ${flexMixin}
    ${borderMixin}
    ${paddingMixin}
    ${marginMixin}
    ${sizesMixin}
    ${shadowMixin}
    ${({color}) => color !== undefined ? `color: ${color};`: ''}
    ${({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: ''}
    ${({backgroundColor}) => backgroundColor !== undefined ? `background-color: ${backgroundColor};`: ''}
    ${({opacity}) => opacity !== undefined ? `opacity: ${opacity};`: ''}
`

export default Styled