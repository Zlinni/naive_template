import { AxiosPromise, GenericAbortSignal } from "axios";
// import { getErrorCode } from "../utils/codeErrorMap";
type ApiResponse = AxiosPromise<any>;
type ApiResponseData<R extends ApiResponse> = Awaited<R>["data"];
type CommonReturn<R extends ApiResponse> = Promise<void | ApiResponseData<R>>;
type ApiFnNoParams<T extends ApiResponse> = () => T;
type ApiFnWithParams<T, R extends ApiResponse> = (params: T, ...args: any) => R;
type ApiFnWithData<T, R extends ApiResponse> = (data: T, ...args: any) => R;
type ApiFnWithArgs<T, R extends ApiResponse> =
  | ApiFnWithParams<T, R>
  | ApiFnWithData<T, R>;
type ApiFn<T, R extends ApiResponse> = ApiFnWithArgs<T, R> | ApiFnNoParams<R>;
type CallBackType = {
  success?: string;
  error?: (...args: any) => void | undefined;
  // 取消请求
  signal?: GenericAbortSignal;
};
type ReturnType1<R extends ApiResponse> = (
  cb?: CallBackType
) => CommonReturn<R>;
type ReturnType2<T, R extends ApiResponse> = (
  params: T,
  cb?: CallBackType
) => CommonReturn<R>;
type TrueReturn<T, R extends ApiResponse> = ReturnType2<T, R> | ReturnType1<R>;
// 装饰器
function showErrorCallBack(
  errorText: string,
  callBack?: (...args: any) => void
) {
  !callBack && window?.$message?.error(errorText);
  callBack && callBack(errorText);
}
function apiDecorator<R extends ApiResponse>(
  fn: ApiFnNoParams<R>
): ReturnType1<R>;
function apiDecorator<T, R extends ApiResponse>(
  fn: ApiFnWithArgs<T, R>
): ReturnType2<T, R>;

function apiDecorator<T, R extends ApiResponse>(
  fn: ApiFn<T, R>
): TrueReturn<T, R> {
  const functionName = fn.name;
  const length = fn.length;
  if (length > 0) {
    return async (params: T, cb?: CallBackType): CommonReturn<R> => {
      try {
        const { data, code, msg } = cb?.signal
          ? await fn(params, cb.signal)
          : await fn(params);
        if (code !== 0) {
          showErrorCallBack(msg, cb?.error);
          return;
        }
        // const errText = getErrorCode(code);
        // if (errText) {
        // showErrorCallBack(errText, cb?.error);
        // return;
        // }
        cb?.success && window?.$message?.success(cb.success);
        return data;
      } catch (error) {
        console.log(error);
        const errText = "获取" + functionName + "失败";
        showErrorCallBack(errText, cb?.error);
        return;
      }
    };
  }
  return async (cb?: CallBackType): CommonReturn<R> => {
    try {
      const f = fn as ApiFnNoParams<R>;
      const { data, code, msg } = await f();
      // const errText = getErrorCode(code);
      // if (errText) {
      //   showErrorCallBack(errText, cb?.error);
      //   return;
      // }
      if (code !== 0) {
        showErrorCallBack(msg, cb?.error);
        return;
      }
      cb?.success && window?.$message?.success(cb.success);
      return data;
    } catch (error) {
      console.log(error);
      const errText = "获取" + functionName + "失败";
      showErrorCallBack(errText, cb?.error);
      return;
    }
  };
}

export { apiDecorator };
