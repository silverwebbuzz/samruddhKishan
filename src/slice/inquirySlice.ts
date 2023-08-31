//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  allInquiries: Array<any>
  deleteInq: Array<any>
  updateInq: Array<any>
  multiDelteInq: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  allInquiry: [],
  deleteInq: [],
  updateInq: [],
  multiDelteInq: [],
  isLoading: false
}

export const getAllInquiry = createAsyncThunk(
  'user/getAllInquiry',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      if (payload) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/enquiry/GetAllEnquiry`, payload, {
          headers
        })
        return res?.data
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/enquiry/GetAllEnquiry`, {
          headers
        })
        return res?.data
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const updateInquiry = createAsyncThunk('user/updateInquiry', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/enquiry/updateEnquiry`, payload, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const deleteInquiry = createAsyncThunk('user/deleteInquiry', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/enquiry/deleteEnquiry/${payload?.id}`, {
      headers
    })
    toast.success('Inquiry deleted successfully')
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const muiltiDeleteInquiry = createAsyncThunk(
  'user/muiltiDeleteInquiry',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/enquiry/multiDeleteEnquiry`, payload, {
        headers
      })
      toast.success('Inquiry deleted successfully')
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
// Inquiry slice
export const inquirySlice = createSlice({
  name: 'inquirySlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllInquiry.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllInquiry.fulfilled, (state, action) => {
      state.isLoading = false
      state.allInquiries = action.payload
    })
    builder.addCase(getAllInquiry.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateInquiry.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateInquiry.fulfilled, (state, action) => {
      state.isLoading = false
      state.allInquiries = action.payload
    })
    builder.addCase(updateInquiry.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteInquiry.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteInquiry.fulfilled, (state, action) => {
      state.isLoading = false
      state.allInquiries = action.payload
    })
    builder.addCase(deleteInquiry.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(muiltiDeleteInquiry.pending, state => {
      state.isLoading = true
    })
    builder.addCase(muiltiDeleteInquiry.fulfilled, (state, action) => {
      state.isLoading = false
      state.multiDelteInq = action.payload
    })
    builder.addCase(muiltiDeleteInquiry.rejected, state => {
      state.isLoading = false
    })
  }
})
export default inquirySlice.reducer
