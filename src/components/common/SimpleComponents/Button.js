import styled from 'styled-components/native'
import { flexMixin, paddingMixin, sizesMixin, borderMixin, marginMixin, shadowMixin } from './StylesMixins/Mixins'

const StyledTouchableOpacity= styled.TouchableOpacity`
    ${flexMixin}
    ${borderMixin}
    ${paddingMixin}
    ${marginMixin}
    ${sizesMixin}
    ${shadowMixin}
    ${(({color}) => color !== undefined ? `color: ${color};`: '')}
    ${(({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: '')}
    ${(({backgroundColor}) => backgroundColor !== undefined ? `background-color: ${backgroundColor};`: '')}
    ${(({border}) => border !== undefined ? `border: ${border};`: '')}
    ${(({borderRadius}) => borderRadius !== undefined ? `border-radius: ${borderRadius};`: '')}
`

export default StyledTouchableOpacity