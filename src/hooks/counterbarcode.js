import { useEffect, useState } from 'react';

export const useCounterBarcodeError = () => {
    const [error, setError] = useState(false)
    const [counter, setCounter] = useState(0)
    const [visible, setVisible] = useState(false)
    const [intervalId, setIntervalId] = useState(false)
    useEffect(() => {
        startTimer()
        startInterval()
    }, [])
    useEffect(() => () => {
        clearInterval(intervalId)
    }, [intervalId])

    const incrementCounter = () => {
        setCounter(c => c + 1)
    }
    const triggerError = () => {
        setError(true)
        // setTimeout(() => {setError(false)}, 2000)
    }
    const startTimer = () => {
        setTimeout(() => {
            setVisible(true)
        }, 2000)
    }
    const startInterval = () => {
        const id = setInterval(randomize, 3000)
        setIntervalId(id)
    }
    const randomize = () => {
        const randomNumber = (Math.random() * 10) - 5
        if(randomNumber > 0){
            incrementCounter()
            setError(false)
        } else {
            triggerError()
        }
    }
    return [error, counter, visible]
}