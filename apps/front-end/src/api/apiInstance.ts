import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_END_POINT,
  withCredentials: true,
  timeout: 1500,
  headers: {
    Authorization: document.cookie,
  },
});

export default apiInstance;
