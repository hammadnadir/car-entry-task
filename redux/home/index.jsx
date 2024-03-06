import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { baseURL } from "../request";
import { setLoading } from "../global";
import useLoadingToast from "@/hooks/useLoadingToast";
import { useSession } from "next-auth/react";

const initialState = {
  isLoading: false,
};

// export const chatDataConvertRequest = createAsyncThunk(
//   "home/chatDataConvertRequest",
//   async ({ payload, session }, thunkAPI) => {
//     try {
//       // const { data: session } = useSession();
//       const token = session?.user?.token ? session?.user?.token : "";
//       let response;
//       thunkAPI.dispatch(setLoading(true));
//       response = await axios
//         .post(
//           `${baseURL}extract-image-data`,
//           { url: payload },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include the bearer token in the request headers
//             },
//           }
//         )
//         .then((response) => response.data);
//       thunkAPI.dispatch(setLoading(false));
//       return response;
//     } catch (error) {
//       // console.log("Error", error);
//     }
//   }
// );

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setInputData: (state, action) => {
      state.inputData = action.payload;
    },
    setEditData: (state, action) => {
      state.editData = action.payload;
    },
    setAiDisable: (state, action) => {
      state.aiDisable = action.payload;
    },
    setEditaiDisable: (state, action) => {
      state.aiEditDisable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // state.chatgptData = action?.payload?.home?.chatgptData
      //   ? action.payload.home.chatgptData
      //   : state?.chatgptData;
    });

    // builder.addCase(chatDataConvertRequest.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(chatDataConvertRequest.fulfilled, (state, action) => {
    //   state.chatgptData = action.payload;
    //   state.isLoading = false;
    // });
    // builder.addCase(chatDataConvertRequest.rejected, (state, action) => {
    //   state.isLoading = false;
    //   // console.log("Error:", { message: action.payload.message });
    // });
  },
});

export const {
  // setInputData,
  // setEditData,
  // setAiDisable,
  // setEditaiDisable,
} = homeSlice.actions;

export default homeSlice.reducer;
