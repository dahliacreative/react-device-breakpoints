import types from './types'

const reducer = (state = {}, {type, payload}) => {
    switch (type) {
        case types.CHANGE:
            return {
                ...state,
                ...payload
            }
        default: 
            return state
    }
}

export default reducer