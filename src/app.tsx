/**
 * @file This file entry point of sdk contains the implementation of the ChatBot class and its dependencies.
 */

import { render } from 'preact';

import { callApi } from './api';
import { DEFAULT_SETTINGS, HttpMethodOptions, logMessages } from './constants';
import ChatBotUI from './screens/chatbotUI';
import type { ChatBotOptions, Settings } from './types';
import { isNonEmptyObject, isNonEmptyString, logger } from './utils';

/**
 * Represents a ChatBot instance.
 */
export class ChatBot {
  private settingsConfig?: Settings;
  private apiKey: string;
  private agentType: string;
  private backendBaseUrl: string;

  /**
   * Creates a new instance of ChatBot.
   * @param options - The options for configuring the ChatBot instance.
   */
  constructor(props: ChatBotOptions) {
    const { apiKey, agentType, settings = {}, backendBaseUrl = '' } = props;

    this.settingsConfig = settings;
    this.apiKey = apiKey;
    this.agentType = agentType;
    this.backendBaseUrl = backendBaseUrl;

    this.setLoggerFlag(settings?.logEnabled);
    this.initUI();
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
        `${isNonEmptyString(this.backendBaseUrl) ? this.backendBaseUrl : import.meta.env.VITE_APP_SDK_BASE_URL}/api/v1/tenants/test_api_key/initialize`,
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

        const mergedSettings = {
          ...DEFAULT_SETTINGS,
          ...(isNonEmptyObject(configData?.tenant?.settings) && configData?.tenant?.settings),
          ...this.settingsConfig
        };

        render(
          <ChatBotUI
            config={chatBotConfig}
            settings={mergedSettings}
            chat={configData?.chat}
            backendBaseUrl={this.backendBaseUrl}
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
