/**
 * @file This file entry p[oint of sdf contains the implementation of the ChatBot class and its dependencies.
 */

import { render } from 'preact';

import { callApi } from '@api';
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

    this.theme = theme;
    this.apiKey = apiKey;
    this.agentType = agentType;
  }

  /**
   * Initializes the user interface for the ChatBot.
   * Creates a container element and renders the ChatBotUI component inside it.
   */
  private async initUI(): Promise<void> {
    try {
      const response = await callApi(
        `http://192.168.4.202:3005/api/v1/tenants/api-Key/test_api_key`,
        'GET'
      );

      if (!response) throw new Error('Failed to fetch configuration data');

      const configData = await response?.data;

      // To be provided to the ChatBotUI component for branding
      if (configData) {
        // To be removed
        const chatBotConfig = {
          apiKey: this.apiKey || configData?.apiKey,
          agentType: this.agentType
        };

        const container = document.createElement('div');

        document.body.appendChild(container);

        render(
          <ChatBotUI config={chatBotConfig} settings={configData?.settings} theme={this.theme} />,
          container
        );
      }
    } catch (error) {
      console.error('Error initializing ChatBot UI:', error);
    }
  }
}

interface Window {
  ChatBot?: typeof ChatBot;
}

if (window) (window as Window).ChatBot = ChatBot;
