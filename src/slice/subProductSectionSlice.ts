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
  allSubProductSectionData: Array<any>
  updateSubProductSectionData: {}
}
const initialState: RootState = {
  isLoading: false,
  allSubProductSectionData: [],
  updateSubProductSectionData: {}
}

export const getAllSubProductSection = createAsyncThunk(
  'user/getAllSubProductSection',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/getAllBigProductContentCard`,
        payload,
        {
          headers
        }
      )
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const updateSubProductSection = createAsyncThunk(
  'user/updateSubProductSection',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/uploads/updateProductContentCard`,
        payload,
        {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        }
      )
      toast.success('Sub-Product Section Updated Successfully')
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

// product slice
export const subProductSectionSlice = createSlice({
  name: 'productSectionSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllSubProductSection.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllSubProductSection.fulfilled, (state, action) => {
      state.isLoading = false
      state.allSubProductSectionData = action.payload
    })
    builder.addCase(getAllSubProductSection.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateSubProductSection.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateSubProductSection.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateSubProductSectionData = action.payload
    })
    builder.addCase(updateSubProductSection.rejected, state => {
      state.isLoading = false
    })
  }
})
export default subProductSectionSlice.reducer
