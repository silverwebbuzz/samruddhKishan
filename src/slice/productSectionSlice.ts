//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

interface RootState {
  isLoading: boolean;
  allProductSectionData: Array<any>;
  updateServiceContent: Array<any>;
  updateServiceCardContent: Array<any>;
  updateProductCardSectionData: {};
  updateProductContentSectionData: {};
}
const initialState: RootState = {
  isLoading: false,
  allProductSectionData: [],
  updateServiceContent: [],
  updateServiceCardContent: [],
  updateProductCardSectionData: {},
  updateProductContentSectionData: {},
};

export const getAllProductSection = createAsyncThunk(
  "user/getAllProductSection",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/getAllBigProductContentCard`,
        payload,
        {
          headers,
        }
      );
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const updateProductContentSection = createAsyncThunk(
  "user/updateProductContentSection",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/uploads/updateProductContentHeadings`,
        payload,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        }
      );
      toast.success("Product Section Updated Successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const updateServiceContentSection = createAsyncThunk(
  "user/updateServiceContentSection",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/updateBigSerivceContentHeadings`,
        payload,
        {
          headers,
        }
      );
      toast.success("Service  Updated Successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
//

export const updateProductCardSection = createAsyncThunk(
  "user/updateProductCardSection",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/bigProductContentCard`,
        payload,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        }
      );
      toast.success("Product Card Section Updated Successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const updateServiceCardSection = createAsyncThunk(
  "user/updateServiceCardSection",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contentPage/BigServiceContentCard`,
        payload,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        }
      );
      toast.success("Service Card Section Updated Successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
//
// product slice
export const productSectionSlice = createSlice({
  name: "productSectionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProductSection.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProductSection.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allProductSectionData = action.payload;
    });
    builder.addCase(getAllProductSection.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProductCardSection.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductCardSection.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateProductCardSectionData = action.payload;
    });
    builder.addCase(updateProductCardSection.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateServiceContentSection.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateServiceContentSection.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateServiceContent = action.payload;
    });
    builder.addCase(updateServiceContentSection.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateServiceCardSection.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateServiceCardSection.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateServiceCardContent = action.payload;
    });
    builder.addCase(updateServiceCardSection.rejected, (state) => {
      state.isLoading = false;
    });
    //updateServiceCardSection
    builder.addCase(updateProductContentSection.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProductContentSection.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateProductContentSectionData = action.payload;
    });
    builder.addCase(updateProductContentSection.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default productSectionSlice.reducer;
