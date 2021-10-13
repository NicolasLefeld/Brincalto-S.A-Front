import axios from "axios";
import { isLogin } from "../util/authHelper";
const apiURL = process.env.REACT_APP_API_URL;

// Default config options
const defaultOptions = {
  baseURL: apiURL,
  validateStatus: (status) => {
    return [200, 201, 404, 401].includes(status);
  },
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
let instance = axios.create(defaultOptions);

if (isLogin()) {
  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("jwt");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
}

export default instance;
