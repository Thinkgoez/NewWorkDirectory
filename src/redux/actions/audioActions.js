import RNFS from 'react-native-fs'
import { musicDirectory } from '../../constants'

export const addAudio = (payload) => ({ type: 'ADD_AUDIO_ITEM', payload })
export const addAudioList = (payload) => ({ type: 'ADD_AUDIO_LIST', payload })
export const fetchAdios = (payload) => ({ type: 'FETCH_ADIOS', payload })
export const removeAudio = (payload) => ({ type: 'REMOVE_AUDIO', payload })
export const clearAudioStore = (payload) => {
    clearStorageFiles()
    return { type: 'CLEAR_AUDIO_STORE', payload }
}

const clearStorageFiles = async () => {
    try {
        await RNFS.unlink(musicDirectory)
        console.log('Music directory successfully cleared ')
    } catch (err) {
        console.log('deleting directory error:', err)
    }
}