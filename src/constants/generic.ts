export const COOKIE_EXPIRATION_TIME_IN_DAYS = 7;

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

export const ErrorMap: { [key: string]: { code: string; message: string } } = {
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: 'Failed to authenticate given credentials'
  },
  GENERIC_API_ERROR: {
    code: 'API_ERROR',
    message: 'Something went wrong'
  },
  ERROR_IN_PARSING: {
    code: 'ERROR',
    message: 'Something went wrong'
  }
};

export enum ErrorTypes {
  ERROR = 'ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR'
}

export const DEFAULT_THEME = {
  primaryColor: '#25314B',
  chatWindowColor: '#ffffff',
  textColor: '#333'
};
