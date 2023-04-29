import { axiosRequest2 } from "../index";
//设置返回值类型
interface IHomeData {
  data: any,
  returnCode: string,
  success: boolean
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
    //如果promise不使用泛型，此处为unknow类型，无法使用
    .then((res) => {
      return res;
    });
