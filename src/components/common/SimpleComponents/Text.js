import styled from 'styled-components/native'
import { marginMixin, positionMixin, textMixin } from './StylesMixins/Mixins'

const Text = styled.Text`
    ${marginMixin}
    ${textMixin}
    ${positionMixin}
    ${(({color}) => color !== undefined ? `color: ${color};`: '')}
    ${(({fontSize}) => fontSize !== undefined ? `font-size: ${fontSize};`: '')}
    ${(({fontWeight}) => fontWeight !== undefined ? `font-weight: ${fontWeight};`: '')}
    ${(({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: '')}
    ${(({alignSelf}) => alignSelf !== undefined ? `align-self: ${alignSelf};`: '')}
    ${(({justifySelf}) => justifySelf !== undefined ? `justify-self: ${justifySelf};`: '')}
    ${(({textTransform}) => textTransform !== undefined ? `text-transform: ${textTransform};`: '')}
`
export default Text