import React, { useContext } from 'react'
import I18n from 'react-native-i18n';
import { ThemeContext } from 'styled-components';
import { StyledButton, StyledText, StyledView } from '../../../common/SimpleComponents'

const flashModes = ['off', 'on', 'auto', 'torch']

export const CameraTools = ({ takePictureHandle, changeFlashMode, activeFlashMode }) => {
    const theme = useContext(ThemeContext)
    return (
        <StyledView flex={1} justifyContent='space-between' width='100%'>
            <StyledView backgroundColor='cameraFlashModesBG' height='45px' flexDirection='row' justifyContent='space-evenly' alignItems='center'>
                <StyledText color='cameraFlash' fontWeight='bold' fontSize='18px'>{I18n.t(`pages.Camera.flashModes.Flash`)}: </StyledText>
                {flashModes.map(el => <StyledButton key={el} onPress={() => changeFlashMode(el)}
                    backgroundColor={activeFlashMode === el ? 'cameraFlashModeActiveBG' : 'cameraFlashModeBG'}
                    border={`1px solid ${theme['secondary']}`}
                    borderRadius='4px'
                    height='24px'
                    alignItems='center'
                    paddingHorizontal='8px'
                ><StyledText color='cameraFlash'>{I18n.t(`pages.Camera.flashModes.${el}`)}</StyledText></StyledButton>)}
            </StyledView>
            <StyledView flexDirection='row' justifyContent='center'>
                <StyledButton
                    onPress={takePictureHandle}
                    backgroundColor='cameraSnapBG'
                    borderRadius='5px'
                    paddingHorizontal='20px'
                    paddingVertical='15px'
                    alignItems='center'
                    marginVertical='20px'
                    marginHorizontal='20px'
                >
                    <StyledText fontSize='14px' color='cameraSnap'>{I18n.t('pages.Camera.SNAP')}</StyledText>
                </StyledButton>
            </StyledView>
        </StyledView>
    )
}