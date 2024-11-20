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
export { getCookie, setCookie, chatSdkError };
