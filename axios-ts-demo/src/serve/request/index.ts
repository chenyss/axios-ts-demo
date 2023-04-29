import type { AxiosInstance } from "axios";
import axios from "axios";
import type { DIYRequestConfig } from "./type";

class AxiosRequest {
  instance: AxiosInstance;
  //用自定义的type代替AxiosInstance
  constructor(config: DIYRequestConfig) {
    this.instance = axios.create(config);
  //添加全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("全局请求成功");
        return config;
      },
      (err) => {
        console.log("全局请求失败");
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log("全局响应成功");
        return res.data;
      },
      (err) => {
        console.log("全局响应失败");
        return err;
      }
    );
    //手动添加axios实例拦截器（在创建实例时自定义interceptors）
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn as any,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }
  //注意区分此处的config与构造函数config不同，此处为module接口函数调用实例传进去的config，构造函数config为创建实例时传入config
  //传入的T为接口返回值类型，在module接口函数处传入
  //DIYRequestConfig在原先类型AxiosInstance新增了可选的interceptors属性，在接口函数处传入拦截器方法，将返回值类型传入的原因在下面解释
  request<T = any>(config: DIYRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }
    //将泛型T传给Promise作为返回值类型，因为由于使用了promise代替原先的this.instance.request，如果对接口函数调用then方法，得到的res将是unknow类型
    return new Promise<T>((resolve, reject) => {
      //request的第二个泛型参数决定返回值类型，默认是AxiosResponse，这里需要用接口的返回值类型代替
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //DIYRequestConfig<T>的原因是responseSuccessFn默认返回值为AxiosResponse，所以需要传入接口的返回值类型代替
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: DIYRequestConfig<T>) {
    this.request({ ...config, method: "get" });
  }

  post<T = any>(config: DIYRequestConfig<T>) {
    this.request({ ...config, method: "post" });
  }
}

export default AxiosRequest;
