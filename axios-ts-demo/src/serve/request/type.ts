import type { AxiosRequestConfig, AxiosResponse } from "axios"
export interface DIYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig 
  requestFailureFn?: (err: any) => any 
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any 
}

export interface DIYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig{
  interceptors?: DIYInterceptors<T>
}