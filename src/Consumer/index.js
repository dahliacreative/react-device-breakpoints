import React from 'react'
import { Consumer } from '../Context'

const generateComponents = device => {
    const components = {}
    Object.entries(device).forEach(([key, matches]) => {
        components[key] = ({ children }) => {
            return matches ? children : null
        }
    })
    return components
}

const Media = ({ children }) => (
    <Consumer>
        {device => children(device, generateComponents(device))}
    </Consumer>
)

export default Media