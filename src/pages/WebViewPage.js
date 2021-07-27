import React from 'react';
import { WebView } from 'react-native-webview';
import { StyledText, StyledView } from '../components/common/SimpleComponents';

const WebViewPage = () => {
    let webRef
    const run = `
        let scary = document.createElement('div');
        scary.style.position = 'absolute';
        scary.style.zIndex = '9999';
        scary.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnldiTBL0iKRDVs2Gs8s8ThU3TIycbWZXlRw&usqp=CAU")';
        scary.style.background = 'no-repeat center / cover url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnldiTBL0iKRDVs2Gs8s8ThU3TIycbWZXlRw&usqp=CAU")';
        let visible = false
        setInterval(() => {
            scary.style.visibility = 'visible'
            
            visible = !visible
            scary.style.top = window.pageYOffset + Math.floor(Math.random() * document.body.clientHeight) - 50 + 'px';
            scary.style.left = window.pageXOffset + Math.floor(Math.random() * document.body.clientWidth) - 50 + 'px';
            setTimeout(() => {
                scary.style.visibility = 'hidden'
            }, 200);
        }, 2000);
        
        scary.style.width = '100px';
        scary.style.height = '100px';
        document.body.querySelector('.navbar').style.backgroundColor = '#345678';
        document.body.append(scary);
        true;
    `;
    //scary.style.visibility = visible ? 'visible' : 'hidden'
//         scary.style.animation = '3s ease-in 1s infinite reverse both running slidein';
    setTimeout(() => {
        webRef.injectJavaScript(run);
    }, 2000);

    return (
        // <WebView
        //     originWhitelist={['*']}
        //     source={{ html: '<h1>Hello world</h1>' }}
        // />
        <StyledView backgroundColor='#345678' paddingTop='8px' flex={1}>
            <StyledText height='32px' textAlign='center' color='#ebe834' marginBottom='8px'>WebView</StyledText>
            <WebView ref={ref => webRef = ref} source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} automaticallyAdjustContentInsets={false} />
        </StyledView>
    );
}
export default WebViewPage