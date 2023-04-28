import type { AxiosInstance } from "axios";
import axios from "axios";

class AxiosRequest {
  instance: AxiosInstance;
  constructor(config: any) {
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
      (config) => {
        console.log("全局响应成功");
        return config;
      },
      (err) => {
        console.log("全局响应失败");
        return err;
      }
    );

    this.instance.interceptors.response.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    );
  }

  request(config: any) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config);
    }
    return new Promise((resolve, reject) => {
      this.instance.request(config).then((res) => {
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors.responseSuccessFn(res)
        }
        resolve(res)
      }).catch(err=>{
        reject(err)
      });
    });
  }

  get(config: any) {
    this.request({ ...config, method: "get" });
  }

  post(config: any) {
    this.request({ ...config, method: "post" });
  }
}

export default AxiosRequest;
