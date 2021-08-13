import { useEffect, useState } from 'react';

export const useBarcode = () => {
    const [error, setError] = useState(false)

    useEffect(() => {
        eventHandler()
    }, [])

    const eventHandler = () => {
        // DO some stuff
        const str = 'a'
        if (/[a-z]/.test(str)) {
            setError(false)
        } else {
            setError(true)
            setTimeout(() => {setError(false)}, 3000)
        }
    }
    return error
}