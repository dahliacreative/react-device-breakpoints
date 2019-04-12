# React Device Breakpoints

[![Build Status](https://travis-ci.com/dahliacreative/react-device-breakpoints.svg?branch=master)](https://travis-ci.com/dahliacreative/react-device-breakpoints)
[![Maintainability](https://api.codeclimate.com/v1/badges/aa452b20e9e300e33dca/maintainability)](https://codeclimate.com/github/dahliacreative/react-device-breakpoints/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/aa452b20e9e300e33dca/test_coverage)](https://codeclimate.com/github/dahliacreative/react-device-breakpoints/test_coverage)

## Installation
```
npm i react-device-breakpoints --save
```
or with yarn:
```
yarn add react-device-breakpoints
```

## Usage
App.js
```
import React from 'react'
import { BreakpointsProvider } from 'react-device-breakpoints'

const breakpoints = [{
    name: 'isDesktop',
    query: window.matchMedia('(min-width: 1024px)')
},{
    name: 'isTablet',
    query: window.matchMedia('(max-width: 1023px) and (min-width: 768px)')
},{
    name: 'isMobile',
    query: window.matchMedia('(max-width: 767px)')
}]

const App = () => (
    <BreakpointsProvider breakpoints={breakpoints}>
        <MyComponent/>
    </BreakpointsProvider>
)

export default App
```
### With Hooks
MyComponent.js
```
import React, { useContext } from 'react'
import { useBreakpoints } from 'react-device-breakpoints'

const MyComponent = () => {
    const device = useBreakpoints()
    return (
        <div>
            {device.isDesktop &&
                <h1>Desktop</h1>
            }
            {device.isTablet &&
                <h1>Tablet</h1>
            }
            {device.isMobile &&
                <h1>Mobile</h1>
            }
            {device.isTouchDevice &&
                <h2>Touch Device</h2>
            }
        </div>
    )
}

export default MyComponent
```
### With Consumer
MyComponent.js
```
import React, { useContext } from 'react'
import { Media } from 'react-device-breakpoints'

const MyComponent = () => {
    return (
        <Media>
            {device => (
                <div>
                    {device.isDesktop &&
                        <h1>Desktop</h1>
                    }
                    {device.isTablet &&
                        <h1>Tablet</h1>
                    }
                    {device.isMobile &&
                        <h1>Mobile</h1>
                    }
                    {device.isTouchDevice &&
                        <h2>Touch Device</h2>
                    }
                </div>
            )}
        </Media>
    )
}

export default MyComponent
```

## The Device Object
React Device Breakpoints returns a device object as follows:
```
{
    [breakpointName]: Boolean
}
```

For example:
```
{
    isDesktop: true,
    isTablet: false,
    isMobile: false
}
```

It also includes a pre-built-in option for touch devices base of the following user agent test `/Mobi|Tablet|iPad|iPhone|Android/.test(window.navigator.userAgent)`
```
{
    isTouchDevice: false
}
```