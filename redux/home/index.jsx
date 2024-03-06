import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { baseURL } from "../request";
import { setLoading } from "../global";
import useLoadingToast from "@/hooks/useLoadingToast";
import { useSession } from "next-auth/react";

const initialState = {
  carData: {},
  isLoading: false,
};

export const addCarEntryRequest = createAsyncThunk(
  "home/addCarEntryRequest",
  async ({ payload, session }, thunkAPI) => {
    try {
      const token = session?.user?.token ? session?.user?.token : "";
      let response;
      thunkAPI.dispatch(setLoading(true));
      response = await axios
        .post(`${baseURL}post`, payload, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data);
      thunkAPI.dispatch(setLoading(false));
      return response;
    } catch (error) {
      console.log("Error", error);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      state.carData = action?.payload?.home?.carData
        ? action.payload.home.carData
        : state?.carData;
    });

    builder.addCase(addCarEntryRequest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCarEntryRequest.fulfilled, (state, action) => {
      state.carData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addCarEntryRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default homeSlice.reducer;
