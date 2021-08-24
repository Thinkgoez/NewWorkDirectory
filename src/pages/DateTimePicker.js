import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker'
import { Platform } from 'react-native';
import styled from 'styled-components/native'

import { StyledButton, StyledText, StyledView } from '../components/common/SimpleComponents';
import {StyledDatePicker} from "./styled";

const DateTimePicker = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateTime, setDateTime] = useState(null);
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (dateTime) => {
        setDateTime(dateTime)
        hideDatePicker();
    };

    return (
        <StyledView>
            <StyledButton
                onPress={showDatePicker}
                backgroundColor='#ffaa00'
                alignItems='center'
                justifyContent='center'
                paddingVertical='10px'
            >
                <StyledText color='#fff' fontWeight='bold' fontSize='18px'>Show Another Date Picker</StyledText>
            </StyledButton>
            {
                !!dateTime &&
                    <StyledText>
                        <StyledText fontWeight='bold' fontSize='16px'>You picked:</StyledText>
                        {dateTime.toLocaleString()}
                    </StyledText>
            }
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={Platform.select({ ios: 'date', android: 'datetime' })}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <StyledView flex={1} alignItems='center'>
                <DatePicker
                    date={date}
                    onDateChange={setDate}
                    mode='date'
                    textColor='#ef4f0f'
                />
                <StyledDatePicker
                    date={time}
                    onDateChange={setTime}
                    mode='time'
                    textColor='#ef4f0f'
                />
            </StyledView>
        </StyledView>
    );
};


export default DateTimePicker