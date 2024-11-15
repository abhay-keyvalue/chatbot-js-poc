import { render } from 'preact';

import { ChatBotUI } from '@components';
import { DEFAULT_THEME } from '@constants/generic';
import type { ChatBotOptions, Theme } from '@types';

export class ChatBot {
  private theme: Theme;
  private apiKey: string;
  private agentType: string;

  constructor({ apiKey, agentType, theme = {} }: ChatBotOptions) {
    this.initUI();
    const defaultTheme = DEFAULT_THEME;

    this.theme = { ...defaultTheme, ...theme };
    this.apiKey = apiKey;
    this.agentType = agentType;
  }

  private initUI(): void {
    const container = document.createElement('div');

    document.body.appendChild(container);

    render(
      <ChatBotUI theme={this.theme} config={{ apiKey: this.apiKey, agentType: this.agentType }} />,
      container
    );
  }
}

interface Window {
  ChatBot?: typeof ChatBot;
}

if (window) (window as Window).ChatBot = ChatBot;
