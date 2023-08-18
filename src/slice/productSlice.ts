//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  allProductsData: Array<any>
  deleteProductData: Array<any>
  createProductData: Array<any>
  updateProductData: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  allProductsData: [],
  deleteProductData: [],
  createProductData: [],
  updateProductData: [],
  isLoading: false
}

export const getAllProducts = createAsyncThunk(
  'user/getAllProducts',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/GetAllProduct`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const createProduct = createAsyncThunk('user/createProduct', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/createProduct`, payload, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    toast.success('Product created successfully')
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
// export const updateProduct = createAsyncThunk('user/updateProduct', async (payload: any, { rejectWithValue }) => {
//   try {
//     console.log('#########', payload)

//     const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/updateProduct`, payload)

//     console.log('#########', res)
// toast.success('Product updated successfully')

export const updateProduct = createAsyncThunk('user/updateProduct', async (payload: any, { rejectWithValue }) => {
  try {
    for (const value of payload.values()) {
      console.log(value)
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/product/updateProduct`, payload, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    // toast.success('Product updated successfully')
    console.log('res=======', res)
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const deleteProduct = createAsyncThunk('user/deleteProduct', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/product/deleteProduct/${payload?.id}`, {
      headers
    })
    toast.success('Product deleted successfully')
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

// product slice
export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.allProductsData = action.payload
    })
    builder.addCase(getAllProducts.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteProduct.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteProductData = action.payload
    })
    builder.addCase(deleteProduct.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createProduct.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.createProductData = action.payload
    })
    builder.addCase(createProduct.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateProduct.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateProductData = action.payload
    })
    builder.addCase(updateProduct.rejected, state => {
      state.isLoading = false
    })
  }
})
export default productSlice.reducer
