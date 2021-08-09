import React, { useState } from 'react';
import { Alert, Modal } from 'react-native';
import { StyledButton, StyledText, StyledView } from '../components/common/SimpleComponents';

const ModalPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const open = () => setModalVisible(true)
    const close = () => setModalVisible(false)
    return (
        <StyledView
            justifyContent='center'
            alignItems='center'
            flex={1}
        >
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    close()
                }}
            >
                <StyledView
                    justifyContent='center'
                    alignItems='center'
                    flex={1}>
                    <StyledView
                        backgroundColor='#fff'
                        borderRadius='20px'
                        paddingHorizontal='35px'
                        paddingVertical='35px'
                        alignItems='center'
                        shadowColor='#000'
                        shadowOffset={{
                            width: '0px',
                            height: '2px'
                        }}
                        shadowOpacity='0.25'
                        shadowRadius='4px'
                        elevation='5'
                    >
                        <StyledText textAlign='center' marginBottom='15px'>Chose one:</StyledText>
                        <StyledView flexDirection='row' width='60%'>
                            <StyledButton
                                flex={1}
                                paddingVertical='25px'
                                borderRadius='20px'
                                elevation='2'
                                backgroundColor='#f31421'
                                marginRight='10px'
                                onPress={close}
                                opacity='0.6'
                            />
                            <StyledButton
                                flex={1}
                                borderRadius='20px'
                                paddingVertical='25px'
                                elevation='2'
                                backgroundColor='#1256f8'
                                marginRight='10px'
                                onPress={close}
                                opacity='0.6'
                            />
                        </StyledView>
                    </StyledView>
                </StyledView>
            </Modal>
            <StyledButton
                borderRadius='20px'
                paddingHorizontal='16px'
                paddingVertical='12px'
                elevation='2'
                backgroundColor='#000'
                onPress={open}
            >
                <StyledText color='#fff' fontWeight='bold' textAlign='center'>Chose one</StyledText>
            </StyledButton>
        </StyledView>
    );
};

export default ModalPage;