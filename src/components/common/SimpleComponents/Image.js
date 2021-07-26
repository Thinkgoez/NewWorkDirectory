import styled from 'styled-components/native'
import { paddingMixin, sizesMixin} from './StylesMixins/Mixins'

const Image = styled.Image`
  ${sizesMixin}
  ${paddingMixin}
  ${({backgroundColor}) => backgroundColor ? `background-color: ${backgroundColor};` : ''}
`;

export default Image