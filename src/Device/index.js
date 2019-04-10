import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const breakpointChange = (onChange, bp) => ({ matches }) => {
  onChange({
    [bp.name]: matches
  })
}

const Devices = ({ onChange, breakpoints, children }) => {
  useEffect(() => {
    onChange(breakpoints.reduce((acc, bp) => ({
        ...acc,
        [bp.name]: bp.query.matches
    }),{
        isTouchDevice: /Mobi|Tablet|iPad|iPhone|Android/.test(window.navigator.userAgent)
    }))
    const listeners = []
    breakpoints.forEach((bp, i) => {
      const listener = breakpointChange(onChange, bp)
      listeners.push(listener)
      bp.query.addListener(listeners[i])
    })
    return () => {
      breakpoints.forEach((bp, i) => {
        bp.query.removeListener(listeners[i])
      })
    }
  }, [])
  return <>{children}</>
}

Devices.propTypes = {
    onChange: PropTypes.func,
    breakpoints: PropTypes.shape({
        name: PropTypes.string.isRequired,
        query: PropTypes.string.isRequired
    }).isRequired
}

export default Devices
