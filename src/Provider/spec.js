import React from 'react'
import { mount } from 'enzyme'

import Provider from './'
import useBreakpoints from '../Hooks'

const breakpoints = {
    isDesktop: '(min-width: 1024px)',
    isTablet: '(max-width: 1023px) and (min-width: 768px)',
    isMobile: '(max-width: 767px)'
}

const Consumer = () => {
    const device = useBreakpoints()
    return <p>{JSON.stringify(device)}</p>
}

describe('<Provider />', () => {
    it('renders given children', () => {
        const component = mount(
            <Provider>
                <h1>React Device Breakpoints FTW!</h1>
            </Provider>
        ) 
        expect(component).toMatchSnapshot()
    })

    it('renders provider with given queries', () => {
        const component = mount(
            <Provider {...breakpoints}>
                <h1>React Device Breakpoints FTW!</h1>
                <Consumer />
            </Provider>
        )
        const consumer = component.find(Consumer)
        expect(component).toMatchSnapshot()
        expect(consumer).toMatchSnapshot()
    })

    it('removes listeners when unmounting', () => {
        const component = mount(
            <Provider {...breakpoints}>
                <h1>React Device Breakpoints FTW!</h1>
            </Provider>
        )
        component.unmount()
        expect(component).toMatchSnapshot()
    })
})