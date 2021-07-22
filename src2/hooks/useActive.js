import React, { useState } from 'react'

export function useActive(navigation) {
    // This hook subscribe the blur and focus events on Screens and change the flag isActive
    const [isActive, setIsActive] = useState(navigation.isFocused())

    React.useEffect(() => {
        const unBlur = navigation.addListener('blur', () => {
            setIsActive(false)
        });
        const unFocus = navigation.addListener('focus', () => {
            setIsActive(true)
        });
        const unsubscribe = () => {
            unBlur()
            unFocus()
        }
        return unsubscribe;
    }, [navigation]);
    return isActive
}