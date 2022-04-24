const API_URL = "http://127.0.0.1:8000/";

const onRequest = (config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  config.headers["Authorization"] = `Bearer ${user.accessToken}`;

  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  return response;
};

const onResponseError = async (error) => {
  return Promise.reject(error);
};

const setUpInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};

export default setUpInterceptorsTo;
