/**
 * 抽取array[object]中的指定项
 * @param arrayObject 对象数组
 * @param key 对象数组中的指定key
 * @param values 抽取的内容 为数组
 * @returns
 */
const pickKeyArrFromArrayObject = <T extends Record<string, any>>(
  arrayObject: Array<T>,
  key: keyof T,
  values: Array<keyof T> | any[]
): T[] => arrayObject.filter((item) => item[key] && values.includes(item[key]));

/**
 * 删除数组中指定元素 并返回原数组
 */
const delSelectedElementFromArray = <T extends Array<U>, U>(
  arr: T,
  key: U
): U[] => {
  arr.splice(arr.indexOf(key), 1);
  return arr;
};
/**
 * 数组比较差异返回交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 返回交集
 */
const diffArrUnion = <T extends Array<any>>(arr1: T, arr2: T): T => {
  return arr1.reduce((res, key1) => {
    const sameKey = arr2.find((key2) => key2 === key1);
    sameKey && res.push(sameKey);
    return res;
  }, [] as unknown as T);
};
/**
 * 数组比较差异返回差集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 返回差集
 */
const diffArrDiff = (arr1: Array<any>, arr2: Array<any>) => {
  return arr1.reduce((pre, cur) => {
    const res = arr2.some((item2) => item2 === cur);
    !res && pre.push(cur);
    return pre;
  }, []);
};

const groupBy = <T extends Record<string, any>>(
  array: T[],
  callBack: (item: T) => any
): T[][] => {
  const memo = array.reduce((pre, cur) => {
    const mark = JSON.stringify(callBack(cur));
    pre[mark] = pre[mark] || [];
    pre[mark].push(cur);
    return pre;
  }, {} as Record<string, T[]>);
  return Object.keys(memo).map((key) => memo[key]);
};

/**
 * 根据对象数组中的某一项分类数据
 * @param array 对象数组
 * @param target 目标key
 * @returns 分类后的数据
 */
const arrayGroupBy = <T extends Record<string, any>>(
  array: T[],
  target: keyof T
): T[][] => {
  return groupBy(array, (item) => item[target]);
};
/**
 * 抽取出array中的字符串并拼接上你喜欢的字符
 * @param inArr string | string[]
 * @returns array + /
 */
const processArrayWithUnderline = (inArr: string[], inStr = "/"): string => {
  if (Array.isArray(inArr)) {
    if (inArr.length === 0) return "";
    const str = inArr.reduce((pre, cur) => {
      return (pre += cur + inStr);
    }, "");
    const inStrLen = inStr.length;
    return str.slice(0, -inStrLen);
  }
  return inArr;
};

/**
 * 如果在数组里就删除 否则就push
 * @param arr 数组
 * @param item 数组中的项
 * @param method 'push'|'unshift'
 * @returns 操作后的数组
 */
const addOrDelInArray = <T>(arr: T[], item: T, method?: "push" | "unshift") => {
  // 有就删除 没有就加入
  arr.includes(item)
    ? delSelectedElementFromArray(arr, item)
    : arr?.[method ?? "push"](item);
  return arr;
};

/**
 * 将数组分割成每n份为一组
 * @param arr 数组
 * @param size n份
 * @returns 分割后的数组
 */
