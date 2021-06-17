export class CodeError extends Error {
  constructor(message = '未知错误', code = -1) {
    super(message)
    this.code = code
  }
}

export class RouterError extends Error {
  constructor(message = '控制器错误') {
    super(message, 50000)
  }
}

export class ForbiddenError extends Error {
  constructor(message = '拒绝访问') {
    super(message, 40003)
  }
}

export class InvalidQueryError extends Error {
  constructor(message = '无效参数') {
    super(message, 40000)
  }
}

export class UploadFileError extends Error {
  constructor(message = '文件上传失败') {
    super(message, 40022)
  }
}
