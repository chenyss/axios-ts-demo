import type { AxiosInstance } from "axios";
import axios from "axios";
import type { DIYRequestConfig } from "./type";

class AxiosRequest {
  instance: AxiosInstance;
  constructor(config: DIYRequestConfig) {
    this.instance = axios.create(config);

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
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn as any,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  request<T = any>(config: DIYRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
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
