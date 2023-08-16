//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import errorHandler from 'src/error/error-handler'
let TOKEN = null
if (typeof window !== 'undefined') {
  TOKEN = localStorage.getItem('accessToken')
  console.log('object', TOKEN)
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
}
interface RootState {
  allFarmers: Array<any>
  allDistrict: Array<any>
  allState: Array<any>
  createFarmer: Array<any>
  updateFarmer: Array<any>
  deleteFarmer: Array<any>
  getFarmer: Array<any>
  uploadImage: Array<any>
  getAddressByPinCodeData: Array<any>
  createURole: Array<any>
  updateRole: Array<any>
  createPermission: Array<any>
  getRoles: Array<any>
  getPermission: Array<any>
  updatePermission: Array<any>
  getUsers: Array<any>
  allUsers: Array<any>
  createUser12: Array<any>
  updateUsers12: Array<any>
  deleteUser: Array<any>
  deletePermission: Array<any>
  singleUser: Array<any>
  contentPage: Array<any>
  isLoading: boolean
}
const initialState: RootState = {
  allFarmers: [],
  allDistrict: [],
  uploadImage: [],
  allState: [],
  createFarmer: [],
  updateFarmer: [],
  getFarmer: [],
  getAddressByPinCodeData: [],
  deleteFarmer: [],
  createURole: [],
  updateRole: [],
  getRoles: [],
  getUsers: [],
  getPermission: [],
  createPermission: [],
  updatePermission: [],
  allUsers: [],
  createUser12: [],
  updateUsers12: [],
  deleteUser: [],
  deletePermission: [],
  singleUser: [],
  contentPage: [],
  isLoading: false
}

