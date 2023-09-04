// settings/getGraphCount

//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  dashboardData: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  dashboardData: [],
  isLoading: false
}

export const getDashboardData = createAsyncThunk('settings/getGraphCount', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/getGraphCount`, {
      headers
    })

    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

// Settings slice
export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getDashboardData.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.isLoading = false
      state.dashboardData = action.payload
    })
    builder.addCase(getDashboardData.rejected, state => {
      state.isLoading = false
    })
  }
})
export default dashboardSlice.reducer
