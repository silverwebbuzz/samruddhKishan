//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  updateGeneral: Array<any>
  getGeneral: Array<any>
  getLogo: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  updateGeneral: [],
  getGeneral: [],
  getLogo: [],
  isLoading: false
}

export const updateGeneralSetting = createAsyncThunk(
  'user/updateGeneralSetting',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/updateGeneralSetting`, payload, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      })
      toast.success('Updated successfully')
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const getGeneralSetting = createAsyncThunk('user/getGeneralSetting', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/getSingleSetting`, payload, {
      headers
    })

    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const getLogoAPI = createAsyncThunk('user/getLogoAPI', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/settings/getLogo`, {
      headers
    })

    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

// Settings slice
export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateGeneralSetting.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateGeneralSetting.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateGeneral = action.payload
    })
    builder.addCase(updateGeneralSetting.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getGeneralSetting.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getGeneralSetting.fulfilled, (state, action) => {
      state.isLoading = false
      state.getGeneral = action.payload
    })
    builder.addCase(getGeneralSetting.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getLogoAPI.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getLogoAPI.fulfilled, (state, action) => {
      state.isLoading = false
      state.getLogo = action.payload
    })
    builder.addCase(getLogoAPI.rejected, state => {
      state.isLoading = false
    })
  }
})
export default settingsSlice.reducer
