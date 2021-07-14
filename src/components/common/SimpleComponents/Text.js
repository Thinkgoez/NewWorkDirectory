import styled from 'styled-components/native'
import { marginMixin } from './StylesMixins/Mixins'

const Text = styled.Text`
    ${marginMixin}
    ${(({color}) => color !== undefined ? `color: ${color};`: '')}
    ${(({fontSize}) => fontSize !== undefined ? `font-size: ${fontSize};`: '')}
    ${(({fontWeight}) => fontWeight !== undefined ? `font-weight: ${fontWeight};`: '')}
    ${(({textAlign}) => textAlign !== undefined ? `text-align: ${textAlign};`: '')}
    ${(({alignSelf}) => alignSelf !== undefined ? `align-self: ${alignSelf};`: '')}
    ${(({justifySelf}) => justifySelf !== undefined ? `justify-self: ${justifySelf};`: '')}
`
export default Text