import axios, { AxiosRequestConfig } from "axios";
import router from "@/router";
import { TOKEN_NAME } from "@/config";
declare module "axios" {
  interface AxiosResponse<T = any> {
    code: number;
    data: T;
    msg: string;
    // 这里追加你的参数
  }
  export function create(configs?: AxiosRequestConfig): AxiosInstance;
}
const request = (axiosConfig: AxiosRequestConfig) => {
  const service = axios.create({
    baseURL: "",
    timeout: 50000,
  });
  // 请求拦截器全局
  service.interceptors.request.use(
    (configs: AxiosRequestConfig<any>) => {
      const token = localStorage.getItem(TOKEN_NAME);
      if (token) {
        if (configs.headers?.fakeAuthorization) {
          configs.headers["Authorization"] = configs.headers.fakeAuthorization;
          delete configs.headers.fakeAuthorization;
          return configs;
        }
        // 通过请求头的方式发送token
        configs.headers &&
          (configs.headers["Authorization"] = "Bearer " + token);
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
      // 如果是被取消的请求不返回error
      if (err?.code === "ERR_CANCELED") {
        return {
          data: null,
        };
      }
      if (err.response) {
        const { status, data, msg } = err.response;
        // const { code } = data;
        // const errText = getErrorCode(code);
        window?.$message?.error(msg);
        if (status === 401) {
          localStorage.removeItem(TOKEN_NAME);
          router.push({
            name: "Login",
          });
        }
      }
      Promise.reject(err);
    }
  );
  return service(axiosConfig);
};
export default request;
