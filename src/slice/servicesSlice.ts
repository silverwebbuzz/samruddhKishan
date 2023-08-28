//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  CreateServiceData: Array<any>
  deleteCat: Array<any>
  singleService: Array<any>
  servicesData: Array<any>
  updateServiceData: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  CreateServiceData: [],
  singleService: [],
  deleteCat: [],
  servicesData: [],
  updateServiceData: [],
  isLoading: false
}

export const getAllServices = createAsyncThunk(
  'user/GetAllServices',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      if (payload) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/service/GetAllServices`, payload, {
          headers
        })
        return res?.data
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/service/GetAllServices`, {
          headers
        })
        return res?.data
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const createService = createAsyncThunk('user/service', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/service/createServices`, payload, {
      //   headers
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    // toast.success('service created successfully')
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateService = createAsyncThunk('user/updateService', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/service/updateServices`, payload, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'multipart/form-data'
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const getSingleService = createAsyncThunk('user/singleServices', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/service/singleServices/${payload?.id}`, {
      headers
    })
    return res?.data?.data[0]
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const deleteService = createAsyncThunk('user/deleteService', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/service/deleteService/${payload?.id}`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const deleteMultipleServices = createAsyncThunk(
  'farmer/deleteMultipleServices',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/service/multiDeleteServices`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const updateMultipleServiceStatus = createAsyncThunk(
  'farmer/updateMultipleServiceStatus',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/service/updateServicesStatus`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
// categories slice
export const servicesSlice = createSlice({
  name: 'servicesSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllServices.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.isLoading = false
      state.servicesData = action.payload
    })
    builder.addCase(getAllServices.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getSingleService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSingleService.fulfilled, (state, action) => {
      state.isLoading = false
      state.singleService = action.payload
    })
    builder.addCase(getSingleService.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(deleteService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteServiceData = action.payload
    })
    builder.addCase(deleteService.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteMultipleServices.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleServices.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteMultipleServices.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateMultipleServiceStatus.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateMultipleServiceStatus.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(updateMultipleServiceStatus.rejected, state => {
      state.isLoading = false
    })
    //updateMultipleServiceStatus
    builder.addCase(createService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createService.fulfilled, (state, action) => {
      state.isLoading = false
      state.CreateServiceData = action.payload
    })
    builder.addCase(createService.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateServiceData = action.payload
    })
    builder.addCase(updateService.rejected, state => {
      state.isLoading = false
    })
  }
})
export default servicesSlice.reducer
