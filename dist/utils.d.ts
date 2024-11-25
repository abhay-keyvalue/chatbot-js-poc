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
/**
 * Logs a message with the specified log level.
 * @param {LogLevel.INFO | LogLevel.ERROR} level - The log level.
 * @param {string} message - The log message.
 */
declare const logger: {
    log: (level: LogLevel.INFO | LogLevel.ERROR, message: string) => Promise<void>;
    error(error: string): void;
    info(message: string): void;
};
/**
 * Formats the timestamp into a readable date string.
 * @param {number} timestamp - The timestamp to format.
 * @returns {string} - The formatted date string.
 */
declare const getFormattedDate: (timestamp: number) => string;
/**
 * Creates a new Chat SDK error.
 * @param {string} message - The error message.
 * @returns {Error} - The Chat SDK error.
 */
declare const chatSdkError: (message: string) => Error;
/**
 * Checks if the given value is an array.
 * @param {unknown} obj - The value to check.
 * @returns {boolean} - True if the value is an array, false otherwise.
 */
declare const isArray: (obj: unknown) => boolean;
/**
 * Checks if the given value is an object.
 * @param {unknown} obj - The value to check.
 * @returns {boolean} - True if the value is an object, false otherwise.
 */
declare const isObject: (obj: unknown) => boolean;
/**
 * Checks if the given value is a boolean.
 * @param {unknown} val - The value to check.
 * @returns {boolean} - True if the value is a boolean, false otherwise.
 */
declare const isBoolean: (val: unknown) => boolean;
/**
 * Checks if the given array is empty.
 * @param {unknown[]} obj - The array to check.
 * @returns {boolean} - True if the array is empty, false otherwise.
 */
declare const isEmptyArray: (obj: unknown[]) => boolean;
/**
 * Checks if the given object is empty.
 * @param {unknown} obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
declare const isEmptyObject: (obj: unknown) => unknown;
/**
 * Checks if the given string is empty.
 * @param {unknown} str - The string to check.
 * @returns {boolean} - True if the string is empty, false otherwise.
 */
declare const isEmptyString: (str: unknown) => boolean;
/**
 * Checks if the given object is not empty.
 * @param {unknown} obj - The object to check.
 * @returns {boolean} - True if the object is not empty, false otherwise.
 */
declare const isNonEmptyObject: (obj: unknown) => unknown;
/**
 * Checks if the given array is not empty.
 * @param {unknown} arr - The array to check.
 * @returns {boolean} - True if the array is not empty, false otherwise.
 */
declare const isNonEmptyArray: (arr: unknown) => boolean;
/**
 * Checks if the given string is not empty.
 * @param {unknown} str - The string to check.
 * @returns {boolean} - True if the string is not empty, false otherwise.
 */
declare const isNonEmptyString: (str: unknown) => boolean;
export { getCookie, setCookie, chatSdkError, isArray, isObject, isBoolean, isEmptyArray, isEmptyObject, isEmptyString, isNonEmptyObject, isNonEmptyArray, isNonEmptyString, getFormattedDate, logger };
