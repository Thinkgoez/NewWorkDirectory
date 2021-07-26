import styled from 'styled-components/native'
import { borderMixin, marginMixin, paddingMixin, shadowMixin, sizesMixin } from './StylesMixins/Mixins';

const Input = styled.TextInput`
    ${marginMixin}
    ${borderMixin}
    ${paddingMixin}
    ${sizesMixin}
    ${shadowMixin}
`;

export default Input