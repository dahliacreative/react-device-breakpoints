import React, { useState, useEffect } from 'react'
import { Provider } from '../Context'

const createListener = (onChange, bp) => ({ matches }) => {
    onChange({
        [bp.name]: matches
    })
}

const Breakpoints = ({children, ...props}) => {

    const breakpoints = Object.entries(props).map((key, query) => ({
        key,
        query: window.matchMedia(query)
    }))

    const defaultState = breakpoints.reduce((acc, bp) => ({
        ...acc,
        [bp.key]: bp.query.matches
    }), {
        isTouchDevice: /Mobi|Tablet|iPad|iPhone|Android/.test(window.navigator.userAgent)
    })

    const [device, updateDevice] = useState(defaultState)

    const onChange = bp => {
        updateDevice({
            ...device,
            ...bp
        })
    }

    useEffect(() => {
        const listeners = breakpoints.map((bp, i) => {
            const listener = createListener(onChange, bp)
            bp.query.addListener(listener)
            return listener
        })

        return () => {
            breakpoints.forEach((bp, i) => {
                bp.query.removeListener(listeners[i])
            })
        }
    }, [])

    return <Provider value={device}>{children}</Provider>
}

export default Breakpoints