import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Sound from 'react-native-sound';

export const useAudio = (audioInfo) => {
    const [status, setStatus] = useState('')
    const [sound, setSound] = useState(null)
    const [progress, setProgress] = useState(0)
    const [timerId, setTimerId] = useState(null)
    const onLoad = () => {
        setStatus('pending');
        if (audioInfo.isRequire) {
            const sound = new Sound(audioInfo.url, error => callback(error, sound));
        } else {
            const sound = new Sound(audioInfo.url, audioInfo.basePath, error => callback(error, sound));
        }
    }
    useEffect(() => () => { // return clean interval
        clearInterval(timerId)
        console.log('cleared', timerId)
    }, [timerId])
    useEffect(() => onPause, [sound])

    const onPause = () => {
        clearInterval(timerId)
        if (sound) {
            sound.pause()
            setStatus('pause')
        }
    }
    const callback = (error, sound) => {
        if (error) {
            Alert.alert('error', error.message);
            setStatus('fail');
        } else {
            setSound(sound)
            playAudio(sound)
        }
    };
    const playAudio = (sound) => {
        setTimerId(setInterval(getTime, 1000, sound))
        setStatus('playing');
        sound.play(() => {
            setStatus('end');
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
        isLoaded: !!sound,
        progress,
        status
    }
}