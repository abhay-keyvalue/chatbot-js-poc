import type { GetCookieTypes, SetCookieTypes } from '@types';
import { LogLevel } from './constants';
/**
 * Retrieves the value of a cookie by its name.
 * @param {GetCookieTypes} options - The options for retrieving the cookie.
 * @returns {string} The value of the cookie.
 */
declare const getCookie: ({ cookieName }: GetCookieTypes) => string;
/**
 * Sets a cookie with the specified name, value, and expiry.
 * @param {SetCookieTypes} options - The options for setting the cookie.
 */
declare const setCookie: ({ cookieName, cookieValue, expiryInDays }: SetCookieTypes) => void;
declare const logger: {
    log: (level: LogLevel.INFO | LogLevel.ERROR, message: string) => Promise<void>;
    error(error: string): void;
    info(message: string): void;
};
declare const chatSdkError: (message: string) => Error;
declare const isArray: (obj: unknown) => boolean;
declare const isObject: (obj: unknown) => boolean;
declare const isBoolean: (val: unknown) => boolean;
declare const isEmptyArray: (obj: unknown[]) => boolean;
declare const isEmptyObject: (obj: unknown) => unknown;
declare const isEmptyString: (str: unknown) => boolean;
declare const isNonEmptyObject: (obj: unknown) => unknown;
declare const isNonEmptyArray: (arr: unknown) => boolean;
declare const isNonEmptyString: (str: unknown) => boolean;
export { getCookie, setCookie, chatSdkError, isArray, isObject, isBoolean, isEmptyArray, isEmptyObject, isEmptyString, isNonEmptyObject, isNonEmptyArray, isNonEmptyString, logger };
