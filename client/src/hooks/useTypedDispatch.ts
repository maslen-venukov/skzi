import { useDispatch } from 'react-redux'
import { TypedDispatch } from '../store'

const useTypedDispatch = () => useDispatch<TypedDispatch>()

export default useTypedDispatch