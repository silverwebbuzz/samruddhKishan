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
  getAllSmallProductData: Array<any>
  updateSmallProductContentData: {}
  updateSmallProductCardData: {}
}
const initialState: RootState = {
  isLoading: false,
  getAllSmallProductData: {},
  updateSmallProductContentData: {},
  updateSmallProductCardData: {}
}

export const getAllSmallProduct = createAsyncThunk('user/getAllSmallProduct', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/getAllSmallProductContentCard`,
      payload,
      {
        headers
      }
    )
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateSmallProductContent = createAsyncThunk(
  'user/updateSmallProductContent',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/updateSmallProductContentData`,
        payload,
        {
          headers
        }
      )
      toast.success('Product Content Updated Successfully')
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const updateSmallProductCard = createAsyncThunk(
  'user/updateSmallProductCard',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/uploads/updateSmallProductContentCard`,
        payload,
        {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        }
      )
      toast.success('Product Card Updated Successfully')
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

// product slice
export const smallProductSlice = createSlice({
  name: 'smallProductSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllSmallProduct.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllSmallProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.getAllSmallProductData = action.payload
    })
    builder.addCase(getAllSmallProduct.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateSmallProductContent.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateSmallProductContent.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateSmallProductContentData = action.payload
    })
    builder.addCase(updateSmallProductContent.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateSmallProductCard.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateSmallProductCard.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateSmallProductCardData = action.payload
    })
    builder.addCase(updateSmallProductCard.rejected, state => {
      state.isLoading = false
    })
  }
})
export default smallProductSlice.reducer
