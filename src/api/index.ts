import { fetchEventSource } from '@microsoft/fetch-event-source';

import { API_DOMAIN } from '@constants/generic';

type Options = {
  apiKey?: string;
  userMessage?: string;
  agentType?: string;
};

export async function callApi(url: string, method = 'POST', options: Options = {}) {
  const { apiKey, userMessage, agentType } = options;

  try {
    const response = await fetch(`${url}/${agentType}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({ inputs: userMessage })
    });
    const data = await response.json();

    return data?.[0]?.generated_text || "I'm sorry, I don't understand that.";
  } catch (error) {
    console.error('Error:', error);

    return 'Error occurred. Please try again.';
  }
}

export const getBotResponse = async (
  userMessage: string,
  onStreamMessage: (event: any) => void,
  onStreamMessageError: () => void
): Promise<void> => {
  fetchEventSource(API_DOMAIN, {
    // async onopen(response) {
    //   if (response.ok)
    //    everything's good
    //   else if (response.status >= 400 && response.status < 500 && response.status !== 429)
    //    client-side errors are usually non-retriable:
    //   else
    //    RetriableError
    // },
    onmessage(event) {
      // if the server emits an error message, throw an exception
      // so it gets handled by the onerror callback below:
      onStreamMessage(event);
    },
    onclose() {
      // if the server closes the connection unexpectedly, retry:
      // throw new RetriableError();
    },
    onerror(err) {
      if (err) {
        onStreamMessageError();
        throw err;
        // rethrow to stop the operation
      } else {
        // do nothing to automatically retry. You can also
        // return a specific retry interval here.
      }
    }
  });
};
