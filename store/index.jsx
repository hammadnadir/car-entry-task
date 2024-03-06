import { allReducer } from "@/redux/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

// export const store = configureStore({ reducer: allReducer });

export const initStore = () => {
  return configureStore({
    reducer: allReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export const wrapper = createWrapper(initStore, {
  debug: false,
});