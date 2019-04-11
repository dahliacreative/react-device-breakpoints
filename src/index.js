import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Breakpoints = createContext()

const breakpointChange = (updateState, bp) => ({ matches }) => {
    updateState({
      [bp.name]: matches
    })
}

const BreakpointsProvider = ({ breakpoints, children }) => {
    const [device, updateDevice] = useState(breakpoints.reduce((acc, bp) => ({
        ...acc,
        [bp.name]: bp.query.matches
    }),{
        isTouchDevice: /Mobi|Tablet|iPad|iPhone|Android/.test(window.navigator.userAgent)
    }))
    const updateState = (bp) => {
        updateDevice({
            ...device,
            ...bp
        })
    }
    useEffect(() => {
        const listeners = breakpoints.map((bp, i) => {
            const listener = breakpointChange(updateState, bp)
            bp.query.addListener(listener)
            return listener
        })
        return () => {
          breakpoints.forEach((bp, i) => {
            bp.query.removeListener(listeners[i])
          })
        }
    }, [])
    return <Breakpoints.Provider value={device}>{children}</Breakpoints.Provider>
}

BreakpointsProvider.propTypes = {
    breakpoints: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        query: PropTypes.object.isRequired
      })
    ).isRequired
}

export {
    BreakpointsProvider,
    Breakpoints
}