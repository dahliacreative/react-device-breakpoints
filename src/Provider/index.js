import React, { useState, useEffect } from 'react'
import { Provider } from '../Context'

const createListener = (onChange, bp) => ({ matches }) => {
    onChange({
        [bp.key]: matches
    })
}

const BreakpointsProvider = ({children, breakpoints}) => {
    const [activeBreakpoint, updateBreakpoint] = useState()
    const [device, updateDevice] = useState(breakpoints.reduce((acc, bp) => ({
        ...acc,
        [bp.key]: bp.query.matches
    }), {
        isTouchDevice: /Mobi|Tablet|iPad|iPhone|Android/.test(window.navigator.userAgent)
    }))

    const onChange = bp => {
        updateBreakpoint(bp)
    }

    useEffect(() => {
        updateDevice({
            ...device,
            ...activeBreakpoint
        })
    }, [activeBreakpoint])

    useEffect(() => {
        const listeners = breakpoints.map(bp => {
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

const Breakpoints = ({children, ...props}) => {
    const [breakpoints, defineBreakpoints] = useState(null)
    useEffect(() => {
        defineBreakpoints(Object.entries(props).map(([key, query]) => ({
            key,
            query: window.matchMedia(query)
        })))
    },[])
    return breakpoints ? <BreakpointsProvider breakpoints={breakpoints}>{children}</BreakpointsProvider> : null
}

export default Breakpoints