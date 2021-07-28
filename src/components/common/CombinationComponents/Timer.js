// Should fix warning: Cannot update a component (`FingerPrint`) while rendering a different component (`Timer`). To locate the bad setState() call inside `Timer`
import React, { useState, useEffect } from 'react'
import { StyledText } from '../SimpleComponents'

const Timer = ({ onDone }) => {
    const [time, setTime] = useState(5)
    const [timerId, setTimerId] = useState(null)
    useEffect(() => {
        runTimer()
        return () => {
            console.log('timer cleared', timerId)
        }
    }, [])

    const runTimer = () => {
        if (!timerId) {
            let id = setInterval(() => {
                if (time > 0) setTime(prev => prev - 1)
            }, 1000)
            setTimerId(id)
        }
    }
    if (time <= 0) {
        clearInterval(timerId)
        onDone()
    }
    return <StyledText>{time} left</StyledText>
}

export default Timer