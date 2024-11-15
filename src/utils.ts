import type { GetCookieTypes, SetCookieTypes } from '@types';

const getCookie = ({ cookieName }: GetCookieTypes) => {
  const name = cookieName + '=';
  const cookieData = decodeURIComponent(document.cookie).split(';');

  for (let index = 0; index < cookieData?.length; index++) {
    let cookie = cookieData[index];

    while (cookie.charAt(0) == ' ') cookie = cookie.substring(1);

    if (cookie.indexOf(name) == 0) return cookie.substring(name.length, cookie.length);
  }

  return '';
};

const setCookie = ({ cookieName, cookieValue, expiryInDays }: SetCookieTypes) => {
  const date = new Date();

  date.setTime(date.getTime() + expiryInDays * 24 * 60 * 60 * 1000);
  document.cookie = cookieName + '=' + cookieValue + ';expires=' + date.toUTCString() + ';path=/';
};

export { getCookie, setCookie };
