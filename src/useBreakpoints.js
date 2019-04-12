import { useContext } from 'react'
import Context from './context'

const useBreakpoints = () => useContext(Context)

export default useBreakpoints