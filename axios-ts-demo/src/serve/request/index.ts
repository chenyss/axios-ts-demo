import type { AxiosInstance } from "axios";
import axios from "axios";

class AxiosRequest {
  instance: AxiosInstance;
  constructor(config:any) {
    this.instance = axios.create(config);
  }

  request(config:any){
    return this.instance.request(config);
  }

  get(config:any){
    this.request({...config,method:'get'})
  }

  post(config:any){
    this.request({...config,method:'post'})
  }
}

export default AxiosRequest