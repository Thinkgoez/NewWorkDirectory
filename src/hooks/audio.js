import { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import Sound from 'react-native-sound';

export const useAudio = (audioInfo) => {
    const [isPlaying, setIsPLaying] = useState(false)
    const gifRef = useRef(null)
    const [sound, setSound] = useState(null)
    const [progress, setProgress] = useState(0)
    const [timerId, setTimerId] = useState(null)
    const onLoad = () => {
        // setStatus('pending'); // TODO rework to loading with loader
        try {
            if (audioInfo.isRequire) {
                const soundInstance = new Sound(audioInfo.url, error => callback(error, soundInstance));
            } else {
                const soundInstance = new Sound(audioInfo.url, audioInfo.basePath, error => callback(error, soundInstance));
            }
        } catch (err) {
            console.log('fail to load sound:', err)
        }
    }
    useEffect(() => () => { // return clean interval
        clearInterval(timerId)
        console.log('cleared', timerId)
    }, [timerId])
    useEffect(() => onPause, [sound])

    const onPause = () => {
        clearInterval(timerId)
        gifRef.current?.pause()
        if (sound) {
            sound.pause()
            setIsPLaying(false)
            // setStatus('pause')
        }
    }
    const callback = (error, sound) => {
        if (error) {
            Alert.alert('error', error.message);
            setIsPLaying(false)
            // setStatus('fail');
        } else {
            setSound(sound)
            playAudio(sound)
        }
    };
    const playAudio = (sound) => {
        setTimerId(setInterval(getTime, 1000, sound))
        // setStatus('playing');
        setIsPLaying(true)
        gifRef.current?.play()
        sound.play(() => {
            // setStatus('end');
            setIsPLaying(false)
            setProgress(1)
            clearInterval(timerId)
        });
    }
    const onPlay = () => {
        if (sound) {
            playAudio(sound)
        }
    }
    const getTime = (sound) => {
        if (sound) {
            sound.getCurrentTime(secs => {
                let currProgress = secs / sound.getDuration()
                setProgress(currProgress)
            })
        }
    }
    const onReset = () => {
        if (sound) {
            sound.setCurrentTime(0)
            onPause()
            setProgress(0)
        }
    }
    const onRewind = (ratio) => {
        if (sound) {
            const position = sound.getDuration() / ratio
            sound.setCurrentTime(position)
            getTime(sound)
        }
    }
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