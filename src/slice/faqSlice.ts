//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  updateQaSection: Array<any>
  updatedFaq: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  updateQaSection: [],
  updatedFaq: [],
  isLoading: false
}

export const qaSectionUpdate = createAsyncThunk('user/qaSectionUpdate', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/uploads/qaUpdateContent`, payload, {
      //   headers
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
//updateFaq
export const updateFaq = createAsyncThunk('user/updateFaq', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/uploads/qaUpdateContentCard`,
      payload,
      {
        headers
        // 'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'multipart/form-data'
      }
    )
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
// Inquiry slice
export const faqSlice = createSlice({
  name: 'faqSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(qaSectionUpdate.pending, state => {
      state.isLoading = true
    })
    builder.addCase(qaSectionUpdate.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateQaSection = action.payload
    })
    builder.addCase(qaSectionUpdate.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateFaq.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateFaq.fulfilled, (state, action) => {
      state.isLoading = false
      state.updatedFaq = action.payload
    })
    builder.addCase(updateFaq.rejected, state => {
      state.isLoading = false
    })
  }
})
export default faqSlice.reducer
