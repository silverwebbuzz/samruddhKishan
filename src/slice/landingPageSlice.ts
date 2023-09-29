//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  getSliderData: Array<any>
  getContentData: Array<any>
  getFooterData: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  getSliderData: [],
  getFooterData: [],
  getContentData: [],
  isLoading: false
}

export const getAllSliderImages = createAsyncThunk('user/getAllSliderImages', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/getAllSliderImages`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
// footer/getAllFooterExploerCard
export const getFooter = createAsyncThunk('user/getAllFooterExploerCard', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/footer/getAllFooterExploerCard`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const getAllContent = createAsyncThunk('user/getAllContent', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/getAllContent`, {
      headers
    })

    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
// product slice
export const landingPageSlice = createSlice({
  name: 'landingPageSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllSliderImages.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllSliderImages.fulfilled, (state, action) => {
      state.isLoading = false
      state.getSliderData = action.payload
    })
    builder.addCase(getAllSliderImages.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getFooter.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getFooter.fulfilled, (state, action) => {
      state.isLoading = false
      state.getFooterData = action.payload
    })
    builder.addCase(getFooter.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getAllContent.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllContent.fulfilled, (state, action) => {
      state.isLoading = false
      state.getContentData = action.payload
    })
    builder.addCase(getAllContent.rejected, state => {
      state.isLoading = false
    })
  }
})
export default landingPageSlice.reducer
