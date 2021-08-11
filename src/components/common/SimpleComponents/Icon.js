import styled from 'styled-components/native'
import { SvgUri } from 'react-native-svg';
import { marginMixin, paddingMixin, sizesMixin} from './StylesMixins/Mixins'

const Styled  = styled(SvgUri)`
  ${sizesMixin}
  ${paddingMixin}
  ${marginMixin}
  ${({backgroundColor}) => backgroundColor ? `background-color: ${backgroundColor};` : ''}
`;

export default Styled