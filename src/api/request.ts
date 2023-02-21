/* eslint-disable no-param-reassign */
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import config from "@/config";
import { useRouter } from "vue-router";

type GetIResponseData<T> = T extends AxiosPromise<infer U> ? U : never;
export type GetPromiseFunctionData<T extends (...args: any) => any> =
  GetIResponseData<ReturnType<T>>;

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number;
    data: T;
    // 这里追加你的参数
  }
  export function create(configs?: AxiosRequestConfig): AxiosInstance;
}
function request(axiosConfig: AxiosRequestConfig) {
  const service = axios.create({
    baseURL: `${config.baseUrl}/api`, // env
    timeout: 50000,
  });
  // 请求拦截器全局
  service.interceptors.request.use(
    (configs: any) => {
      const token = localStorage.getItem("pero_authorization");
      if (token) {
        // 通过请求头的方式发送token
        configs.headers.Authorization = token;
      }
      return configs;
    },
    (err) => Promise.reject(err)
  );
  // 响应拦截器全局
  service.interceptors.response.use(
    (res) => {
      const { code } = res.data;
      if (code && code === -1) {
        throw new Error(res.data.data.err);
      }
      // 防止下载的时候后端不包一层外置
      if (!code && code !== 0) {
        const resType = Object.prototype.toString.call(res.data);
        const isBlob = resType === "[object Blob]";
        if (isBlob || resType === "[object String]") return res;
      }
      return res.data;
    },
    (err) => {
      const { status } = err.response;
      console.log(status, "status");
      if (status === 401) {
        const router = useRouter();
        router.push({
          name: "Login",
        });
      }
      Promise.reject(err);
    }
  );
  return service(axiosConfig);
}
export default request;
