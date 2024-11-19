/**
 * This module provides functions for making API calls and getting bot responses.
 */
import 'whatwg-fetch';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { API_DOMAIN, en } from '@constants';

/**
 * Makes an API call to the specified URL with the given method and body.
 * @param url - The URL to make the API call to.
 * @param method - The HTTP method to use for the API call. Default is 'POST'.
 * @param body - The request body for the API call. Default is an empty object.
 * @returns A Promise that resolves to the response data or an error message.
 */
export async function callApi(url: string, method = 'POST', body = {}) {
  try {
    const response = await fetch(`${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    return data || en.error_message_no_response;
  } catch (error) {
    console.error('Error:', error);

    return en.error_message_generic;
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
  onStreamMessage: (event: any) => void,
  onStreamMessageError: (error: any) => void
): Promise<void> => {
  fetchEventSource(`${API_DOMAIN}/sse-endpoint`, {
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
