import React, { useEffect, useRef } from 'react';
import { StyledText, StyledView, StyledWebView } from '../components/common/SimpleComponents';

const WebViewPage = () => {
    const webRef = useRef()
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
    useEffect(() => {
        const timeout = setTimeout(() => {
            webRef.current.injectJavaScript(run);
        }, 2000);
        return () => clearTimeout(timeout)
    }, [])

    return (
        <StyledView backgroundColor='webViewBG' paddingTop='8px' flex={1}>
            <StyledText textAlign='center' color='webView' marginBottom='8px'>WebView</StyledText>
            <StyledWebView
                ref={webRef}
                source={{ uri: 'https://reactnative.dev/' }}
                automaticallyAdjustContentInsets={false}
                flex={1}
            />
        </StyledView>
    );
}

export default WebViewPage