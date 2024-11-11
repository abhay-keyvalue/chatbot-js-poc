// src/ChatBot.ts
import { render } from 'preact';
import ChatBotUI from './chatbotUI';

type Theme = {
  buttonColor?: string;
  chatWindowColor?: string;
  textColor?: string;
};

type ChatBotOptions = {
  apiKey: string;
  agentType: string;
  theme?: Theme;
};

export class ChatBot {
  private theme: Theme;
  private apiKey: string;
  private agentType: string;
  constructor({ apiKey, agentType, theme = {} }: ChatBotOptions) {
    this.initUI();
    const defaultTheme = {
      buttonColor: '#25314B',
      chatWindowColor: '#ffffff',
      textColor: '#333'
    };

    this.theme = { ...defaultTheme, ...theme };
    this.apiKey = apiKey;
    this.agentType = agentType;
  }

  private initUI(): void {
    const container = document.createElement('div');

    document.body.appendChild(container);

    // Render the ChatButton component into the container
    render(<ChatBotUI theme={this.theme} onSendMessage={this.getBotResponse} />, container);
  }

  private async getBotResponse(userMessage: string): Promise<string> {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${this.agentType}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({ inputs: userMessage })
        }
      );
      const data = await response.json();

      return data?.[0]?.generated_text || "I'm sorry, I don't understand that.";
    } catch (error) {
      console.error('Error:', error);

      return 'Error occurred. Please try again.';
    }
  }
}

if (window) (window as any).ChatBot = ChatBot;
