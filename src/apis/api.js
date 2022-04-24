import setUpInterceptorsTo from "./interceptors";
import axios from "axios";

const api = setUpInterceptorsTo(
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default api;
