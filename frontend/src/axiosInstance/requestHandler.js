import axios from "axios";
import { toast } from 'react-toastify';
import { getUserToken } from "../utils/getUserToken";

const base_url = import.meta.env.VITE_BASE_URL;

export const serviceInstance = axios.create({
  baseURL: base_url
});

serviceInstance.interceptors.request.use(
  (config) => {
    let token = getUserToken()?.token;

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

serviceInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorResponse = error.response;
    const errorStatus = errorResponse ? errorResponse.status : null;
    const errorData = errorResponse ? errorResponse.data : null;
    const errorList = errorData ? errorData.errors : null;
    const customError = errorData ? (errorData.message || errorData.title) : null;
    const finalErrorMsg = customError || error.message;

    console.error(error);

    if (errorStatus === 401 && (!error.config.url || !error.config.url.includes("/Login")) || finalErrorMsg === "Unauthorized request") {
      toast.error("Token expired", {
        timeout: 2000,
      });
      sessionStorage.clear();
      localStorage.clear();
      window.location = "/login";
    } else {
      // Show multiple errors if applicable
      if (finalErrorMsg === "One or more validation errors occurred." && errorList) {
        for (let errorItem in errorList) {
          if (errorList.hasOwnProperty(errorItem)) {
            toast.error(errorList[errorItem][0]);
          }
        }
      } else {
        // Show single error
        toast.error(`${finalErrorMsg} ${errorStatus || ""}`);
      }
    }

    return Promise.reject(error);
  }
);

export default serviceInstance;
