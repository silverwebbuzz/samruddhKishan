//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  updateTestimonialsData: Array<any>
  updateTestimonialsImagesData: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  updateTestimonialsData: [],
  updateTestimonialsImagesData: [],
  isLoading: false
}

export const updateTestimonials = createAsyncThunk(
  'user/updateTestimonial',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/updateTestimonialCard`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const updateTestimonialsImages = createAsyncThunk(
  'user/updateTestimonialsImages',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/testimonialImage`, payload, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const deleteTestimonials = createAsyncThunk(
  'user/deleteTestimonials',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/deleteTestimonialCard`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
// deleteTestimonials
// Inquiry slice
export const updateTestimonialsSlice = createSlice({
  name: 'updateTestimonialsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateTestimonials.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateTestimonials.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateTestimonialsData = action.payload
    })
    builder.addCase(updateTestimonials.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(updateTestimonialsImages.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateTestimonialsImages.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateTestimonialsImagesData = action.payload
    })
    builder.addCase(updateTestimonialsImages.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteTestimonials.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteTestimonials.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteTestimonials.rejected, state => {
      state.isLoading = false
    })
  }
})
export default updateTestimonialsSlice.reducer
