import { useEffect, useState, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import Sound from 'react-native-sound';
import MusicControl, { Command } from 'react-native-music-control'

export const useAudio = (audioInfo, currentPlaying, setCurrentPlaying) => {
    const [isPlaying, setIsPLaying] = useState(false)
    const [timerId, setTimerId] = useState(null)
    const [progress, setProgress] = useState(0)
    const [sound, setSound] = useState(null)

    const gifRef = useRef(null)

    useEffect(() => () => { // return clean interval
        clearInterval(timerId)
        // console.log('cleared', timerId)
    }, [timerId])

    useEffect(() => {
        if (sound) musicControlsDefine()
        return onPause
    }, [sound])

    const playAudio = useCallback((sound) => {
        sound.getCurrentTime(playSoundControl)
        setTimerId(setInterval(getTime, 1000, sound))
        setIsPLaying(true)
        gifRef.current?.play()

        sound.play(() => {
            pauseAudio(sound)
            setProgress(1)
        });
    }, [getTime, gifRef, pauseAudio])

    const pauseAudio = useCallback((instance = sound) => {
        instance.pause()
        gifRef.current?.pause()
        clearInterval(timerId)
        setIsPLaying(false)
    }, [gifRef, timerId, sound])

    const musicControlSubscribe = useCallback((instance) => {
        MusicControl.on(Command.play, () => {
            playAudio(instance)
        })
        MusicControl.on(Command.pause, () => {
            onPause(instance)

        })
        MusicControl.on(Command.closeNotification, () => {
            onPause(instance)
        })
    }, [playAudio, onPause])

    const initSoundControl = (sound) => {
        musicControlSubscribe(sound)
        MusicControl.setNowPlaying({
            title: audioInfo.title,
            duration: sound.getDuration(),
        })
        sound.getCurrentTime(playSoundControl)
    }
    const getTime = (sound) => {
        if (sound) {
            sound.getCurrentTime(secs => {
                let currProgress = secs / sound.getDuration()
                setProgress(currProgress)
            })
        }
    }

    const onPause = useCallback((instance = sound) => {
        if (instance) {
            instance.getCurrentTime(pauseSoundControl)
            pauseAudio(instance)
        }
    }, [sound, pauseAudio])

    const onPlay = useCallback((instance = sound) => {
        if (instance) {
            if (currentPlaying !== audioInfo.id) {
                setCurrentPlaying(audioInfo.id)
                initSoundControl(instance)
            }
            playAudio(instance)
        }
    }, [sound, playAudio, currentPlaying])

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
            MusicControl.updatePlayback({ elapsedTime: position })
            getTime(sound)
        }
    }, [sound, getTime])

    const onLoad = useCallback(() => {
        try {
            if (audioInfo.isRequire) {
                const soundInstance = new Sound(audioInfo.url, error => initialSoundCallback(error, soundInstance));
            } else {
                const soundInstance = new Sound(audioInfo.url, audioInfo.basePath, error => initialSoundCallback(error, soundInstance));
            }
            setCurrentPlaying(audioInfo.id)
        } catch (err) {
            console.log('fail to load sound:', err)
        }
    }, [audioInfo])

    const initialSoundCallback = useCallback((error, sound) => {
        if (error) {
            Alert.alert('error', error.message);
            setIsPLaying(false)
        } else {
            setSound(sound)
            playAudio(sound)
            initSoundControl(sound)
        }
    }, [playAudio])

    const musicControlsDefine = () => {
        MusicControl.enableBackgroundMode(true);
        // MusicControl.handleAudioInterruptions(true);

        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)
        MusicControl.enableControl('changePlaybackPosition', true)
        MusicControl.enableControl('closeNotification', true, { when: 'always' })
    }
    const playSoundControl = (seconds) => {
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
            elapsedTime: seconds
        })
    }
    const pauseSoundControl = (seconds) => {
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
            elapsedTime: seconds
        })
    }

    return {
        onReset,
        onPlay,
        onLoad,
        onPause,
        onRewind,
        onChangedMusic: pauseAudio,
        isOpen: !!sound,
        progress,
        isPlaying,
        gifRef
    }
}