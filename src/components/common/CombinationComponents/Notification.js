import React from 'react'
import { StyledText, StyledView, StyledImage, StyledSafeAreaView } from '../SimpleComponents';

const Notification = ({ containerProps, imgSource, iconProps, descProps, titleProps }) => ({ description, title }) => {
    return (
        <StyledSafeAreaView backgroundColor='loginNotifBG'>
            <StyledView  paddingVertical='8px' paddingHorizontal='16px' backgroundColor='loginNotifBG' flexDirection='row' {...containerProps}>
            {imgSource && <StyledImage source={imgSource} width='50px' height='60px' borderWidth='1px' borderColor='loginNotifDesc' {...iconProps} />}
            <StyledView alignItems='center' flex={1}>
                <StyledText fontSize='24px' {...titleProps}>{title}</StyledText>
                <StyledText {...descProps}>{description}</StyledText>
            </StyledView>
            </StyledView>
        </StyledSafeAreaView>
    )
}
export default Notification;
