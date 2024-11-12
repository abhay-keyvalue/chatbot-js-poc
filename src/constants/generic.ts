export const API_DOMAIN = 'https://api-inference.huggingface.co/models/';

export enum HttpMethodOptions {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum ErrorLevelType {
  SILENT = 'silent',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

export const ErrorMap = {
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Failed to authenticate given credentials'
  }
};

export const DEFAULT_THEME = {
  buttonColor: '#25314B',
  chatWindowColor: '#ffffff',
  textColor: '#333'
};
