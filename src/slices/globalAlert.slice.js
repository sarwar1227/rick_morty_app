import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  severity: "error",
  icon: undefined
};

const globalAlert = createSlice({
  name: "global/Alert",
  initialState,
  reducers: {
    showAlert: (state, { payload: { message, severity, icon } }) => ({
      ...state,
      isOpen: true,
      message,
      severity,
      icon
    }),
    hideAlert: (state) => ({
      ...state,
      isOpen: false,
      message: ""
    })
  }
});

const { actions, reducer } = globalAlert;
export const { showAlert, hideAlert } = actions;
export default reducer;
