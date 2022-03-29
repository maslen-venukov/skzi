import { createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import { getUsers, updateUser } from './users.thunks'
import { UsersState } from './users.types'
import catchApiError from '../../utils/catchApiError'
import { RootState } from '..'

const initialState: UsersState = {
  isLoading: false,
  users: []
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: state => {
      state.users = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.users
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.users = []
        catchApiError(action.payload)
      })
      .addCase(updateUser.pending, state => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = state.users.map(user => (
          user.id === action.payload.user.id ? action.payload.user : user
        ))
        message.success(action.payload.message)
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        catchApiError(action.payload)
      })
  }
})

export const { clearUsers } = usersSlice.actions

export const selectUsers = (state: RootState) => state.users

export default usersSlice.reducer