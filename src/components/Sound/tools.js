import 'react-native-get-random-values';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs'
import { v4 as uuidv4 } from 'uuid';

import { musicDirectory } from '../../constants'

const hasAndroidStoragePermission = async () => {
    const permissions = [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
    const hasWPermission = await PermissionsAndroid.check(permissions[0]);
    const hasRPermission = await PermissionsAndroid.check(permissions[1]);
    if (hasWPermission && hasRPermission) {
        return true;
    }
    const status = await PermissionsAndroid.requestMultiple(permission);
    return status === 'granted';
}
export const createNewSound = async (title, originUrl) => {
// ULTRA SUPER POWER MEGA GALAXY GAMING PLUS PREMIAL function
    if (Platform.OS === 'android' && await hasAndroidStoragePermission()) {
        try {
            const id = uuidv4()
            try {
                const res = await RNFS.readDir(musicDirectory)
                console.log('musicDirectory:', res)
            } catch (err) {
                await RNFS.mkdir(musicDirectory)
            }
            try {
                const fileResult = await RNFS.readFile(originUrl, 'base64')
                try {
                    let path = (musicDirectory + title.replaceAll(/[ -]/g, '_')).toLocaleLowerCase() // 
                    const exist = await RNFS.exists(path)
                    if (exist) {
                        console.log('File already exist:', path)
                        return ['File already added', null]
                    } else {
                        await RNFS.writeFile(path, fileResult, 'base64')
                        console.log('writen')
                        return [null, { title, url: path, id }]
                    }

                } catch (err) {
                    console.log('fail to write:', err)
                }
            } catch (err) {
                console.log('didn`t read file', err)
                return ['Cannot read file', null]
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
    return ['Error', null]
}