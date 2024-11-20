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
    NETWORK_ERROR = "NETWORK_ERROR"
}
export declare const DEFAULT_THEME: {
    primaryColor: string;
    chatWindowColor: string;
    textColor: string;
};
