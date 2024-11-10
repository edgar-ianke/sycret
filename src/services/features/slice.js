import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../utils/api";

const initState = {
  data: [],
  error: false,
  form: {
    fullname: "",
    email: "",
    phone: "",
    message: "",
  },
};

export const getCertificates = createAsyncThunk(
  "certificates/getCertificates",
  async () => {
    return await apiService.getCertificates();
  }
);

export const certificateSlice = createSlice({
  name: "certificates",
  initialState: initState,
  reducers: {
    setFormValues: (state, { payload }) => {
      state.form = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCertificates.fulfilled, (state, { payload }) => {
      state.data = payload.data;
    });
  },
});
export const { setFormValues } = certificateSlice.actions;
export default certificateSlice.reducer;
