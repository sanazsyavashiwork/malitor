"use client";

import { TOKEN_KEYS } from "@/constValues/tokenKeys";
import { cookieRoot } from "@/hooks/useCookie";
// import { TOKEN_KEYS } from '@/constValues/tokenKeys';
// import { cookieRoot } from '@/hooks/useCookie';
import axios from "axios";

// Default config for the axios instance
const axiosParams = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    ...(cookieRoot.get(TOKEN_KEYS.ACCESS_TOKEN)
      ? {
          Authorization: `Bearer ${cookieRoot.get(TOKEN_KEYS.ACCESS_TOKEN)}`,
        }
      : {}),
  },
};
// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);
axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookieRoot.get(TOKEN_KEYS.ACCESS_TOKEN)
      ? `Bearer ${cookieRoot.get(TOKEN_KEYS.ACCESS_TOKEN)}`
      : null;
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const didAbort = (error) => axios.isCancel(error);
const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error) => {
  return axios.isAxiosError(error);
};

const withAbort = (fn) => {
  const executor = async (...args) => {
    const originalConfig = args[args.length - 1];
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      console.log("api error", error);
      if (didAbort(error)) {
        error.aborted = true;
      }

      throw error;
    }
  };

  return executor;
};

// Main api function
const api = (axios) => {
  return {
    get: (url, config = {}) => withAbort(axios.get)(url, config),
    delete: (url, config = {}) => withAbort(axios.delete)(url, config),
    post: (url, body, config = {}) => withAbort(axios.post)(url, body, config),
    patch: (url, body, config = {}) =>
      withAbort(axios.patch)(url, body, config),
    put: (url, body, config = {}) => withAbort(axios.put)(url, body, config),
  };
};

export default api(axiosInstance);
