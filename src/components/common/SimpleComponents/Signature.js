import SignatureCapture from "react-native-signature-capture";
import styled from 'styled-components/native'
import { borderMixin, flexMixin, marginMixin, paddingMixin, positionMixin, shadowMixin, sizesMixin } from "./StylesMixins/Mixins";

export default StyledSignature = styled(SignatureCapture)`
    ${flexMixin}
    ${borderMixin}
    ${paddingMixin}
    ${marginMixin}
    ${sizesMixin}
    ${shadowMixin}
    ${positionMixin}
`