const sliceArray = <T>(arr: T[], size: number): T[][] => {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i = i + size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

export {
  pickKeyArrFromArrayObject,
  delSelectedElementFromArray,
  diffArrUnion,
  diffArrDiff,
  arrayGroupBy,
  processArrayWithUnderline,
  addOrDelInArray,
  sliceArray,
};
/**
 * 返回指定范围的数字
 * @param min 最小的值
 * @param max 最大的值
 * @param now 当前的值
 * @returns 范围数字
 */
const returnRangeNumber = (min: number, max: number, now: number): number => {
  if (now > max) return max;
  if (now < min) return min;
  return now;
};
/**
 * 判断是否在指定范围中
 * @param min 最小的值
 * @param max 最大的值
 * @param now 当前的值
 * @returns boolean
 */
const ifInRange = (min: number, max: number, now: number): boolean =>
  now > min && now < max;

/**
 * 对于小于10的数字前置加0
 * @param num
 * @returns string
 */
const ifLessThanTenAddZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

/**
 * 获取字符数
 * @param str 字符串
 * @param chineseStrByte 中文作为多少个字节
 * @returns 字符数number
 */
const strCode = (str: string, chineseStrByte = 2): number => {
  // 字符编码大于255，说明是双字节字符(即是中文)
  return str.split("").reduce((pre, cur, idx) => {
    pre += str.charCodeAt(idx) > 255 ? chineseStrByte : 1;
    return pre;
  }, 0);
};

/**
 * 返回计时器Interval
 * @param timer 每隔几秒触发一次
 * @param callBack 计时器执行的函数
 * @returns 计时器id number
 */
const setCalTimer = (timer: number, callBack: () => void): number =>
  window.setInterval(() => callBack(), timer);

type loopArr = Array<any>;
type loopFn = (arg: loopArr[number]) => Promise<any>;
/**
 * 异步递归 遇到失败就抛出异常暂停
 * @param taskArr 递归数组
 * @param loopFn 异步函数 参数为递归数组中的项
 */
const awaitLoop = async (taskArr: loopArr, loopFn: loopFn) => {
  try {
    if (taskArr.length === 0) return;
    await loopFn(taskArr.shift());
  } catch (error) {
    throw new Error(error as string);
  }
};

/**
 * 更好的洗牌算法
 * @param items 排序数组
 * @returns 排序后的数组
 */
const shuffle = (items: Array<any>): Array<any> => {
  items = [...items];
  for (let i = items.length; i > 0; i--) {
    const idx = Math.floor(Math.random() * i);
    [items[idx], items[i - 1]] = [items[i - 1], items[idx]];
  }
  return items;
};

/**
 * 创建测试异步函数
 * @param inputMsg 输入的信息
 * @param outPutMsg 输出的信息
 * @param errorMsg 错误信息，如果输入的信息等于错误信息则抛出异常
 * @param timeout 延迟
 * @returns Promise
 */
const createPromiseFn = (
  inputMsg: any,
  outPutMsg: any,
  errorMsg: any,
  timeout: number
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    if (inputMsg === errorMsg) reject(new Error(errorMsg));
    setTimeout(() => {
      resolve(outPutMsg);
    }, timeout);
  });
};

/**
 * 根据输入的object创建formData
 * @param obj Object
 * @returns formdata
 */
const createFormData = <T extends Record<string, any>>(
  obj: T
): Required<T> | T => {
  return Object.keys(obj).reduce((pre, key) => {
    pre.append(key, obj[key]);
    return pre;
  }, new FormData()) as unknown as T;
};

/**
 * 根据object返回map对象
 * @param obj object
 * @returns map对象
 */
const createMapper = <T extends Record<string, any>>(
  obj: T
): Map<keyof T, T[keyof T]> => {
  return Object.keys(obj).reduce((pre, key) => {
    pre.set(key, obj[key]);
    return pre;
  }, new Map());
};
/**
 * 反转Object键值对
 * @param Object 对象
 * @returns
 */
const reverseObject = <T extends Record<string, any>>(
  mapper: T
): Record<T[keyof T], keyof T> => {
  return Object.keys(mapper).reduce((pre, curKey: keyof T) => {
    pre[mapper[curKey]] = curKey;
    return pre;
  }, {} as Record<T[keyof T], keyof T>);
};

export {
  returnRangeNumber,
  ifInRange,
  ifLessThanTenAddZero,
  strCode,
  setCalTimer,
  awaitLoop,
  shuffle,
  createPromiseFn,
  createFormData,
  createMapper,
  reverseObject,
};
/**
 * 注入链接到a标签并模拟点击
 * @param url 链接
 * @param fileName 文件名字
 */
const injectHerf = (url: string, target = "_blank") => {
  const link: HTMLAnchorElement = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  // 新页面打开
  link.target = target;
  // 触发点击
  document.body.appendChild(link);
  link.click();
  // 移除
  document.body.removeChild(link);
};

export { injectHerf };
/**
 * 下载blob文件
 * @param blob blob
 * @param fileName 文件名
 */
