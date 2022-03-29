import { createAsyncThunk } from '@reduxjs/toolkit'
import * as api from './users.api'
import { UpdateUserData } from './users.types'

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getUsers()
      return res.data
    } catch(e) {
      return rejectWithValue(e)
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: UpdateUserData, { rejectWithValue }) => {
    try {
      const res = await api.updateUser(data)
      return res.data
    } catch(e) {
      return rejectWithValue(e)
    }
  }
)