//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  categories: Array<any>
  deleteCat: Array<any>
  createcat: Array<any>
  updatecat: Array<any>
  multipleCategories: Array<any>
  deletemultiCategories: Array<any>
  getCategoriesForSelect: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  categories: [],
  multipleCategories: [],
  deleteCat: [],
  createcat: [],
  updatecat: [],
  deletemultiCategories: [],
  isLoading: false,
  getCategoriesForSelect: []
}

export const getAllCategories = createAsyncThunk(
  'user/getAllCategories',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      if (payload) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/GetAllCategory`, payload, {
          headers
        })
        return res?.data
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/GetAllCategory`, {
          headers
        })
        return res?.data
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
//

export const getAllCategoriesForSelect = createAsyncThunk(
  'user/getAllCategoriesForSelect',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/GetAllCategory`, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const createCategory = createAsyncThunk('user/createCategory', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/createCategories`, payload, {
      headers
    })
    toast.success('Category created successfully')

    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateCategory = createAsyncThunk('user/updateCategory', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories/updateCategories/${payload?.id}`,
      payload,
      {
        headers
      }
    )
    toast.success('Category updated successfully')
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const updateMultipleCategoryStatus = createAsyncThunk(
  'farmer/updateMultipleCategoryStatus',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/updateMultiSelectStatus`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const deleteCategory = createAsyncThunk('user/deleteCategory', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/deleteCategories/${payload?.id}`, {
      headers
    })
    toast.success('Category deleted successfully')
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const deleteMultipleCategory = createAsyncThunk(
  'user/deleteMultipleCategory',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/multiDeleteCategories`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

// categories slice
export const categoriesSlice = createSlice({
  name: 'CategoriesSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllCategories.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.isLoading = false
      state.categories = action.payload
    })
    builder.addCase(getAllCategories.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getAllCategoriesForSelect.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllCategoriesForSelect.fulfilled, (state, action) => {
      state.isLoading = false
      state.getCategoriesForSelect = action.payload
    })
    builder.addCase(getAllCategoriesForSelect.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(updateMultipleCategoryStatus.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateMultipleCategoryStatus.fulfilled, (state, action) => {
      state.isLoading = false
      state.multipleCategories = action.payload
    })
    builder.addCase(updateMultipleCategoryStatus.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(deleteCategory.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteCat = action.payload
    })
    builder.addCase(deleteCategory.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteMultipleCategory.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.deletemultiCategories = action.payload
    })
    builder.addCase(deleteMultipleCategory.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(createCategory.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.createcat = action.payload
    })
    builder.addCase(createCategory.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateCategory.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.updatecat = action.payload
    })
    builder.addCase(updateCategory.rejected, state => {
      state.isLoading = false
    })
  }
})
export default categoriesSlice.reducer
