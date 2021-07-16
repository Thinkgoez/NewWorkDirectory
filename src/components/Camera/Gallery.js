import React, { useEffect, useState } from 'react'
import CameraRoll from '@react-native-community/cameraroll'

import { FlatList, Image, ScrollView } from 'react-native'
import { StyledButton, StyledText, StyledView, StyledImage } from '../common/SimpleComponents'


export const Gallery = ({gallery}) => {
    return (
        <StyledView>
            {/* <StyledButton title="Load Images" onPress={this._handleButtonPress} /> */}
            <FlatList
                data={gallery}
                renderItem={({ item }) => <StyledImage width='100px' height='100px' source={{ uri: item.node.image.uri }}/>}
                keyExtractor={(_,i) => i}
                horizontal
            />
        </StyledView>
    )
}