import { configureStore } from "@reduxjs/toolkit";
import { globalAlertReducer } from "@slices";

const store = configureStore({
  reducer: {
    globalAlert: globalAlertReducer
  }
});

export default store;
