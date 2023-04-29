import type { AxiosRequestConfig, AxiosResponse } from "axios"
//自定义config类型，继承自AxiosRequestConfig，需要主要必须全员设置可选
//兼容接口自定义返回值类型的需求，将responseSuccessFn值类型设为泛型
export interface DIYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig 
  requestFailureFn?: (err: any) => any 
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any 
}

export interface DIYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig{
  interceptors?: DIYInterceptors<T>
}