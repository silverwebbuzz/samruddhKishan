//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
interface RootState {
  createPages: Array<any>;
  getAllPages: Array<any>;
  getAllAboutUSData: Array<any>;
  isLoading: boolean;
}
const initialState: RootState = {
  createPages: [],
  getAllPages: [],
  getAllAboutUSData: [],
  isLoading: false,
};

export const createPages = createAsyncThunk(
  "pages/createPages",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/page/createPage`,
        payload,
        { headers }
      );

      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getPages = createAsyncThunk(
  "pages/getPages",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/page/getAllPage`,
        { headers }
      );

      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
//get about us data

export const getAboutUs = createAsyncThunk(
  "pages/getAboutUs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/aboutUsPage/getAllAboutUsPage`,
        { headers }
      );

      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
// categories slice
export const pagesSlice = createSlice({
  name: "pagesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createPages = action.payload;
    });
    builder.addCase(createPages.rejected, (state) => {
      state.isLoading = false;
    });
    // getPages
    builder.addCase(getPages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllPages = action.payload;
    });
    builder.addCase(getPages.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAboutUs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAboutUs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getAllAboutUSData = action.payload;
    });
    builder.addCase(getAboutUs.rejected, (state) => {
      state.isLoading = false;
    });
    //getAboutUs
  },
});
export default pagesSlice.reducer;
