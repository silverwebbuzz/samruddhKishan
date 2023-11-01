//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
interface RootState {
  allSliderData: Array<any>;
  deleteSliderData: Array<any>;
  createSliderData: Array<any>;
  updateSliderData: Array<any>;
  isLoading: boolean;
}
const initialState: RootState = {
  allSliderData: [],
  deleteSliderData: [],
  createSliderData: [],
  updateSliderData: [],
  isLoading: false,
};

export const getAllSlides = createAsyncThunk(
  "user/getAllSlides",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/getAllSliderImages`,
        payload,
        {
          headers,
        }
      );

      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const createSlide = createAsyncThunk(
  "user/createSlide",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/sliderImage`,
        payload,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        }
      );
      toast.success("Slide created successfully");
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const updateSlide = createAsyncThunk(
  "user/updateSlide",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/uploads/updateSliderImages`,
        payload,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        }
      );
      toast.success("Slide updated successfully");
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const deleteSlide = createAsyncThunk(
  "user/deleteSlide",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/uploads/deleteSliderImage/${payload?.id}`,
        {
          headers,
        }
      );
      toast.success("Slide deleted successfully");
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// product slice
export const sliderSlice = createSlice({
  name: "sliderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSlides.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSlides.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allSliderData = action.payload;
    });
    builder.addCase(getAllSlides.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteSlide.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSlide.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteSliderData = action.payload;
    });
    builder.addCase(deleteSlide.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createSlide.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSlide.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createSliderData = action.payload;
    });
    builder.addCase(createSlide.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateSlide.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSlide.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateSliderData = action.payload;
    });
    builder.addCase(updateSlide.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default sliderSlice.reducer;
