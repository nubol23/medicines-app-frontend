import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const onRequest = (config: AxiosRequestConfig) => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  // @ts-ignore
  config.headers["Authorization"] = `Bearer ${user.accessToken}`;

  return config;
};

const onRequestError = (error: any) => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

const onResponseError = async (error: any) => {
  return Promise.reject(error);
};

const setUpInterceptorsTo = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export default setUpInterceptorsTo;
