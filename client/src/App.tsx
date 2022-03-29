import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Wrapper from './components/Wrapper'
import Loader from './components/Loader'
import { auth } from './store/auth/auth.thunks'
import { setReady, selectAuth } from './store/auth/auth.slice'
import useTypedDispatch from './hooks/useTypedDispatch'
import useTypedSelector from './hooks/useTypedSelector'
import storage from './utils/storage'

const Login = React.lazy(() => import('./pages/Login'))

const App: React.FC = () => {
  const dispatch = useTypedDispatch()
  const { isReady, user } = useTypedSelector(selectAuth)

  useEffect(() => {
    const token = storage.get<string>('token')
    dispatch(token ? auth() : setReady())
  }, [dispatch])

  if(!isReady) {
    return <Loader />
  }

  if(!auth || !user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<Loader />}>
              <Login />
            </React.Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Wrapper />
  )
}

export default App