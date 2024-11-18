/**
 * @file This file entry p[oint of sdf contains the implementation of the ChatBot class and its dependencies.
 */

import { render } from 'preact';

import { DEFAULT_THEME } from '@constants';
import ChatBotUI from '@screens/chatbotUI';
import type { ChatBotOptions, Theme } from '@types';

/**
 * Represents a ChatBot instance.
 */
export class ChatBot {
  private theme: Theme;
  private apiKey: string;
  private agentType: string;

  /**
   * Creates a new instance of ChatBot.
   * @param options - The options for configuring the ChatBot instance.
   */
  constructor(props: ChatBotOptions) {
    const { apiKey, agentType, theme = {} } = props;

    this.initUI();
    const defaultTheme = DEFAULT_THEME;

    this.theme = { ...defaultTheme, ...theme };
    this.apiKey = apiKey;
    this.agentType = agentType;
  }

  /**
   * Initializes the user interface for the ChatBot.
   * Creates a container element and renders the ChatBotUI component inside it.
   */
  private initUI(): void {
    const container = document.createElement('div');

    document.body.appendChild(container);

    const chatBotConfig = { apiKey: this.apiKey, agentType: this.agentType };

    render(<ChatBotUI theme={this.theme} config={chatBotConfig} />, container);
  }
}

interface Window {
  ChatBot?: typeof ChatBot;
}

if (window) (window as Window).ChatBot = ChatBot;
