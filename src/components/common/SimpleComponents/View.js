import styled from 'styled-components/native'
import { flexMixin, borderMixin, paddingMixin, sizesMixin, shadowMixin, marginMixin, positionMixin} from './StylesMixins/Mixins'

const View = styled.View`
    ${flexMixin}
    ${borderMixin}
    ${paddingMixin}
    ${marginMixin}
    ${sizesMixin}
    ${shadowMixin}
    ${positionMixin}
    ${({zIndex}) => zIndex !== undefined ? `z-index: ${zIndex};`: ''}
    ${({color}) => color !== undefined ? `color: ${color};`: ''}
    ${({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: ''}
    ${({backgroundColor}) => backgroundColor !== undefined ? `background-color: ${backgroundColor};`: ''}
    ${({opacity}) => opacity !== undefined ? `opacity: ${opacity};`: ''}
    ${({transform}) => transform !== undefined ? `transform: ${transform};`: ''}
`

export default View