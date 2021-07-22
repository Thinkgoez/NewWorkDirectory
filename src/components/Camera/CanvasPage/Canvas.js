import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import styled from 'styled-components';
var RNFS = require('react-native-fs');


export const CanvasScreen = ({ route }) => {
    const [signature, setSign] = useState(null);
    const [dataUri, setDataUri] = useState()
    useEffect(async () => {
        const res = await RNFS.readFile(route.params.uri, 'base64')
        setDataUri(res)
    }, [])
    const handleSignature = signature => {
        setSign(signature);
    };

    const handleEmpty = () => {
        setSign(null)
    }

    const style = `.m-signature-pad--footer
    .button {
        background-color: red;
        color: #FFF;
    }`;
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.preview}>
                {signature ? (
                    <Image
                        resizeMode={"contain"}
                        style={{ width: 335, height: 114 }}
                        source={{ uri: signature }}
                    />
                ) : null}
            </View>
            <SignatureScreen
                onOK={handleSignature}
                onClear={handleEmpty}
                descriptionText="Sign"
                clearText="Clear"
                confirmText="Save"
                webStyle={style}
                dataURL={`data:image/jpg;base64, ${dataUri}`}
                style={styles.canvas}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    preview: {
        width: 335,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10
    }
});
