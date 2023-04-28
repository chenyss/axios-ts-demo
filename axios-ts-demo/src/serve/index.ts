import { BASE_URL, TIME_OUT } from "./config";
import AxiosRequest from "./request";

const axiosRequest = new AxiosRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export const axiosRequest2 = new AxiosRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config: any) => {
      console.log("特定axios实例的请求成功的拦截")
      return config
    },
    requestFailureFn: (err: any) => {
      console.log("特定axios实例的请求失败的拦截")
      return err
    },
    responseSuccessFn: (res: any) => {
      console.log("特定axios实例的响应成功的拦截")
      return res
    },
    responseFailureFn: (err: any) => {
      console.log("特定axios实例的响应失败的拦截")
      return err
    }
  }
})

export default axiosRequest