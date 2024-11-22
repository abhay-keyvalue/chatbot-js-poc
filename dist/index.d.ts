/**
 * @file This file entry p[oint of sdf contains the implementation of the ChatBot class and its dependencies.
 */
import type { ChatBotOptions } from '@types';
/**
 * Represents a ChatBot instance.
 */
export declare class ChatBot {
    private settingsConfig?;
    private apiKey;
    private agentType;
    private backendBaseUrl;
    /**
     * Creates a new instance of ChatBot.
     * @param options - The options for configuring the ChatBot instance.
     */
    constructor(props: ChatBotOptions);
    /**
     * Sets the logger flag based on the provided value.
     * @param isEnabled - The flag to enable or disable logging.
     */
    private setLoggerFlag;
    /**
     * Initializes the user interface for the ChatBot.
     * Creates a container element and renders the ChatBotUI component inside it.
     */
    private initUI;
}
