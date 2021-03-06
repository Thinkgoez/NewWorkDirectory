import React from 'react'
import I18n from 'react-native-i18n';
import { StyledButton, StyledText, StyledView } from '../../../common/SimpleComponents'

const flashModes = ['off', 'on', 'auto', 'torch']

export const CameraTools = ({ takePictureHandle, changeFlashMode, activeFlashMode }) => {
    return (
        <StyledView flex={1} justifyContent='space-between' width='100%'>
            <StyledView backgroundColor='rgba(0,0,0,0.3)' height='45px' flexDirection='row' justifyContent='space-evenly' alignItems='center'>
                <StyledText color='#fff' fontWeight='bold' fontSize='18px'>{I18n.t(`pages.Camera.flashModes.Flash`)}: </StyledText>
                {flashModes.map(el => <StyledButton key={el} onPress={() => changeFlashMode(el)}
                    backgroundColor={activeFlashMode === el ? '#8a8a8a' :'#fff'}
                    border='1px solid #fff'
                    borderRadius='4px'
                    height='24px'
                    alignItems='center'
                    paddingHorizontal='8px'
                ><StyledText color='#000'>{I18n.t(`pages.Camera.flashModes.${el}`)}</StyledText></StyledButton>)}
            </StyledView>
            <StyledView flexDirection='row' justifyContent='center'>
                <StyledButton
                    onPress={takePictureHandle}
                    backgroundColor='#fff'
                    borderRadius='5px'
                    paddingHorizontal='20px'
                    paddingVertical='15px'
                    alignItems='center'
                    marginVertical='20px'
                    marginHorizontal='20px'
                >
                    <StyledText fontSize='14px'>{I18n.t('pages.Camera.SNAP')}</StyledText>
                </StyledButton>
            </StyledView>
        </StyledView>
    )
}