const downloadFileByBlob = (blob: Blob, fileName?: string): void => {
  const blobUrl: string = window.URL.createObjectURL(blob);
  const link: HTMLAnchorElement = document.createElement("a");
  link.download = fileName || "";
  link.style.display = "none";
  link.href = blobUrl;
  // 触发点击
  document.body.appendChild(link);
  link.click();
  // 移除
  document.body.removeChild(link);
};
/**
 * file或blob 转base64
 * @param {*} blob file或者blob
 * @param {*} callback function (data)通过参数获得base64
 */
const blobToBase64 = (blob: Blob | File, callback: (res: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    callback(reader.result as string);
  });
  reader.readAsDataURL(blob as Blob);
};

/**
 * base64转file对象
 * @param dataurl base64 url
 * @param filename 文件名称
 * @returns
 */
const dataURLtoFile = (dataurl: string, filename: string) => {
  // base64转file对象
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/);
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (mime) {
    return new File([u8arr], filename, { type: mime[1] }); // 转成了jpeg格式
  }
};

/**
 * 下载url 需要axios!!
 * @param url 链接
 * @param fileName 文件名字
 */
// const downloadByUrl = (url: string, fileName: string) => {
//     const config = {
//       responseType: "blob",
//     } as any;
//     axios.get(url, config).then((res) => {
//       // 注意设置type
//       const blob = new Blob([res.data], {
//         type: res.data.type,
//       });
//       downloadFileByBlob(blob, fileName);
//     });
//   };
// 思路是创建一个图片，将file等于这个图片，然后创建一个canvas图层 ，将canvas等比例缩放，
// 然后用canvas的drawImage将图片与canvas合起来，然后在把canvas的base64转成file即可
/**
 * 裁剪图片
 * @param file 文件
 * @returns 裁剪后的图片 file格式
 */
const convertImage = (file: File): Promise<File> =>
  new Promise((resolve) => {
    const fileName = file.name.substring(0, file.name.indexOf("."));
    const reader = new FileReader(); // 读取file
    reader.readAsDataURL(file as unknown as Blob);
    reader.onloadend = (e: any) => {
      const image = new Image(); // 新建一个img标签（还没嵌入DOM节点)
      image.src = e.target.result; // 将图片的路径设成file路径
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const imageWidth = image.width;
        // 考虑到长途的情况 这里是按比例切分 比如他的比例宽高超过了1:3则强行剪成1:3
        const ratioHeight = 3 * image.width;
        const imageHeight =
          image.height > ratioHeight ? ratioHeight : image.height;
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        if (context) {
          context.drawImage(
            image,
            0,
            0,
            imageWidth,
            imageHeight,
            0,
            0,
            imageWidth,
            imageHeight
          );
          const newfile = dataURLtoFile(
            canvas.toDataURL("image/jpeg"),
            `${fileName}.jpeg`
          ) as File;
          resolve(newfile);
        }
        // 超出裁剪 这一步还可以优化就是如果缩略图不需要那么大的像素点 可以缩小像素点
      };
    };
  });

export { downloadFileByBlob, dataURLtoFile, blobToBase64, convertImage };
// 计算当前时间并转换为对应时间的js 时效性强
import dayjs from "dayjs";

/**
 * 返回对应的星期 如2023/1/10返回二
 * @param time 当前时间
 * @returns 星期
 */
const chineseWeek = (time: Date): string => {
  const weekObj = {
    0: "日",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
  };
  const week = dayjs(time).day() as keyof typeof weekObj;
  return weekObj[week];
};

/**
 * 把s转分秒
 * @param time 秒数 number
 * @returns eg 02:30
 */
const secondToMinSecond = (time: number): string => {
  const min: number = Math.floor(time / 60);
  const second: number = Math.floor(time - min * 60);
  return `${ifLessThanTenAddZero(min)}:${ifLessThanTenAddZero(second)}`;
};
/**
 * 返回中文的时间 时效性强
 * 超出今年的年份 返回例子: 2022-1-20
 * 在今年不在本月中 返回例子: 1-20
 * 在本月不在本周 返回例子: 1-20
 * 在本周不在昨天 返回例子: 周六-10:20
 * 昨天 返回例子: 昨天-20:00
 * 当天 返回例子: 20:00
 * 错误情况 返回例子: 时间错误
 * @param time 时间Date
 * @returns string
 */
