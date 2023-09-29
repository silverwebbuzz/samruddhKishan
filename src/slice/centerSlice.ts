//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  centersData: Array<any>
  centersCountData: Array<any>
}
const initialState: RootState = {
  centersData: [],
  centersCountData: []
}

export const getAllCenters = createAsyncThunk(
  'farmers/getAllCenters',
  async (payload: { page?: string | number; pageSize?: string | number }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getAllCenters`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const getCenterCount = createAsyncThunk('farmers/getCenterCount', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/centersCount`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
// getCenterCount

export const centersSlice = createSlice({
  name: 'centersSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllCenters.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllCenters.fulfilled, (state, action) => {
      state.isLoading = false
      state.centersData = action.payload
    })
    builder.addCase(getAllCenters.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getCenterCount.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getCenterCount.fulfilled, (state, action) => {
      state.isLoading = false
      state.centersCountData = action.payload
    })
    builder.addCase(getCenterCount.rejected, state => {
      state.isLoading = false
    })
  }
})
export default centersSlice.reducer
