import { UploadFileInfo } from "naive-ui";
import { isAllSpace, isContainEmoji, strCode } from ".";

type DefaultRule = "LengthMustMoreThanZero" | "NotAllSpace" | "ForbiddenEmoji";
export const defaultRule = (
  str: string,
  rules: DefaultRule[],
  errorText: string[]
) => {
  const error: Array<string | false> = [];
  rules.forEach((rule, idx) => {
    switch (rule) {
      case "LengthMustMoreThanZero":
        error.push(str.length === 0 ? errorText[idx] : false);
        break;
      case "NotAllSpace":
        error.push(isAllSpace(str) ? errorText[idx] : false);
        break;
      case "ForbiddenEmoji":
        error.push(isContainEmoji(str) ? errorText[idx] : false);
        break;
      default:
        break;
    }
  });
  return error.filter((i) => i);
};
export const strInRange = (str: string, strCodeLength: number) => {
  return strCode(str) > strCodeLength;
};
export const strExist = (str: string, strArray: string[]) => {
  return strArray.includes(str);
};
// 输入的字符验证
export const nameValidator = (options: { file: UploadFileInfo }) => {
  if (options.file && options.file.name) {
    const nameReg = /[\\/:*?"<|>~]/g;
    if (nameReg.test(options.file.name)) {
      window.$message.error("文件名不能包含特殊字符");
      return false;
    }
  }
};
