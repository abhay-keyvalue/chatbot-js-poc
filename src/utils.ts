import dateFormat from 'dateformat';

import type { GetCookieTypes, SetCookieTypes } from '@types';

import { LogLevel } from './constants';

/**
 * Retrieves the value of a cookie by its name.
 * @param {GetCookieTypes} options - The options for retrieving the cookie.
 * @returns {string} The value of the cookie.
 */
const getCookie = ({ cookieName }: GetCookieTypes): string => {
  const name = cookieName + '=';
  const cookieData = decodeURIComponent(document.cookie).split(';');

  for (let index = 0; index < cookieData?.length; index++) {
    let cookie = cookieData[index];

    while (cookie.charAt(0) == ' ') cookie = cookie.substring(1);

    if (cookie.indexOf(name) == 0) return cookie.substring(name.length, cookie.length);
  }

  return '';
};

/**
 * Sets a cookie with the specified name, value, and expiry.
 * @param {SetCookieTypes} options - The options for setting the cookie.
 */
const setCookie = ({ cookieName, cookieValue, expiryInDays }: SetCookieTypes): void => {
  const date = new Date();

  date.setTime(date.getTime() + expiryInDays * 24 * 60 * 60 * 1000);
  document.cookie = cookieName + '=' + cookieValue + ';expires=' + date.toUTCString() + ';path=/';
};

/**
 * Logs a message with the specified log level.
 * @param {LogLevel.INFO | LogLevel.ERROR} level - The log level.
 * @param {string} message - The log message.
 */
const logger = {
  log: async (level: LogLevel.INFO | LogLevel.ERROR, message: string) => {
    const timestamp = new Date().toISOString();
    const levelString = LogLevel[level].toUpperCase();

    const loggerEnabled = localStorage.getItem('loggerEnabled');

    if (loggerEnabled === 'true')
      // eslint-disable-next-line no-console
      console.log(`[${timestamp}] [${levelString}] ${message}`);
  },
  error(error: string) {
    this.log(LogLevel.ERROR, error);
  },
  info(message: string) {
    this.log(LogLevel.INFO, message);
  }
};

/**
 * Formats the timestamp into a readable date string.
 * @param {number} timestamp - The timestamp to format.
 * @returns {string} - The formatted date string.
 */
const getFormattedDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return dateFormat(date, 'dd/MM/yyyy');
};

/**
 * Creates a new Chat SDK error.
 * @param {string} message - The error message.
 * @returns {Error} - The Chat SDK error.
 */
const chatSdkError = (message: string) => new Error(`Chat SDK Error: ${message}`);

/**
 * Checks if the given value is an array.
 * @param {unknown} obj - The value to check.
 * @returns {boolean} - True if the value is an array, false otherwise.
 */
const isArray = (obj: unknown): boolean => Boolean(isObject(obj) && obj instanceof Array);

/**
 * Checks if the given value is an object.
 * @param {unknown} obj - The value to check.
 * @returns {boolean} - True if the value is an object, false otherwise.
 */
const isObject = (obj: unknown): boolean => Boolean(obj && typeof obj === 'object');

/**
 * Checks if the given value is a boolean.
 * @param {unknown} val - The value to check.
 * @returns {boolean} - True if the value is a boolean, false otherwise.
 */
const isBoolean = (val: unknown): boolean => typeof val === 'boolean';

/**
 * Checks if the given array is empty.
 * @param {unknown[]} obj - The array to check.
 * @returns {boolean} - True if the array is empty, false otherwise.
 */
const isEmptyArray = (obj: unknown[]): boolean => Boolean(isArray(obj) && obj.length === 0);

/**
 * Checks if the given object is empty.
 * @param {unknown} obj - The object to check.
 * @returns {boolean} - True if the object is empty, false otherwise.
 */
const isEmptyObject = (obj: unknown) => obj && Object.keys(obj).length === 0;

/**
 * Checks if the given string is empty.
 * @param {unknown} str - The string to check.
 * @returns {boolean} - True if the string is empty, false otherwise.
 */
const isEmptyString = (str: unknown): boolean =>
  Boolean(typeof str === 'string' && str.length === 0);

/**
 * Checks if the given object is not empty.
 * @param {unknown} obj - The object to check.
 * @returns {boolean} - True if the object is not empty, false otherwise.
 */
const isNonEmptyObject = (obj: unknown) => obj && Object.keys(obj).length > 0;

/**
 * Checks if the given array is not empty.
 * @param {unknown} arr - The array to check.
 * @returns {boolean} - True if the array is not empty, false otherwise.
 */
const isNonEmptyArray = (arr: unknown) => Array.isArray(arr) && arr.length > 0;

/**
 * Checks if the given string is not empty.
 * @param {unknown} str - The string to check.
 * @returns {boolean} - True if the string is not empty, false otherwise.
 */
const isNonEmptyString = (str: unknown) => typeof str === 'string' && str?.trim().length > 0;

export {
  getCookie,
  setCookie,
  chatSdkError,
  isArray,
  isObject,
  isBoolean,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isNonEmptyObject,
  isNonEmptyArray,
  isNonEmptyString,
  getFormattedDate,
  logger
};
