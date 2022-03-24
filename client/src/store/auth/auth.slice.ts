import { createSlice } from '@reduxjs/toolkit'
import { auth, login } from './auth.thunks'
import { AuthState } from './auth.types'
import { message } from 'antd'
import catchApiError from '../../utils/catchApiError'
import storage from '../../utils/storage'
import { RootState } from '..'

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  isReady: false,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setReady: state => {
      state.isReady = true
    },
    logout: state => {
      state.isAuth = false
      state.user = null
      storage.remove('token')
      message.success('Вы успешно вышли')
    }
  },
  extraReducers: builder => {
    builder
      .addCase(auth.fulfilled, (state, action) => {
        state.isAuth = true
        state.isReady = true
        state.user = action.payload
      })
      .addCase(auth.rejected, state => {
        state.isAuth = false
        state.isReady = true
        state.user = null
        storage.remove('token')
      })
      .addCase(login.pending, state => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true
        state.isLoading = false
        state.user = action.payload.user
        storage.set('token', action.payload.token)
        message.success('Вы успешно авторизовались')
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuth = false
        state.isLoading = false
        state.user = null
        catchApiError(action.payload)
      })
  }
})

export const { setReady, logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer