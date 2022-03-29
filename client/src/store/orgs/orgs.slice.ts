import { createSlice } from '@reduxjs/toolkit'
import { getOrgs } from './orgs.thunks'
import { OrgsState } from './orgs.types'
import catchApiError from '../../utils/catchApiError'
import { RootState } from '..'

const initialState: OrgsState = {
  isLoading: false,
  orgs: []
}

export const orgsSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {
    clearOrgs: state => {
      state.orgs = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getOrgs.pending, state => {
        state.isLoading = true
      })
      .addCase(getOrgs.fulfilled, (state, action) => {
        state.isLoading = false
        state.orgs = action.payload.orgs
      })
      .addCase(getOrgs.rejected, (state, action) => {
        state.isLoading = false
        state.orgs = []
        catchApiError(action.payload)
      })
  }
})

export const { clearOrgs } = orgsSlice.actions

export const selectOrgs = (state: RootState) => state.orgs

export default orgsSlice.reducer