import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs'

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
export const compileNewPathToSound = async (title, originUrl) => {
    // console.log(originUrl)
    if (await hasAndroidStoragePermission()) {
        try {
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
                    await RNFS.writeFile(path, fileResult, 'base64')
                    console.log('writen')
                    return { title, url: path }
                } catch (err) {
                    console.log('fail to write:', err)
                }
            } catch (err) {
                console.log('doesn`t readfile', err)
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
    return false
}