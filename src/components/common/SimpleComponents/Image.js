import styled from 'styled-components/native'
import { marginMixin, paddingMixin, sizesMixin} from './StylesMixins/Mixins'

const Image = styled.Image`
  ${sizesMixin}
  ${paddingMixin}
  ${marginMixin}
  ${({backgroundColor}) => backgroundColor ? `background-color: ${backgroundColor};` : ''}
`;

export default Image