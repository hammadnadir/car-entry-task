import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const globalSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setLoading } = globalSlice.actions;

export default globalSlice.reducer;