import styled from 'styled-components/native'
import { paddingMixin, sizesMixin} from './StylesMixins/Mixins'

const Image = styled.Image`
  ${sizesMixin}
  ${paddingMixin}
`;

export default Image