import { axiosRequest2 } from "../index";
interface IHomeData {
  banner: any;
  dKeyword: any;
  keywords: any;
  recommend: any;
}
export const getTestData = () =>
  axiosRequest2.request<IHomeData>({
      url: "/home/multidata",
      interceptors: {
        requestSuccessFn: (config: any) => {
          console.log("特定的请求成功的拦截");
          return config;
        },
        requestFailureFn: (err: any) => {
          console.log("特定的请求失败的拦截");
          return err;
        },
        responseSuccessFn: (res: any) => {
          console.log("特定的响应成功的拦截");
          return res;
        },
        responseFailureFn: (err: any) => {
          console.log("特定的响应失败的拦截");
          return err;
        },
      },
    })
    .then((res) => {
      return res;
    });
