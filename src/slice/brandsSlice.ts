//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  brandsData: Array<any>
  deleteBrandsData: Array<any>
  createBrandsData: Array<any>
  updateBrandsData: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  brandsData: [],
  deleteBrandsData: [],
  createBrandsData: [],
  updateBrandsData: [],
  isLoading: false
}

export const getAllBrands = createAsyncThunk(
  'user/getAllBrands',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      if (payload) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/brand/GetAllBrand`, payload, {
          headers
        })
        return res?.data
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/brand/GetAllBrand`, {
          headers
        })
        return res?.data
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const createBrands = createAsyncThunk('user/brand', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/brand/createBrand`, payload, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })

    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateBrands = createAsyncThunk('user/updateBrand', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/brand/updateBrand`, payload, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const deleteBrands = createAsyncThunk('user/deleteBrands', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/brand/deleteBrand/${payload?.id}`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

// categories slice
export const brandSlice = createSlice({
  name: 'brandSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllBrands.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.isLoading = false
      state.brandsData = action.payload
    })
    builder.addCase(getAllBrands.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(createBrands.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createBrands.fulfilled, (state, action) => {
      state.isLoading = false
      state.createBrandsData = action.payload
    })
    builder.addCase(createBrands.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateBrands.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateBrands.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateBrandsData = action.payload
    })
    builder.addCase(updateBrands.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(deleteBrands.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteBrands.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteBrandsData = action.payload
    })
    builder.addCase(deleteBrands.rejected, state => {
      state.isLoading = false
    })
  }
})
export default brandSlice.reducer
