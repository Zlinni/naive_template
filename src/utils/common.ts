// import { download } from "@/api/Download/download";
/**
 * 设置sortable元素
 * @param className 元素的class
 * @param collectSortableFn 产生的sortable函数 回调用于销毁 可选
 * @param onEndFn 移动结束的时候触发的函数 可选
 * @returns
 */

/**
 * 下载url
 * @param url 链接
 * @param fileName 文件名字
 */
// export const downloadByUrl = async (url: string, fileName?: string) => {
//   // 注意 mock 服务会拦截这个链接 要关闭mock服务
//   const { data } = await download.download(url);
//   const blob = new Blob([data], {
//     type: data.type,
//   });
//   console.log(blob, data.type, "blob");
//   downloadFileByBlob(blob, fileName || "");
// };
// 要求cos链接有带文件本身的名字和后缀名 比如cos/picture.png
// 注意 mock 服务会拦截这个链接 要关闭mock服务
export const getUrlFromText = (text: string) => {
  const regexp = /((http|ftp|https|file):[^'"\s]+)/gi;
  text = text.replace(
    regexp,
    "<a href='$1' class='text-[#0256ff] underline' target='_blank'>$1</a>"
  );
  return text;
};
export const numberToString = (key: number | string) => {
  return typeof key === "string" ? key : key.toString();
};
export const stringToNumber = (key: number | string) => {
  return typeof key === "number" ? key : +key;
};
