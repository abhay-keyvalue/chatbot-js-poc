export const API_DOMAIN = 'https://51a3-103-138-236-18.ngrok-free.app';

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

export const CHATBOT_ICON_URL = 'https://cdn-icons-png.flaticon.com/128/18221/18221591.png';

export const CHATBOT_SEND_ICON_URL = 'https://cdn-icons-png.flaticon.com/128/14025/14025522.png';
