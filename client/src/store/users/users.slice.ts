import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from './users.thunks'
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
  reducers: {},
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
  }
})

export const selectUsers = (state: RootState) => state.users

export default usersSlice.reducer