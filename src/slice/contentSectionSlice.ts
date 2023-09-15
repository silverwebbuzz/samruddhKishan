//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  isLoading: boolean
  allContentData: Array<any>
  updateContentData: {}
  updateCardContentData: {}
}
const initialState: RootState = {
  isLoading: false,
  allContentData: [],
  updateContentData: {},
  updateCardContentData: {}
}

export const getAllContent = createAsyncThunk('user/getAllContent', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/getAllContent`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateContent = createAsyncThunk('user/updateContent', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/updateContentPage`, payload, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    toast.success('Content Updated Successfully')
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateCardContent = createAsyncThunk('user/updateCardContent', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/contentCard`, payload, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    toast.success('Card Created Successfully')

    return res?.data?.contentCards
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

// product slice
export const contentSectionSlice = createSlice({
  name: 'contentSectionSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllContent.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllContent.fulfilled, (state, action) => {
      state.isLoading = false
      state.allContentData = action.payload
    })
    builder.addCase(getAllContent.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateContent.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateContent.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateContentData = action.payload
    })
    builder.addCase(updateContent.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateCardContent.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateCardContent.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateCardContentData = action.payload
    })
    builder.addCase(updateCardContent.rejected, state => {
      state.isLoading = false
    })
  }
})
export default contentSectionSlice.reducer
