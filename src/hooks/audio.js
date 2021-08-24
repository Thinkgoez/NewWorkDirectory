import {useEffect, useState, useRef, useCallback} from 'react';
import { Alert } from 'react-native';
import Sound from 'react-native-sound';

export const useAudio = (audioInfo) => {
    const [isPlaying, setIsPLaying] = useState(false)
    const gifRef = useRef(null)
    const [sound, setSound] = useState(null)
    const [progress, setProgress] = useState(0)
    const [timerId, setTimerId] = useState(null)
    const onLoad = useCallback(() => {
        try {
            if (audioInfo.isRequire) {
                const soundInstance = new Sound(audioInfo.url, error => callback(error, soundInstance));
            } else {
                const soundInstance = new Sound(audioInfo.url, audioInfo.basePath, error => callback(error, soundInstance));
            }
        } catch (err) {
            console.log('fail to load sound:', err)
        }
    },[audioInfo])
    useEffect(() => () => { // return clean interval
        clearInterval(timerId)
        console.log('cleared', timerId)
    }, [timerId])
    useEffect(() => onPause, [sound])

    const onPause = useCallback(() => {
        clearInterval(timerId)
        gifRef.current?.pause()
        if (sound) {
            sound.pause()
            setIsPLaying(false)
        }
    }, [sound, timerId, gifRef.current])
    const callback = useCallback((error, sound) => {
        if (error) {
            Alert.alert('error', error.message);
            setIsPLaying(false)
        } else {
            setSound(sound)
            playAudio(sound)
        }
    }, [playAudio])
    const playAudio = useCallback((sound) => {
        setTimerId(setInterval(getTime, 1000, sound))
        setIsPLaying(true)
        gifRef.current?.play()
        sound.play(() => {
            setIsPLaying(false)
            gifRef.current?.pause()
            setProgress(1)
            clearInterval(timerId)
        });
    }, [getTime, gifRef, timerId])
    const onPlay = useCallback(() => {
        if (sound) {
            playAudio(sound)
        }
    }, [sound])
    const getTime = (sound) => {
        if (sound) {
            sound.getCurrentTime(secs => {
                let currProgress = secs / sound.getDuration()
                setProgress(currProgress)
            })
        }
    }
    const onReset = useCallback(() => {
            if (sound) {
                sound.setCurrentTime(0)
                onPause()
                setProgress(0)
            }
        }, [sound, onPause])

    const onRewind = useCallback((ratio) => {
        if (sound) {
            const position = sound.getDuration() / ratio
            sound.setCurrentTime(position)
            getTime(sound)
        }
    }, [sound, getTime])
    return {
        onReset,
        onPlay,
        onLoad,
        onPause,
        onRewind,
        isOpen: !!sound,
        progress,
        isPlaying,
        gifRef
    }
}