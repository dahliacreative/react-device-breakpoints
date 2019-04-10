import { connect } from 'react-redux'
import actions from './actions'
import Device from '../Device'

const mapDispatchToProps = dispatch => ({
    onChange: bp => dispatch(actions.change(bp))
})

export default connect(null, mapDispatchToProps)(Device)