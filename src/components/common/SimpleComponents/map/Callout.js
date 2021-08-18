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
    ${({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: ''}
    ${({backgroundColor, theme}) => backgroundColor !== undefined  && theme ? `background-color: ${theme[backgroundColor]};`: ''}
    ${({opacity}) => opacity !== undefined ? `opacity: ${opacity};`: ''}
`

export default Styled