//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
let TOKEN = null
if (typeof window !== 'undefined') {
  TOKEN = localStorage.getItem('accessToken')
  console.log('object', TOKEN)
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Authentication: `Bearer ${TOKEN}`
}
interface RootState {
  allUsers: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  allUsers: [],
  isLoading: false
}
export const getAllUsers = createAsyncThunk('user/getAllUsers', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getAllUsers`, payload, {
      headers
    })
    return res
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

// Company Profile slice
export const usersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllFarmers.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllFarmers.fulfilled, (state, action) => {
      state.isLoading = false
      state.allUsers = action.payload
    })
    builder.addCase(getAllFarmers.rejected, state => {
      state.isLoading = false
    })
  }
})
export default usersSlice.reducer
