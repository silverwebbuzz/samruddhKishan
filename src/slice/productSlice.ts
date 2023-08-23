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
  singleProductsData: Array<any>
  updateProductData: Array<any>
  allUnitsData: Array<any>
  contries: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  allProductsData: [],
  deleteProductData: [],
  createProductData: [],
  singleProductsData: [],
  updateProductData: [],
  allUnitsData: [],
  contries: [],
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
export const getAllUnits = createAsyncThunk(
  'user/getAllUnits',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getAllUnits`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const getAllCountry = createAsyncThunk(
  'user/getAllCountry',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getAllCountry`, payload, {
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
// product/getsingleProduct/:
export const getProductById = createAsyncThunk('user/getProductById', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/product/getsingleProduct/${payload?.id}`, {
      headers
    })

    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const updateProduct = createAsyncThunk('user/updateProduct', async (payload: any, { rejectWithValue }) => {
  try {
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

export const deleteProductGallaryImage = createAsyncThunk(
  'user/deleteProductGallaryImage',
  async (payloadForDeleteImages: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/product/deleteProductGallary`,
        payloadForDeleteImages,
        {
          headers
        }
      )
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
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

    builder.addCase(getProductById.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.isLoading = false
      state.singleProductsData = action.payload
    })
    builder.addCase(getProductById.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getAllCountry.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllCountry.fulfilled, (state, action) => {
      state.isLoading = false
      state.contries = action.payload
    })
    builder.addCase(getAllCountry.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getAllUnits.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllUnits.fulfilled, (state, action) => {
      state.isLoading = false
      state.allUnitsData = action.payload
    })
    builder.addCase(getAllUnits.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteProductGallaryImage.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteProductGallaryImage.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteProductGallaryImage.rejected, state => {
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
