import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiMethodType = "get" | "post" | "put" | "delete";
export type GeneralConfigType = {
  baseDomain: string;
  tokenHeaderKey?: string;
};

let general_config: GeneralConfigType = { baseDomain: "" };

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      const { status } = err.response;
      if (status === 500) {
        err = {
          ...err,
          response: { data: "Server or Network Error", status: 500 },
        };
      }
      return Promise.reject(err);
    }
  }
);

const axios_config = (
  api: string,
  paramsOrObject: Object | null,
  method: ApiMethodType,
  baseDomain: string
): AxiosRequestConfig => ({
  method,
  url: baseDomain + api,
  [method === "post" ? "data" : "params"]: paramsOrObject,
  headers: {
    "Content-Type": "application/json",
  },
});

export const set_general_config = (
  baseDomain: string,
  tokenHeaderKey?: string
) => {
  general_config = { baseDomain, tokenHeaderKey };
};

export const async_func_data = async <T = any>(
  api: string,
  paramsOrObject: Object | null,
  method: ApiMethodType,
  isTokenRequired: boolean = false,
  token?: string
): Promise<AxiosResponse<T>> => {
  const { baseDomain, tokenHeaderKey } = general_config;
  try {
    if (isTokenRequired) {
      if (!token) throw Error("[ERR]: Token needs to be specified");
      if (!tokenHeaderKey) throw Error("[ERR]: Token header to be specified");
      axios.defaults.headers[tokenHeaderKey] = token;
    }
    const axiosConfig = axios_config(api, paramsOrObject, method, baseDomain);

    const response = await axios(axiosConfig);
    return response;
  } catch (err) {
    throw err.response;
  }
};
