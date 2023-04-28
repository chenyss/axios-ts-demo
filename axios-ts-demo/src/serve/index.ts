import { BASE_URL, TIME_OUT } from "./config";
import AxiosRequest from "./request";

const axiosRequest = new AxiosRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default axiosRequest