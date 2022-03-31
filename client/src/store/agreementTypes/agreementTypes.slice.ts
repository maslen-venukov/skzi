import { createSlice } from '@reduxjs/toolkit'
import { getAgreementTypes } from './agreementTypes.thunks'
import { AgreementTypesState } from './agreementTypes.types'
import catchApiError from '../../utils/catchApiError'
import { RootState } from '..'

const initialState: AgreementTypesState = {
  isLoading: false,
  types: []
}

export const agreementTypesSlice = createSlice({
  name: 'agreementTypes',
  initialState,
  reducers: {
    clearAgreementTypes: state => {
      state.types = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAgreementTypes.pending, state => {
        state.isLoading = true
      })
      .addCase(getAgreementTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.types = action.payload.types
      })
      .addCase(getAgreementTypes.rejected, (state, action) => {
        state.isLoading = false
        state.types = []
        catchApiError(action.payload)
      })
  }
})

export const { clearAgreementTypes } = agreementTypesSlice.actions

export const selectAgreementTypes = (state: RootState) => state.agreementTypes

export default agreementTypesSlice.reducer