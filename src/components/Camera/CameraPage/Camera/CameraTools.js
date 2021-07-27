import React from 'react'
import { StyledButton, StyledText, StyledView } from '../../../common/SimpleComponents'

export const CameraTools = ({ takePictureHandle, changeFlashMode, activeFlashMode }) => {
    const flashModes = ['off', 'on', 'auto', 'torch']
    return (
        <StyledView flex={1} justifyContent='space-between' width='100%'>
            <StyledView backgroundColor='rgba(0,0,0,0.3)' height='45px' flexDirection='row' justifyContent='space-evenly' alignItems='center'>
                <StyledText color='#fff' fontWeight='bold' fontSize='18px'>Flash: </StyledText>
                {flashModes.map(el => <StyledButton key={el} onPress={() => changeFlashMode(el)}
                    backgroundColor={activeFlashMode === el ? '#8a8a8a' :'#fff'}
                    border='1px solid #fff'
                    borderRadius='4px'
                    height='24px'
                    alignItems='center'
                    paddingHorizontal='8px'
                ><StyledText color='#000'>{el}</StyledText></StyledButton>)}
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
                    <StyledText fontSize='14px'>SNAP</StyledText>
                </StyledButton>
            </StyledView>
        </StyledView>
    )
}