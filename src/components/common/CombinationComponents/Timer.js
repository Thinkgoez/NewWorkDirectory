// Should fix warning: Cannot update a component (`FingerPrint`) while rendering a different component (`Timer`). To locate the bad setState() call inside `Timer`
import React, { useState, useEffect } from 'react'
import { StyledText } from '../SimpleComponents'

const Timer = ({ onDone }) => {
    const [time, setTime] = useState(59)
    const [timerId, setTimerId] = useState(null)
    useEffect(() => {
        const timer = runTimer()
        return () => {
            clearInterval(timer)
            console.log('timer cleared', timer)
        }
    }, [])

    const runTimer = () => {
        if (!timerId) {
            let id = setInterval(() => {
                if (time > 0) setTime(prev => prev - 1)
            }, 1000)
            setTimerId(id)
            return id
        }
        return timerId
    }
    if (time <= 0) {
        setTimeout(() => { onDone() }, 0) // setTimeout fixes warning described above
    }
    return <StyledText>{time} left</StyledText>
}

export default Timer