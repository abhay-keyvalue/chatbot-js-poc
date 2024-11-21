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
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Failed to fetch data'
  },
  GENERIC_API_ERROR: {
    code: 'API_ERROR',
    message: 'Something went wrong'
  },
  ERROR_IN_PARSING: {
    code: 'ERROR',
    message: 'Error in parsing the response'
  }
};

export enum ErrorTypes {
  ERROR = 'ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  ERROR_IN_PARSING = 'ERROR_IN_PARSING',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
}

export const DEFAULT_THEME = {
  primaryColor: '#25314b',
  secondaryColor: '#3498db',
  chatWindowColor: '#ffffff',
  textColor: '#333'
};

export enum LogLevel {
  INFO,
  ERROR
}

export const logMessages = {
  initializeChatBotUI: 'Initializing ChatBot UI',
  startingConversation: 'Starting conversation',
  togglingChatWindow: 'Toggling chat window:',
  receivedMessageFromBot: 'Received complete message from bot:',
  sendMessageToBot: 'Sending message to bot:',
  errorStartingConversation: 'Error starting conversation:'
};
