//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
interface RootState {
  updateGeneral: Array<any>;
  getGeneral: Array<any>;
  getLogo: Array<any>;
  singleSetting: Array<any>;
  createSocialData: Array<any>;
  createSeoData: Array<any>;
  isLoading: boolean;
}
const initialState: RootState = {
  updateGeneral: [],
  singleSetting: [],
  getGeneral: [],
  updateEmial: [],
  createSeoData: [],
  createSocialData: [],
  getLogo: [],
  isLoading: false,
};

export const updateGeneralSetting = createAsyncThunk(
  "user/updateGeneralSetting",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/updateGeneralSetting`,
        payload,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        }
      );
      toast.success("Updated successfully");
      return res?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getGeneralAPI = createAsyncThunk(
  "user/getGeneralAPI",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/getSingleSetting`,
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

export const getGeneralSetting = createAsyncThunk(
  "user/getGeneralSetting",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/getSingleSetting`,
        payload,
        {
          headers,
        }
      );
      toast.success("Updated successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getEmailAPI = createAsyncThunk(
  "user/getEmailAPI",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/createEmailSetting`,
        payload,
        {
          headers,
        }
      );
      toast.success("Updated successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const createSocialSettingAPI = createAsyncThunk(
  "user/createSocialSettingAPI",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/createSocialMedia`,
        payload,
        {
          headers,
        }
      );
      toast.success("Updated successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const createGoogleAPI = createAsyncThunk(
  "user/createGoogleAPI",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/updateGoogleSetting`,
        payload,
        {
          headers,
        }
      );
      toast.success("Updated successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const createSeoAPI = createAsyncThunk(
  "user/createSeoAPI",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/updateScoSetting`,
        payload,
        {
          headers,
        }
      );
      toast.success("Updated successfully");
      return res?.data?.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
export const getLogoAPI = createAsyncThunk(
  "user/getLogoAPI",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/settings/getLogo`,
        {
          headers,
        }
      );

      return res?.data?.data;
    } catch (err: any) {
      console.log("res", err);
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Settings slice
export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateGeneralSetting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateGeneralSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateGeneral = action.payload;
      localStorage.setItem("updateGeneral", JSON.stringify(action.payload));
    });
    builder.addCase(updateGeneralSetting.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createSocialSettingAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSocialSettingAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createSocialData = action.payload;
    });
    builder.addCase(createSocialSettingAPI.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createSeoAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSeoAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createSeoData = action.payload;
    });
    builder.addCase(createSeoAPI.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createGoogleAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createGoogleAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.createGoogleSetting = action.payload;
    });
    builder.addCase(createGoogleAPI.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGeneralAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGeneralAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleSetting = action.payload;
    });
    builder.addCase(getGeneralAPI.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getEmailAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEmailAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.updateEmial = action.payload;
    });
    builder.addCase(getEmailAPI.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGeneralSetting.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGeneralSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getGeneral = action.payload;
    });
    builder.addCase(getGeneralSetting.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getLogoAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLogoAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getLogo = action.payload;
    });
    builder.addCase(getLogoAPI.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default settingsSlice.reducer;
