/**
 * This module provides functions for making API calls and getting bot responses.
 */
import 'whatwg-fetch';
import { HttpMethodOptions } from '@constants';
import type { MessageData } from '@types';
/**
 * Makes an API call to the specified URL with the given method and body.
 * @param url - The URL to make the API call to.
 * @param method - The HTTP method to use for the API call. Default is 'POST'.
 * @param body - The request body for the API call. Default is an empty object.
 * @param retries - The number of retries.
 * @param delay - Delay between retries in milliseconds.
 * @returns A Promise that resolves to the response data or an error message.
 */
export declare function callApi(url: string, method?: HttpMethodOptions, body?: {}, retries?: number, delay?: number): Promise<any>;
/**
 * Gets the bot response for the given user message by establishing a server-sent event (SSE) connection.
 * @param userMessage - The user message to send to the bot.
 * @param onStreamMessage - A callback function to handle incoming SSE messages.
 * @param onStreamMessageError - A callback function to handle SSE connection errors.
 * @returns A Promise that resolves when the SSE connection is established.
 */
export declare const getBotResponse: (userMessage: string, onStreamMessage: (event: MessageData) => void, onStreamMessageError: (error: string) => void) => Promise<void>;
