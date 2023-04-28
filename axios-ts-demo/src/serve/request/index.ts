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
  }

  request(config: any) {
    return this.instance.request(config);
  }

  get(config: any) {
    this.request({ ...config, method: "get" });
  }

  post(config: any) {
    this.request({ ...config, method: "post" });
  }
}

export default AxiosRequest;
