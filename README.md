# React Device Breakpoints

## Installation
```
npm i react-device-breakpoints --save
```
or with yarn:
```
yarn add react-device-breakpoints
```

## Usage
### Without Redux

App.js
```
import React, { useState } from 'react'
import { Device } from 'react-device-breakpoints'

const breakpoints = [{
    name: 'isDesktop',
    query: window.matchMedia('min-width: 1024px')
},{
    name: 'isTablet',
    query: window.matchMedia('(max-width: 1023px) and (min-width: '768px')')
},{
    name: 'isMobile',
    query: window.matchMedia('max-width: 767px')
}]

const App = () => {
    const [device, updateDevice] = useState({})
    const deviceChange = (breakpoint) => {
        updateDevice({
            ...device,
            ...breakpoint
        })
    }
    return (
        <div>
            <Device breakpoints={breakpoints} onChange={deviceChange}/>
            <MyComponent device={device}/>
        </div>
    )
}

export default App
```

MyComponent.js
```
import React from 'react'

const MyComponent = ({device}) => (
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

export default MyComponent
```

### With Redux

App.js
```
import React from 'react'
import { ReduxDevice as Device } from 'react-device-breakpoints'
import Store from './store.js'

const breakpoints = [{
    name: 'isDesktop',
    query: window.matchMedia('min-width: 1024px')
},{
    name: 'isTablet',
    query: window.matchMedia('(max-width: 1023px) and (min-width: '768px')')
},{
    name: 'isMobile',
    query: window.matchMedia('max-width: 767px')
}]

const App = () => (
    <Provider store={Store}>
        <Device breakpoints={breakpoints}/>
        <MyComponent/>
    </Provider>
)

export default App
```

MyComponent.js
```
import React from 'react'
import { Connect } from 'react-redux'

const MyComponent = ({device}) => (
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

mapStateToProps = state => ({
    device: state.device
})
export default connect(mapStateToProps)(MyComponent)
```

Store.js
```
import { createStore, combineReducers } from 'redux'
import { DeviceReducer as device } from 'react-device-breakpoints'

const Store = createStore(
    combineReducers({
        ...myReducers,
        device
    })
)

export default Store
```