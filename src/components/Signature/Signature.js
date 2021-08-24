import React, { useRef } from 'react'

import { StyledButton, StyledSignature, StyledText, StyledView } from '../common/SimpleComponents';

export const Signature = () => {
    const signature = useRef()
    const saveSign = () => {
        signature.current.saveImage();
        resetSign()
    }

    const resetSign = () => {
        signature.current.resetImage();
    }

    const onSaveEvent = (result) => {
        console.log(result.pathName);
    }
    const onDragEvent = () => {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    return (
        <StyledView flex={1} flexDirection="column">
            <StyledText textAlign='center' marginVertical='10px' fontSize='16px'>Signature Capture Extended</StyledText>
            <StyledSignature
                flex={1}
                border='1px solid #000033'
                showNativeButtons={false}
                ref={signature}
                onSaveEvent={onSaveEvent}
                onDragEvent={onDragEvent}
                saveImageFileInExtStorage={false}
                showTitleLabel={false}
                backgroundColor="#ff00ff"
                strokeColor="#ffffff"
                minStrokeWidth={4}
                maxStrokeWidth={4}
            />

            <StyledView flexDirection="row">
                <StyledButton
                    flex={1}
                    backgroundColor='#e0e0ee'
                    justifyContent='center'
                    alignItems='center'
                    paddingHorizontal='32px'
                    paddingVertical='16px'
                    marginVertical='10px'
                    marginHorizontal='10px'
                    onPress={saveSign} >
                    <StyledText>Save</StyledText>
                </StyledButton>
                <StyledButton
                    flex={1}
                    backgroundColor='#e0e0ee'
                    justifyContent='center'
                    alignItems='center'
                    paddingHorizontal='32px'
                    paddingVertical='16px'
                    marginVertical='10px'
                    marginHorizontal='10px'
                    onPress={resetSign} >
                    <StyledText>Reset</StyledText>
                </StyledButton>
            </StyledView>
        </StyledView>
    )
}