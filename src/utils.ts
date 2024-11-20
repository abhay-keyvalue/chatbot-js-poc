import type { GetCookieTypes, SetCookieTypes } from '@types';

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

const chatSdkError = (message: string) => new Error(`Chat SDK Error: ${message}`);

const isArray = (obj: any): boolean => Boolean(isObject(obj) && obj instanceof Array);

const isObject = (obj: any): boolean => Boolean(obj && typeof obj === 'object');

const isBoolean = (val: any): boolean => typeof val === 'boolean';

const isEmptyArray = (obj: any): boolean => Boolean(isArray(obj) && obj.length === 0);

const isEmptyObject = (obj: any) => obj && Object.keys(obj).length === 0;

const isEmptyString = (str: any): boolean => Boolean(typeof str === 'string' && str.length === 0);

const isNonEmptyObject = (obj: any) => obj && Object.keys(obj).length > 0;

const isNonEmptyArray = (arr: any) => Array.isArray(arr) && arr.length > 0;

const isNonEmptyString = (str: any) => typeof str === 'string' && str?.trim().length > 0;

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
  isNonEmptyString
};
