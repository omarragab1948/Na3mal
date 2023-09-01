import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  toastErrorMessage,
  toastSucessMessage,
} from "../../_services/Toaster.service";
import Cookies from "js-cookie";
import { json } from "react-router-dom";

const baseUrl = "http://momahgoub172-001-site1.atempurl.com/api/Auth/";

export const register = createAsyncThunk(
  "Auth/register",
  async ({ endPoint, values }) => {
    try {
      const res = await axios.post(`${baseUrl}${endPoint}`, values);
      console.log(res);
      toastSucessMessage(`${res.data} \n You will be redirected to login`);
      return res.data;
    } catch (err) {
      err.response.data.map((error) => toastErrorMessage(error.description));
      throw err;
    }
  }
);

export const login = createAsyncThunk("Auth/login", async (values) => {
  try {
    const res = await axios.post(`${baseUrl}Login`, values);
    console.log(res);
    toastSucessMessage("Login Successful \n You will be redirected");
    return res.data; // Return response data to be stored in Redux store
  } catch (err) {
    console.log(err);
    toastErrorMessage(
      err.response.data
        ? err.response.data
        : "Something went wrong , please try again later"
    );
    throw err.response; // Rethrow the entire Axios error to be handled by Redux Toolkit
  }
});

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    loading: false,
    errorMsg: null,
    success: null,
    role: null,
    user: null,
    token: null,
    isLoggedIn :false,
  },
  reducers: {
    clearError: (state) => {
      state.errorMsg = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    logOut: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isLoggedIn = false

      //remove token and user data from cookies
      Cookies.remove("authToken");
      Cookies.remove("userData");
      Cookies.remove("roles");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      // Handle the successful registration case
      console.log(action.payload);
      state.success = true;
      state.loading = false;
      state.errorMsg = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.error);
      state.loading = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
      state.errorMsg = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // Handle the successful login case and update state if necessary
      state.user = action.payload.user;
      state.role = action.payload.roles;
      state.token = action.payload.token;
      state.isLoggedIn = true;

      //Saving userData and token to cookies
      Cookies.set("authToken", state.token);
      Cookies.set("userData", JSON.stringify(state.user));
      Cookies.set("roles", state.role);

      state.errorMsg = null;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      // Handle the rejected login case
      state.loading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.errorMsg = null;
    });
  },
});

export const { clearError, clearSuccess ,logOut} = authSlice.actions;
export default authSlice.reducer;
