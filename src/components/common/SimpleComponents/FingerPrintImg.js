import React from 'react'
import Image from './Image'

const FPImage = (props) => (
    <Image
        source={require('../../../assets/finger_print.png')}
        {...props}
    />
)

export default FPImage