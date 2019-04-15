import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
 
Enzyme.configure({ adapter: new Adapter() })
window.matchMedia = () => ({
    matches: true,
    addListener: (listener) => {
        listener({
            isDesktop: false
        })
    },
    removeListener: () => {}
})