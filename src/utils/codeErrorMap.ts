export function getErrorCode(code: number) {
  switch (code) {
    case 1:
      return "请求参数错误";
    case 2:
      return "上下文解析错误";
    case 4:
      return "非法操作";
    case 5:
      return "权限不足";
    case 100002:
      return "当前用户不是管理员";
    case 100300:
      return "上传的文件不是图片";
    case 100301:
      return "上传文件错误";
    case 100302:
      return "上传的文件大小超过上限";
    case 100303:
      return "上传的文件不是音频";
    case 100304:
      return "上传的文件不是文本";
    case 100305:
      return "上传的文件不是pdf";
    case 100306:
      return "上传的文件名不合法";
    case 100400:
      return "目录不存在";
    case 100500:
      return "作品已存在该标签";
    case 100501:
      return "作品可设置标签数已达上限";
    case 100502:
      return "作品不存在";
    case 100600:
      return "音乐已完成评分";
    case 100601:
      return "音乐尚未完成评分(还有未评分的成员)";
    case 100602:
      return "当前用户还没对该音乐进行过评分";
    default:
      return null;
  }
}
