import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './users.api'

export const getUsers = createAsyncThunk('users/getUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await api.getUsers()
    return res.data
  } catch(e) {
    return rejectWithValue(e)
  }
})