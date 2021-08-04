import styled from 'styled-components/native'
import { marginMixin, paddingMixin, sizesMixin, borderMixin} from './StylesMixins/Mixins'

const Image = styled.Image`
  ${sizesMixin}
  ${borderMixin}
  ${paddingMixin}
  ${marginMixin}
  ${({backgroundColor}) => backgroundColor ? `background-color: ${backgroundColor};` : ''}
`;

export default Image