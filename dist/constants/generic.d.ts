export declare const COOKIE_EXPIRATION_TIME_IN_DAYS = 7;
export declare enum HttpMethodOptions {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
export declare enum ErrorLevelType {
    SILENT = "silent",
    INFO = "info",
    WARN = "warn",
    ERROR = "error",
    FATAL = "fatal"
}
export declare const ErrorMap: {
    [key: string]: {
        code: string;
        message: string;
    };
};
export declare enum ErrorTypes {
    ERROR = "ERROR",
    NETWORK_ERROR = "NETWORK_ERROR",
    ERROR_IN_PARSING = "ERROR_IN_PARSING",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS"
}
export declare const DEFAULT_THEME: {
    primaryColor: string;
    secondaryColor: string;
    chatWindowColor: string;
    textColor: string;
};
export declare enum LogLevel {
    INFO = 0,
    ERROR = 1
}
export declare const logMessages: {
    initializeChatBotUI: string;
    startingConversation: string;
    togglingChatWindow: string;
    receivedMessageFromBot: string;
    sendMessageToBot: string;
    errorStartingConversation: string;
};
