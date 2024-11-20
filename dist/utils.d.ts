import type { GetCookieTypes, SetCookieTypes } from '@types';
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
declare const chatSdkError: (message: string) => Error;
declare const isArray: (obj: any) => boolean;
declare const isObject: (obj: any) => boolean;
declare const isBoolean: (val: any) => boolean;
declare const isEmptyArray: (obj: any) => boolean;
declare const isEmptyObject: (obj: any) => any;
declare const isEmptyString: (str: any) => boolean;
declare const isNonEmptyObject: (obj: any) => any;
declare const isNonEmptyArray: (arr: any) => boolean;
declare const isNonEmptyString: (str: any) => boolean;
export { getCookie, setCookie, chatSdkError, isArray, isObject, isBoolean, isEmptyArray, isEmptyObject, isEmptyString, isNonEmptyObject, isNonEmptyArray, isNonEmptyString };
