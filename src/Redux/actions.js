import types from './types'

const change = bp => ({
    type: types.CHANGE,
    payload: bp
})

export default {
    change
}