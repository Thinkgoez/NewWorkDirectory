import styled from 'styled-components/native'
import { marginMixin, paddingMixin, sizesMixin, borderMixin } from './StylesMixins/Mixins'

const Image = styled.Image`
  ${sizesMixin}
  ${borderMixin}
  ${paddingMixin}
  ${marginMixin}
  ${({ backgroundColor, theme }) => backgroundColor !== undefined && theme ? `background-color: ${theme[backgroundColor]};` : ''}
`;

export default Image