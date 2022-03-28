import { createSlice } from '@reduxjs/toolkit'
import { getRoles } from './roles.thunks'
import { RolesState } from './roles.types'
import catchApiError from '../../utils/catchApiError'
import { RootState } from '..'

const initialState: RolesState = {
  isLoading: false,
  roles: []
}

export const rolesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getRoles.pending, state => {
        state.isLoading = true
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoading = false
        state.roles = action.payload.roles
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoading = false
        state.roles = []
        catchApiError(action.payload)
      })
  }
})

export const selectRoles = (state: RootState) => state.roles

export default rolesSlice.reducer