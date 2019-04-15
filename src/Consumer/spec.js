import React from 'react'
import { mount } from 'enzyme'

import Provider from '../Provider'
import Consumer from './'

const breakpoints = {
    Desktop: '(min-width: 1024px)',
    Tablet: '(max-width: 1023px) and (min-width: 768px)',
    Mobile: '(max-width: 767px)'
}

describe('<Consumer />', () => {
    it('returns a device object', () => {
        const component = mount(
            <Provider {...breakpoints}>
                <Consumer>
                    {(device, Device) => {
                        return (
                            <div>
                                {/* {device.Desktop &&
                                    <h1>Desktop</h1>
                                }
                                {device.Tablet &&
                                    <h1>Tablet</h1>
                                }
                                {device.Mobile &&
                                    <h1>Mobile</h1>
                                }
                                {device.TouchDevice &&
                                    <h2>Touch Device</h2>
                                }
                                <Device.Desktop>
                                    <h1>Desktop</h1>
                                </Device.Desktop>
                                <Device.Tablet>
                                    <h1>Tablet</h1>
                                </Device.Tablet>
                                <Device.Mobile>
                                    <h1>Mobile</h1>
                                </Device.Mobile>
                                <Device.TouchDevice>
                                    <h1>Touch Device</h1>
                                </Device.TouchDevice> */}
                            </div>
                        )
                    }}
                </Consumer>
            </Provider>
        )
        expect(component).toMatchSnapshot()
    })
})