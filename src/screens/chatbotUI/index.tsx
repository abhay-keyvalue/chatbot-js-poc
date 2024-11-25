import { marked } from 'marked';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

import { getBotResponse } from '../../api';
import { ChatBubble, ChatHeader, ChatInput } from '../../components';
import {
  AccessibilityKeys,
  DEFAULT_THEME,
  en,
  ErrorMap,
  ErrorTypes,
  logMessages,
  MessageTypes
} from '../../constants';
import { useOutsideClickAlerter } from '../../hooks';
import type { ChatBotUIProps, Message, MessageData } from '../../types';
import { getFormattedDate, isNonEmptyString, logger } from '../../utils';

import './styles.css';

/**
 * Represents the ChatBotUI component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} [props.settings] - Contains Tenant settings.
 * @param {Object} [props.config] - Contains apiKey and agentType.
 * @param {String} [props.backendBaseUrl] - The backend base URL.
 * @param {Object} [props.chat] - Contains chatId and history.
 * @returns {JSX.Element} The rendered ChatBotUI component.
 */
const ChatBotUI = (props: ChatBotUIProps): JSX.Element => {
  const { settings, chat, backendBaseUrl } = props;
  const settingsTheme = settings?.theme || {};
  const botTheme = { ...DEFAULT_THEME, ...settingsTheme };
  const styles = {
    button: {
      backgroundColor: botTheme.primaryColor,
      bottom: settings?.position?.bottom,
      right: settings?.position?.right
    },
    display: { backgroundColor: botTheme.chatWindowColor },
    window: { backgroundColor: botTheme.chatWindowColor }
  };

  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(chat?.history || []);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentEvent, setCurrentEvent] = useState('');
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  let newMessage = '';
  let currentTableData = {};
  let previousSSEEvent = '';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAccessibility = (event: any) => {
    if (event.key === AccessibilityKeys.closeChatBot && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    } else if (
      event.altKey &&
      event.key.toLowerCase() === AccessibilityKeys.openChatBot &&
      !isOpen
    ) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  document.addEventListener('keyup', handleAccessibility);

  const closeChatWindow = (): void => {
    if (isOpen) {
      logger.info(`${logMessages.togglingChatWindow} closed`);
      setIsOpen(false);
    }
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
      await getBotResponse(
        input,
        `${isNonEmptyString(backendBaseUrl) ? backendBaseUrl : import.meta.env.VITE_APP_SDK_BASE_URL}/api/v1/conversations/start?chatIntent=init`,
        onStreamMessage,
        onStreamMessageError
      );
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
      const userMessage = { text: input, type: MessageTypes.USER, timestamp: new Date().getTime() };

      logger.info(`${logMessages.sendMessageToBot} ${input}`);

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setStreaming(true);
      await getBotResponse(
        input,
        `${isNonEmptyString(backendBaseUrl) ? backendBaseUrl : import.meta.env.VITE_APP_SDK_BASE_URL}/api/v1/conversations/start`,
        onStreamMessage,
        onStreamMessageError
      );
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

    if (event) previousSSEEvent = event;
    const isComplete = previousSSEEvent === '[end]';
    const isInit = previousSSEEvent === '[init]';
    const isDelta = previousSSEEvent === '[delta]';
    const newMessageData = {
      text: newMessage,
      type: MessageTypes.BOT,
      timestamp: new Date().getTime(),
      data: currentTableData
    };

    if (event.length > 0) setCurrentEvent(event);

    if (isComplete) {
      logger.info(`${logMessages.receivedMessageFromBot} ${newMessageData?.text}`);
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      newMessage = '';
      currentTableData = {};
      setCurrentMessage('');
      setStreaming(false);
    } else if (eventText?.length > 0 && !event) {
      try {
        if (isInit) {
          newMessage = eventText;
          setCurrentMessage(newMessage);
        } else if (isDelta) {
          const deltaData = JSON.parse(eventText);

          newMessage += marked(deltaData?.text);
          setCurrentMessage(newMessage);
        }
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
    const errorMessageData = {
      text: en.error_message_generic,
      type: MessageTypes.BOT,
      timestamp: new Date().getTime()
    };

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
        style={styles.button}
        onClick={toggleChatWindow}
        ref={chatBotButtonRef}
      >
        <img src={settings?.botIcon} alt='Chat' className='chat-circle-icon' />
      </div>
    ),
    [isOpen]
  );

  /**
   * Renders the current message as a ChatBubble component.
   *
   * @returns The rendered ChatBubble component or null if the current message is empty.
   */
  const renderCurrentMessage = useMemo(() => {
    if (currentMessage?.length === 0) return null;

    const currentMessageData = {
      text: currentMessage,
      type: MessageTypes.BOT,
      timestamp: new Date().getTime()
    };

    return (
      <ChatBubble
        message={currentMessageData}
        index={-1}
        theme={botTheme}
        event={currentEvent}
        botIcon={settings?.botIcon}
      />
    );
  }, [currentMessage]);

  /**
   * Groups messages by date and inserts date messages.
   * @param {Message[]} messages - The array of messages to group.
   * @returns {Message[]} - The grouped messages with date separators.
   */
  const groupMessagesByDate = (messages: Message[]): Message[] => {
    const groupedMessages: Message[] = [];
    let lastDate = '';

    messages.forEach((msg) => {
      const msgDate = getFormattedDate(msg.timestamp);

      if (msgDate !== lastDate) {
        groupedMessages.push({
          text: msgDate,
          type: MessageTypes.DATE,
          timestamp: msg.timestamp
        });
        lastDate = msgDate;
      }
      groupedMessages.push(msg);
    });

    return groupedMessages;
  };

  /**
   * Renders the previous messages in the chatbot UI.
   *
   * @returns JSX.Element | null - The rendered previous messages or a start conversation message if there are no messages.
   */
  const renderPreviousMessages = useMemo(() => {
    if (messages?.length === 0 && !currentMessage)
      return <div className='start-conversation'>{en.empty_screen_message}</div>;

    const groupedMessages = groupMessagesByDate(messages);

    return groupedMessages?.map((msg, index) => (
      <ChatBubble
        message={msg}
        index={index}
        theme={botTheme}
        event={currentEvent}
        botIcon={settings?.botIcon}
      />
    ));
  }, [messages, currentMessage]);

  return (
    <div>
      {renderChatBotIcon}
      <div
        className={`chat-window ${isOpen && 'open'}`}
        ref={chatBotWindowRef}
        style={styles.window}
        data-testid='chat-window'
      >
        <ChatHeader
          toggleChatWindow={toggleChatWindow}
          botIcon={settings?.botIcon}
          theme={botTheme}
          closeIcon={settings?.closeIcon}
          chatTitle={settings?.chatTitle}
        />
        <div className='chat-display' ref={chatContainerRef} style={styles.display}>
          {renderPreviousMessages}
          {renderCurrentMessage}
        </div>
        <ChatInput
          handleSendMessage={handleSendMessage}
          input={input}
          setInput={setInput}
          isDisabled={streaming}
          placeholder={settings?.chatPlaceholder}
          sendIcon={settings?.sendIcon}
          theme={botTheme}
        />
      </div>
    </div>
  );
};

export default ChatBotUI;
