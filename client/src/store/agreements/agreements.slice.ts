import { createSlice } from '@reduxjs/toolkit'
import { getAgreements } from './agreements.thunks'
import { AgreementsState } from './agreements.types'
import catchApiError from '../../utils/catchApiError'
import { RootState } from '..'

const initialState: AgreementsState = {
  isLoading: false,
  agreements: []
}

export const agreementsSlice = createSlice({
  name: 'agreements',
  initialState,
  reducers: {
    clearAgreements: state => {
      state.agreements = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAgreements.pending, state => {
        state.isLoading = true
      })
      .addCase(getAgreements.fulfilled, (state, action) => {
        state.isLoading = false
        state.agreements = action.payload.agreements
      })
      .addCase(getAgreements.rejected, (state, action) => {
        state.isLoading = false
        state.agreements = []
        catchApiError(action.payload)
      })
  }
})

export const { clearAgreements } = agreementsSlice.actions

export const selectAgreements = (state: RootState) => state.agreements

export default agreementsSlice.reducer