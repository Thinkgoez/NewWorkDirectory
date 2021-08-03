import styled from 'styled-components/native'
import { WebView } from 'react-native-webview';
import { flexMixin, borderMixin, paddingMixin, sizesMixin, shadowMixin, marginMixin} from './StylesMixins/Mixins'

const Styled = styled(WebView)`
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