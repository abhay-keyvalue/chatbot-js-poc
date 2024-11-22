/**
 * This module provides functions for making API calls and getting bot responses.
 */
import 'whatwg-fetch';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { en, ErrorMap, ErrorTypes, HttpMethodOptions } from '@constants';
import type { MessageData } from '@types';
import { isEmptyObject } from '@utils';

/**
 * Makes an API call to the specified URL with the given method and body.
 * @param url - The URL to make the API call to.
 * @param method - The HTTP method to use for the API call. Default is 'POST'.
 * @param body - The request body for the API call. Default is an empty object.
 * @param retries - The number of retries.
 * @param delay - Delay between retries in milliseconds.
 * @returns A Promise that resolves to the response data or an error message.
 */
export async function callApi(
  url: string,
  method = HttpMethodOptions.GET,
  body = {},
  retries = 3,
  delay = 1000
): Promise<any> {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  for (let attempt = 0; attempt <= retries; attempt++)
    try {
      const response = await fetch(`${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        ...(!isEmptyObject(body) && { body: JSON.stringify(body) })
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      return data || en.error_message_no_response;
    } catch (error) {
      console.warn(
        `Attempt ${attempt + 1} failed. Error:`,
        ErrorMap[ErrorTypes.NETWORK_ERROR]?.message,
        error
      );

      if (attempt < retries)
        sleep(delay); // Wait before retrying
      else return en.error_message_generic; // Return generic error after max retries
    }
}

/**
 * Gets the bot response for the given user message by establishing a server-sent event (SSE) connection.
 * @param userMessage - The user message to send to the bot.
 * @param onStreamMessage - A callback function to handle incoming SSE messages.
 * @param onStreamMessageError - A callback function to handle SSE connection errors.
 * @returns A Promise that resolves when the SSE connection is established.
 */
export const getBotResponse = async (
  userMessage: string,
  apiUrl: string,
  onStreamMessage: (event: MessageData) => void,
  onStreamMessageError: (error: string) => void
): Promise<void> => {
  await fetchEventSource(apiUrl, {
    onmessage(event) {
      onStreamMessage(event);
    },
    onerror(err) {
      if (err) {
        onStreamMessageError(err);
        throw err;
      }
    }
  });
};
