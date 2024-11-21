/**
 * @file This file entry p[oint of sdf contains the implementation of the ChatBot class and its dependencies.
 */

import { render } from 'preact';

import { callApi } from '@api';
import { HttpMethodOptions, logMessages } from '@constants';
import ChatBotUI from '@screens/chatbotUI';
import type { ChatBotOptions, Theme } from '@types';
import { logger } from '@utils';

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
    const { apiKey, agentType, theme = {}, settings } = props;

    this.initUI();
    this.setLoggerFlag(settings?.logEnabled);

    this.theme = theme;
    this.apiKey = apiKey;
    this.agentType = agentType;
  }

  /**
   * Sets the logger flag based on the provided value.
   * @param isEnabled - The flag to enable or disable logging.
   */
  private setLoggerFlag(isEnabled?: boolean): void {
    if (isEnabled) localStorage.setItem('loggerEnabled', 'true');
    else localStorage.removeItem('loggerEnabled');
  }

  /**
   * Initializes the user interface for the ChatBot.
   * Creates a container element and renders the ChatBotUI component inside it.
   */
  private async initUI(): Promise<void> {
    try {
      const response = await callApi(
        `${process.env.SDK_BASE_URL}/api/v1/tenants/test_api_key/initialize`,
        HttpMethodOptions.POST
      );

      if (!response) throw new Error('Failed to fetch configuration data');

      const configData = await response?.data;

      // To be provided to the ChatBotUI component for branding
      if (configData?.tenant) {
        logger.info(logMessages.initializeChatBotUI);

        // To be removed
        const chatBotConfig = {
          apiKey: this.apiKey || configData?.apiKey,
          agentType: this.agentType
        };

        const container = document.createElement('div');

        document.body.appendChild(container);

        render(
          <ChatBotUI
            config={chatBotConfig}
            settings={configData?.tenant?.settings}
            theme={this.theme}
            chat={configData?.chat}
          />,
          container
        );
      }
    } catch (error) {
      console.error('Error initializing ChatBot: ', error);
    }
  }
}

interface Window {
  ChatBot?: typeof ChatBot;
}

if (window) (window as Window).ChatBot = ChatBot;