export const getAllFarmers = createAsyncThunk('farmers/getAllFarmers', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getAllFarmer`, payload, {
      headers
    })
    // errorHandler(res)

    return res?.data
  } catch (err: any) {
    errorHandler(err?.code)
    return rejectWithValue(err?.response?.data)
  }
})

export const getAllDistrict = createAsyncThunk('farmers/getAllDistrict', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getAllCity`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const createUser1 = createAsyncThunk('farmers/createUser', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/createUsers`, payload, {
      headers
    })
    if (res.data?.message === 'Email Already Exist') {
      toast.error('Email Already Exist')
    }
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const updateUser1 = createAsyncThunk('farmers/updateUser1', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/updateUsers`, payload, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const createFarmer = createAsyncThunk('farmers/createFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/createFarmer`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const getSingleFarmer = createAsyncThunk('farmer/getSingleFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getSingleFarmer/${payload?.id}`, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const updateFarmer = createAsyncThunk('farmer/updateFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/updateFarmer`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const deleteFarmer = createAsyncThunk('farmer/deleteFarmer', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/deleteFarmer/${payload?.id}`, {
      headers
    })
    res?.data?.status === 200 ? toast.success('Farmer deleted successfully') : toast.error('Somthing went wrong')
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const getAdressByPincode = createAsyncThunk('farmer/GetPinCoder', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/GetPinCode/${payload?.pincode}`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const getAllState = createAsyncThunk('farmers/getAllState', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/getAllState`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})

export const uploadImage = createAsyncThunk('farmer/uploadImage', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/farmer/uploadImage`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const createRoleAndPermission = createAsyncThunk(
  'farmers/roleAndPermission',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/role/createURole`, payload, {
        headers
      })
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const getRoleAndPermissions = createAsyncThunk(
  'farmers/getRoleAndPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/role/GetAllRole`, {
        headers
      })
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const getAllUsers = createAsyncThunk(
  'farmers/getAllUsers',
  async (payload: { page: string | number; pageSize: string | number }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getAllUsers`, payload, {
        headers
      })
      return res?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const createPermissions = createAsyncThunk(
  'farmers/createPermission',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/permission/createPermission`, payload, {
        headers
      })
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const getAllPermission = createAsyncThunk(
  'farmers/GetAllPermission',
  async (payload?: { page?: string | number; pageSize?: string | number }, { rejectWithValue }) => {
    try {
      if (payload) {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/permission/GetAllPermission`, payload, {
          headers
        })
        return res?.data
      } else {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/permission/GetAllPermission`, {
          headers
        })
        return res?.data?.data
      }
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)

export const updatePermissions = createAsyncThunk(
  'farmer/updatePermission',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/permission/updatePermission`, payload, {
        headers
      })
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const updateRoles = createAsyncThunk('farmer/updateRoles', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/role/updateRole`, payload, {
      headers
    })
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const deleteUser = createAsyncThunk('farmer/deleteUsers', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/user/deleteUsers/${payload?.id}`, {
      headers
    })
    res?.data?.status === 200 ? toast.success('user deleted successfully') : toast.error('Somthing went wrong')
    return res?.data?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const deleteRole = createAsyncThunk('farmer/roles', async (payload: any, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/role/deleteRole/${payload?.id}`, {
      headers
    })
    return res?.data
  } catch (err: any) {
    return rejectWithValue(err?.response?.data)
  }
})
export const deletePermissions = createAsyncThunk(
  'farmer/deletePermissions',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/permission/deletePermission/${payload?.id}`, {
        headers
      })
      res?.data?.status === 200 ? toast.success('Permission deleted successfully') : toast.error('Somthing went wrong')
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
export const createContentPage = createAsyncThunk(
  'farmers/createContentPage',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/createContentPage`, payload, {
        headers
      })
      return res?.data?.data
    } catch (err: any) {
      return rejectWithValue(err?.response?.data)
    }
  }
)
// Company Profile slice
export const farmersSlice = createSlice({
  name: 'farmers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllFarmers.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllFarmers.fulfilled, (state, action) => {
      state.isLoading = false
      state.allFarmers = action.payload
    })
    builder.addCase(getAllFarmers.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getAllDistrict.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllDistrict.fulfilled, (state, action) => {
      state.isLoading = false
      state.allDistrict = action.payload
    })
    builder.addCase(getAllDistrict.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.createFarmer = action.payload
    })
    builder.addCase(createFarmer.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateFarmer = action.payload
    })
    builder.addCase(updateFarmer.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getSingleFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSingleFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.getFarmer = action.payload
    })
    builder.addCase(getSingleFarmer.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteFarmer.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteFarmer.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteFarmer = action.payload
    })
    builder.addCase(deleteFarmer.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getAdressByPincode.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAdressByPincode.fulfilled, (state, action) => {
      state.isLoading = false
      state.getAddressByPinCodeData = action.payload
    })
    builder.addCase(getAdressByPincode.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getAllState.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllState.fulfilled, (state, action) => {
      state.isLoading = false
      state.allState = action.payload
    })
    builder.addCase(getAllState.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(uploadImage.pending, state => {
      state.isLoading = true
    })
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.isLoading = false
      state.uploadImage = action.payload
    })
    builder.addCase(uploadImage.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createRoleAndPermission.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createRoleAndPermission.fulfilled, (state, action) => {
      state.isLoading = false
      state.createURole = action.payload
    })
    builder.addCase(createRoleAndPermission.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateRoles.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateRoles.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateRole = action.payload
    })
    builder.addCase(updateRoles.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getRoleAndPermissions.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getRoleAndPermissions.fulfilled, (state, action) => {
      state.isLoading = false
      state.getRoles = action.payload
    })
    builder.addCase(getRoleAndPermissions.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(getAllUsers.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.getUsers = action.payload
    })
    builder.addCase(getAllUsers.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createPermissions.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createPermissions.fulfilled, (state, action) => {
      state.isLoading = false
      state.createPermission = action.payload
    })
    builder.addCase(createPermissions.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getAllPermission.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllPermission.fulfilled, (state, action) => {
      state.isLoading = false
      state.getPermission = action.payload
    })
    builder.addCase(getAllPermission.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updatePermissions.pending, state => {
      state.isLoading = true
    })

    builder.addCase(updatePermissions.fulfilled, (state, action) => {
      state.isLoading = false
      state.updatePermission = action.payload
    })
    builder.addCase(updatePermissions.rejected, state => {
      state.isLoading = false
    })

    builder.addCase(createUser1.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createUser1.fulfilled, (state, action) => {
      state.isLoading = false
      state.createUser12 = action.payload
    })
    builder.addCase(createUser1.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(updateUser1.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updateUser1.fulfilled, (state, action) => {
      state.isLoading = false
      state.updateUsers12 = action.payload
    })
    builder.addCase(updateUser1.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteUser.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.deleteUser = action.payload
    })
    builder.addCase(deleteUser.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deletePermissions.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deletePermissions.fulfilled, (state, action) => {
      state.isLoading = false
      state.deletePermission = action.payload
    })
    builder.addCase(deletePermissions.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteRole.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(deleteRole.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createContentPage.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createContentPage.fulfilled, (state, action) => {
      state.isLoading = false
      state.contentPage = action.payload
    })
    builder.addCase(createContentPage.rejected, state => {
      state.isLoading = false
    })
  }
})

export default farmersSlice.reducer
