import React from 'react'
import { mount } from 'enzyme'

import Provider from '../Provider'
import Consumer from './'

const breakpoints = {
    isDesktop: '(min-width: 1024px)',
    isTablet: '(max-width: 1023px) and (min-width: 768px)',
    isMobile: '(max-width: 767px)'
}

describe('<Consumer />', () => {
    it('returns a device object', () => {
        const component = mount(
            <Provider {...breakpoints}>
                <Consumer>
                    {(device, Device) => {
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
                                <Device.isDesktop>
                                    <h1>Desktop</h1>
                                </Device.isDesktop>
                                <Device.isTablet>
                                    <h1>Tablet</h1>
                                </Device.isTablet>
                                <Device.isMobile>
                                    <h1>Mobile</h1>
                                </Device.isMobile>
                                <Device.isTouchDevice>
                                    <h1>Touch Device</h1>
                                </Device.isTouchDevice>
                            </div>
                        )
                    }}
                </Consumer>
            </Provider>
        )
        expect(component).toMatchSnapshot()
    })
})