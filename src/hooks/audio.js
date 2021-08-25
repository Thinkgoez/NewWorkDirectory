import { useEffect, useState, useRef, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import Sound from 'react-native-sound';
import MusicControl, { Command } from 'react-native-music-control'

export const useAudio = (audioInfo) => {
    const [isPlaying, setIsPLaying] = useState(false)
    const gifRef = useRef(null)
    const [sound, setSound] = useState(null)
    const [progress, setProgress] = useState(0)
    const [timerId, setTimerId] = useState(null)
    const onLoad = useCallback(() => {
        try {
            if (Platform.OS === 'ios') {
                if (audioInfo.isRequire) {
                    Sound.setCategory('Playback', true)
                    const soundInstance = new Sound(audioInfo.url, error => callback(error, soundInstance));
                } else {
                    const soundInstance = new Sound(audioInfo.url, audioInfo.basePath, error => callback(error, soundInstance));
                }
            } else {
                if (audioInfo.isRequire) {
                    const soundInstance = new Sound(audioInfo.url, error => callback(error, soundInstance));
                } else {
                    const soundInstance = new Sound(audioInfo.url, audioInfo.basePath, error => callback(error, soundInstance));
                }
            }

        } catch (err) {
            console.log('fail to load sound:', err)
        }
    }, [audioInfo])
    useEffect(() => () => { // return clean interval
        clearInterval(timerId)
        console.log('cleared', timerId)
    }, [timerId])

    useEffect(() => onPause, [sound])
    useEffect(() => {
        // if (sound) musicControlsDefine()
    }, [sound])

    const callback = useCallback((error, sound) => {
        if (error) {
            Alert.alert('error', error.message);
            setIsPLaying(false)
        } else {
            setSound(sound)
            playAudio(sound)
            // soundPlayControl(sound)
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

    const musicControlsDefine = () => {
        MusicControl.enableBackgroundMode(true);
        // MusicControl.handleAudioInterruptions(true);

        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)
        MusicControl.enableControl('changePlaybackPosition', true)
        MusicControl.enableControl('closeNotification', true, { when: 'always' })
    }

    const musicControlSubscribe = useCallback((instance = sound) => {
        MusicControl.on(Command.play, () => {
            onPlay(instance)
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING,
            })
        })
        MusicControl.on(Command.pause, () => {
            onPause(instance)

        })
        MusicControl.on(Command.closeNotification, () => {
            onPause(instance)
        })
    }, [onPlay, onPause])

    const clearSoundControl = () => {
        //     MusicControl.off(Command.play)
        //     MusicControl.off(Command.pause)
        //     MusicControl.off(Command.closeNotification)
    }

    const soundPlayControl = (sound) => {
        musicControlSubscribe(sound)
        console.log('Duration:', sound.getDuration())
        MusicControl.setNowPlaying({
            title: audioInfo.title,
            duration: sound.getDuration(), // (Seconds)
        })
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
            elapsedTime: 1,
        })

    }

    const onPause = useCallback((instance = sound) => {
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
        })
        if (instance) {
            gifRef.current?.pause()
            instance.pause()
            clearInterval(timerId)
            setIsPLaying(false)
        }
    }, [sound, timerId, gifRef])

    const onPlay = useCallback((instance = sound) => {
        if (instance) {
            soundPlayControl(instance)
            playAudio(instance)
        }
    }, [sound, playAudio])

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
        clearSoundControl,
        isOpen: !!sound,
        progress,
        isPlaying,
        gifRef
    }
}