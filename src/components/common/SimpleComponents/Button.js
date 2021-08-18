import styled from 'styled-components/native'
import { flexMixin, paddingMixin, sizesMixin, borderMixin, marginMixin, shadowMixin, positionMixin } from './StylesMixins/Mixins'

const StyledTouchableOpacity= styled.TouchableOpacity`
    ${flexMixin}
    ${borderMixin}
    ${paddingMixin}
    ${marginMixin}
    ${sizesMixin}
    ${shadowMixin}
    ${positionMixin}
    ${(({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: '')}
    ${({backgroundColor, theme}) => backgroundColor !== undefined  && theme ? `background-color: ${theme[backgroundColor]};`: ''}
    ${(({border}) => border !== undefined ? `border: ${border};`: '')}
    ${(({borderRadius}) => borderRadius !== undefined ? `border-radius: ${borderRadius};`: '')}
`

export default StyledTouchableOpacity