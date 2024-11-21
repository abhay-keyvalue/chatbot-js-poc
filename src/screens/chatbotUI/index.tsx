import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

import { callApi, getBotResponse } from '@api';
import { ChatBubble, ChatHeader, ChatInput } from '@components';
import {
  DEFAULT_THEME,
  en,
  ErrorMap,
  ErrorTypes,
  HttpMethodOptions,
  logMessages
} from '@constants';
import { useOutsideClickAlerter } from '@hooks/useOutsideClickAlerter';
import type { ChatBotUIProps, Message, MessageData } from '@types';
import { logger } from '@utils';

import './styles.css';

/**
 * Represents the ChatBotUI component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} [props.settings] - Contains Tenant settings.
 * @param {Object} [props.config] - Contains apiKey and agentType.
 * @param {Object} [props.theme] - The theme for the chatbot UI mentioned in chatBot initialization.
 * @param {Object} [props.chat] - Contains chatId and history.
 * @returns {JSX.Element} The rendered ChatBotUI component.
 */
const ChatBotUI = (props: ChatBotUIProps): JSX.Element => {
  const { settings, theme, chat } = props;
  const settingsTheme = settings?.theme || {};
  const botTheme = { ...DEFAULT_THEME, ...settingsTheme, ...theme };

  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(chat?.history || []);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentEvent, setCurrentEvent] = useState('');
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  let newMessage = '';
  let currentTableData = {};

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBotWindowRef = useRef<HTMLDivElement>(null);
  const chatBotButtonRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage]);

  useEffect(() => {
    startConversations();
  }, []);

  const closeChatWindow = (): void => {
    logger.info(`${logMessages.togglingChatWindow} closed`);
    setIsOpen(false);
  };

  useOutsideClickAlerter(chatBotWindowRef, closeChatWindow, chatBotButtonRef);

  /**
   * Starts a conversation with the chatbot.
   * If no conversationId is provided, it sends a POST request to create a new conversation.
   *
   * @returns {Promise<void>} A promise that resolves when the conversation is started.
   */
  const startConversations = async (): Promise<void> => {
    try {
      // Send PATCH request to update the conversation
      const response = await callApi(
        `${process.env.SDK_BASE_URL}/conversation`,
        HttpMethodOptions.GET
      );

      if (response?.message?.length > 0 && response?.statusCode === 200) {
        logger.info(logMessages.startingConversation);
        const responseMessageData = { text: response?.message, isBot: true };

        setMessages((prevMessages) => [...prevMessages, responseMessageData]);
      }
    } catch {
      logger.error(logMessages.errorStartingConversation);
    }
  };

  /**
   * Scrolls the chat container to the bottom.
   */
  const scrollToBottom = (): void => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  /**
   * Handles sending a message to the chatbot.
   * If the input is not empty and streaming is not in progress,
   * it adds the user's message to the messages state,
   * clears the input, sets streaming to true, and calls the getBotResponse function.
   *
   * @returns {Promise<void>} A promise that resolves when the message is sent.
   */
  const handleSendMessage = async (): Promise<void> => {
    if (input.trim()?.length > 0 && !streaming) {
      const userMessage = { text: input, isBot: false };

      logger.info(`${logMessages.sendMessageToBot} ${input}`);

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setStreaming(true);
      await getBotResponse(input, onStreamMessage, onStreamMessageError);
    }
  };

  /**
   * Handles the stream message received from the chatbot.
   *
   * @param {MessageData} messageData - The message data object containing the message data and event type.
   */
  const onStreamMessage = (messageData: MessageData): void => {
    const eventText = messageData?.data || '';
    const event = messageData?.event || '';
    const isComplete = event === 'end';
    const newMessageData = { text: newMessage, isBot: true, data: currentTableData };

    if (event.length > 0) setCurrentEvent(event);

    if (isComplete) {
      logger.info(`${logMessages.receivedMessageFromBot} ${newMessageData?.text}`);

      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      newMessage = '';
      currentTableData = {};
      setCurrentMessage('');
      setStreaming(false);
    } else if (eventText?.length > 0) {
      try {
        const botText = JSON.parse(eventText);

        if (botText?.type === 'markdown' && botText?.text) {
          newMessage = newMessage + botText?.text;
          setCurrentMessage(newMessage);
        }
        if (botText.type === 'table' && botText.data) currentTableData = botText.data;
      } catch (error) {
        console.warn(ErrorMap[ErrorTypes.ERROR_IN_PARSING]?.message, error);
      }
    }
  };

  /**
   * Handles the error that occurs when streaming a message.
   * Resets the current message, sets streaming to false, and pushes an error message.
   */
  const onStreamMessageError = (err: string): void => {
    setCurrentMessage('');
    setStreaming(false);
    pushErrorMessage();
    console.warn(ErrorMap[ErrorTypes.ERROR]?.message, err);
  };

  /**
   * Pushes an error message to the messages state.
   */
  const pushErrorMessage = (): void => {
    const errorMessageData = { text: en.error_message_generic, isBot: true };

    setMessages((prevMessages) => [...prevMessages, errorMessageData]);
  };

  /**
   * Toggles the chat window open or closed.
   */
  const toggleChatWindow = (): void => {
    logger.info(`${logMessages.togglingChatWindow}  ${!isOpen ? 'open' : 'closed'}`);
    setIsOpen((prev) => !prev);
  };

  /**
   * Renders the chatbot icon. The icon is a button that toggles the chat window.
   *
   * @returns The JSX element representing the chatbot icon.
   */
  const renderChatBotIcon = useMemo(
    () => (
      <div
        className='chatbot-button'
        style={{ backgroundColor: botTheme.primaryColor }}
        onClick={toggleChatWindow}
        ref={chatBotButtonRef}
      >
        <img src={settings?.botIcon} alt='Chat' className='chat-circle-icon' />
      </div>
    ),
    []
  );

  /**
   * Renders the current message as a ChatBubble component.
   *
   * @returns The rendered ChatBubble component or null if the current message is empty.
   */
  const renderCurrentMessage = useMemo(() => {
    if (currentMessage?.length === 0) return null;

    const currentMessageData = { text: currentMessage, isBot: true };

    return (
      <ChatBubble message={currentMessageData} index={-1} theme={botTheme} event={currentEvent} />
    );
  }, [currentMessage]);

  /**
   * Renders the previous messages in the chatbot UI.
   *
   * @returns JSX.Element | null - The rendered previous messages or a start conversation message if there are no messages.
   */
  const renderPreviousMessages = useMemo(() => {
    if (messages?.length === 0)
      return <div className='start-conversation'>{en.empty_screen_message}</div>;

    return messages?.map((msg, index) => (
      <ChatBubble message={msg} index={index} theme={botTheme} event={currentEvent} />
    ));
  }, [messages]);

  return (
    <div>
      {renderChatBotIcon}
      <div className={`chat-window ${isOpen && 'open'}`} ref={chatBotWindowRef}>
        <ChatHeader
          toggleChatWindow={toggleChatWindow}
          botIcon={settings?.botIcon}
          theme={botTheme}
          closeIcon={settings?.closeIcon}
        />
        <div className='chat-display' ref={chatContainerRef}>
          {renderPreviousMessages}
          {renderCurrentMessage}
        </div>
        <ChatInput
          handleSendMessage={handleSendMessage}
          input={input}
          setInput={setInput}
          isDisabled={streaming}
          sendIcon={settings?.sendIcon}
        />
      </div>
    </div>
  );
};

export default ChatBotUI;
