import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Routes, Route, Navigate } from 'react-router-dom'
import Wrapper from './components/Wrapper'
import Loader from './components/Loader'
import authStore from './store/auth/auth.store'
import storage from './utils/storage'

const Login = React.lazy(() => import('./pages/Login'))

const App: React.FC = () => {
  const { isReady, user, auth, setReady } = authStore

  useEffect(() => {
    const token = storage.get<string>('token')
    token ? auth() : setReady(true)
  }, [auth, setReady])

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

export default observer(App)