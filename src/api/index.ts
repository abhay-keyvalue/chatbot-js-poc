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
