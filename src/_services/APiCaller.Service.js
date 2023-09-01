import axios from "axios";
import { toastErrorMessage } from "./Toaster.service";

// const API_BASE_URL = "http://ahmad2510-001-site1.etempurl.com/api/";
const API_BASE_URL ='http://momahgoub172-001-site1.atempurl.com/api/'
// const API_BASE_URL='http://ahmad2510-001-site1.etempurl.com/api/'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Set the token in the request headers
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// Handle API response and return data
const handleResponse = (response) => {
  
  if (response && response.data) {
    return response.data;
  } else {
    throw new Error("No data in response");
  }
};

// Handle API errors
const handleError = (error) => {
  if (error.response) {
    // The request was made, but the server responded with an error status
    // Extract the error message from the response data if available
    const errorMessage =
      error.response.data && error.response.data.message
        ? error.response.data.message
        : toastErrorMessage();
    throw new Error(errorMessage);
  } else if (error.request) {
    // The request was made, but no response was received
    throw new Error("No response from the server. Please try again later.");
  } else {
    // Something happened in setting up the request that triggered an error
    throw new Error("An error occurred while processing the request.");
  }
};

// Wrapper function for GET requests
export const get = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// Wrapper function for POST requests
export const post = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
export const del = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