const chineseCurrentTime = (time: Date): string => {
  const timeNum = dayjs(time).valueOf();
  // 当前年的最开始
  const yearStart = dayjs().startOf("year").valueOf();
  // 当前月的最开始
  const monthStart = dayjs().startOf("month").valueOf();
  // 当前周的最开始
  const weekStart = dayjs().startOf("week").valueOf();
  // 当前天的最开始
  const todayStart = dayjs().startOf("day").valueOf();
  // 昨天的最开始
  const yestodayStart = dayjs().startOf("day").valueOf() - 1000 * 60 * 60 * 24;

  const year: number = dayjs(timeNum).year();
  const month: string = ifLessThanTenAddZero(dayjs(timeNum).month() + 1);
  const date: string = ifLessThanTenAddZero(dayjs(timeNum).date());
  //   const hour: string = ifLessThanTenAddZero(dayjs(timeNum).hour());
  //   const minute: string = ifLessThanTenAddZero(dayjs(timeNum).minute());
  //   const weekValue: string = chineseWeek(time);
  // 超出今年的年份
  if (timeNum < yearStart) {
    // return `${year}-${month}-${date}`;
    return `${year}-${month}`;
  }
  // 在今年不在本月中
  if (ifInRange(yearStart, monthStart, timeNum)) {
    return `${month}-${date}`;
  }
  // 在本月不在本周
  if (ifInRange(monthStart, weekStart, timeNum)) {
    // return `${month}-${date}`;
    return `${month}月`;
  }
  // 在本周不在昨天
  if (ifInRange(weekStart, yestodayStart, timeNum)) {
    // return `周${weekValue}-${hour}:${minute}`;
    return "本周";
  }
  // 昨天的
  if (ifInRange(yestodayStart, todayStart, timeNum)) {
    // return `昨天-${hour}:${minute}`;
    return `昨天`;
  }
  // 当天的
  if (timeNum > todayStart) {
    // return `${hour}:${minute}`;
    return "今天";
  }
  return "时间错误";
};
/**
 * unix时间戳转Date
 * @param unix 时间戳 13 或者 10位
 * @returns Date
 */
const unixToDate = (unix: number): Date => {
  const len = unix.toString().length;
  if (len === 13) {
    return new Date(unix);
  } else if (len === 10) {
    return new Date(unix * 1000);
  }
  return new Date(unix);
};
/**
 * 替换文本中的内容
 * @param start 开始位置
 * @param end 结束位置
 * @param orginText 原文本
 * @param newText 替换的新文本
 * @returns 替换后组合成的新文本
 */
const replaceText = (
  start: number,
  end: number,
  orginText: string,
  newText: string
) => {
  const firstPart = orginText.slice(0, start);
  const lastPart = orginText.slice(end + 1);
  return firstPart + newText + lastPart;
};
/**
 * 创建随机字符串
 * @param length 长度
 * @returns 随机字符串
 */
const generateRandomString = (length = 5) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
/**
 * 校验是否全是空格
 * @param str 字符串
 * @returns 布尔值结果
 */
const isAllSpace = (str: string) => {
  return str.length > 0 && str.trim().length === 0;
};
/**
 * 首字母转大写或者小写
 * @param str 需要转的字符串
 * @param type 类型 "lower" | "upper" 小写或者大写
 */
const firstLetterLowerOrUpperCase = (str: string, type: "lower" | "upper") =>
  str.replace(
    str[0],
    type === "lower" ? str[0].toLowerCase() : str[0].toUpperCase()
  );
const isContainEmoji = (str: string) => {
  // 判断是否含有emoji表情
  const iconRule2 =
    // eslint-disable-next-line no-misleading-character-class
    /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[A9|AE]\u3030|\uA9|\uAE|\u3030/gi;
  return iconRule2.test(str);
};
export {
  chineseWeek,
  secondToMinSecond,
  chineseCurrentTime,
  unixToDate,
  replaceText,
  generateRandomString,
  isAllSpace,
  isContainEmoji,
  firstLetterLowerOrUpperCase,
};
