import axiosRequest from "../index";

export const getTestData = () =>
  axiosRequest.request({
    url: "/home/multidata",
  });
