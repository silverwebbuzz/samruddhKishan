// contentPage/updateFooterDetails
//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  footerUpdateData: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  footerUpdateData: [],
  isLoading: false
}

export const footerUpdate = createAsyncThunk('footer/footerUpdate', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/updateFooterDetails`, payload, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const footerSlice = createSlice({
  name: 'footerSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(footerUpdate.pending, state => {
      state.isLoading = true
    })
    builder.addCase(footerUpdate.fulfilled, (state, action) => {
      state.isLoading = false
      state.footerUpdateData = action.payload
    })
    builder.addCase(footerUpdate.rejected, state => {
      state.isLoading = false
    })
  }
})
export default footerSlice.reducer
