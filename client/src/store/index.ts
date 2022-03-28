import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/auth.slice'
import users from './users/users.slice'
import roles from './roles/roles.slice'

const store = configureStore({
  reducer: {
    auth,
    users,
    roles
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>

export type TypedDispatch = typeof store.dispatch

export default store