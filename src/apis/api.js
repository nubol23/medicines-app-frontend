import setUpInterceptorsTo from "./interceptors";
import axios from "axios";


const api = setUpInterceptorsTo(
  axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default api;