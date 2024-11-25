import { COLORS } from './colors';
import { en } from './translation';

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
  primaryColor: COLORS.primary,
  secondaryColor: COLORS.secondary,
  chatWindowColor: COLORS.white,
  textColor: COLORS.primaryText
};

export const DEFAULT_SETTINGS = {
  chatTitle: en.chatbot_title,
  chatPlaceholder: en.chatbot_placeholder,
  logEnabled: false,
  position: {
    bottom: '20px',
    right: '20px'
  },
  theme: DEFAULT_THEME
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

export const RETRY_COUNT = 3;
export const RETRY_DELAY = 1000;

export const MessageTypes = {
  BOT: 'bot',
  USER: 'user',
  DATE: 'date'
};
