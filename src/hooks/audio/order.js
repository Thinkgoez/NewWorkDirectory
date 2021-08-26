import { useEffect, useState } from 'react';

import { ORDER_LOOP_ALL, ORDER_MIX } from '../../constants'

export const useSoundOrder = (soundList, playingId, order) => {
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)

    const currentIndex = soundList.findIndex(el => el.id === playingId)
    // console.log('playingId', playingId)
    // console.log('currentIndex', currentIndex)
    // console.log('ORDER_MIX === order', ORDER_MIX === order)
    // console.log('Current order mode', order)
    useEffect(() => {
        if (currentIndex !== -1) {
            switch (order) {
                case ORDER_LOOP_ALL: {
                    if (soundList[currentIndex + 1]) {
                        setNext(soundList[currentIndex + 1].id)
                    } else {
                        setNext(soundList[0].id)
                    }
                    if (currentIndex > 0) {
                        setPrev(soundList[currentIndex - 1].id)
                    } else {
                        setPrev(soundList[soundList.length - 1].id)
                    }
                    console.log('loop all')
                }
                    break;
                case ORDER_MIX: {
                    let randomId
                    do {
                        randomId = Math.floor(Math.random() * soundList.length)
                    } while (randomId === currentIndex)
                    setNext(soundList[randomId].id)
                    setPrev(soundList[randomId].id)
                    break;
                }
                default: {
                    if (soundList[currentIndex + 1]) {
                        setNext(soundList[currentIndex + 1].id)
                    } else {
                        setNext(null)
                    }
                    if (currentIndex > 0) {
                        setPrev(soundList[currentIndex - 1].id)
                    } else {
                        setPrev(null)
                    }
                }
                    break;
            }
        }
        // console.log('next', next)
        // console.log('prev', prev)
    }, [currentIndex, order])
    return { next, prev }
}