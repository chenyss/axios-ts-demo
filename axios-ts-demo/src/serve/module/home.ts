import { axiosRequest2 } from "../index";

export const getTestData = () =>
  axiosRequest2.request({
    url: "/home/multidata",
    interceptors: {
      requestSuccessFn: (config: any) => {
        console.log("特定的请求成功的拦截")
        return config
      },
      requestFailureFn: (err: any) => {
        console.log("特定的请求失败的拦截")
        return err
      },
      responseSuccessFn: (res: any) => {
        console.log("特定的响应成功的拦截")
        return res
      },
      responseFailureFn: (err: any) => {
        console.log("特定的响应失败的拦截")
        return err
      }
    }
  });
