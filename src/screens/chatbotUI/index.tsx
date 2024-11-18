import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

import { callApi, getBotResponse } from '@api';
import { ChatBubble, ChatHeader, ChatInput } from '@components';
import {
  API_DOMAIN,
  CHATBOT_ICON_URL,
  COOKIE_EXPIRATION_TIME_IN_DAYS,
  DEFAULT_THEME,
  en
} from '@constants';
import { useOutsideClickAlerter } from '@hooks/useOutsideClickAlerter';
import type { ChatBotUIProps, Message, MessageData } from '@types';
import { getCookie, setCookie } from '@utils';

import './styles.css';

let newMessage = '';

/**
 * Represents the ChatBotUI component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.theme=DEFAULT_THEME] - The theme for the chatbot UI.
 * @returns {JSX.Element} The rendered ChatBotUI component.
 */
const ChatBotUI = (props: ChatBotUIProps): JSX.Element => {
  const { theme = DEFAULT_THEME } = props;

  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentEvent, setCurrentEvent] = useState('');
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBotWindowRef = useRef<HTMLDivElement>(null);
  const chatBotButtonRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage]);

  useEffect(() => {
    startConversations(getCookie({ cookieName: 'conversationId' }));
  }, []);

  useOutsideClickAlerter(chatBotWindowRef, () => setIsOpen(false), chatBotButtonRef);

  /**
   * Starts a conversation with the chatbot.
   * If a conversationId is provided, it sends a PATCH request to update the conversation.
   * If no conversationId is provided, it sends a POST request to create a new conversation.
   *
   * @param {string | null} conversationId - The ID of the conversation (optional).
   * @returns {Promise<void>} A promise that resolves when the conversation is started.
   */
  const startConversations = async (conversationId?: string | null): Promise<void> => {
    if (conversationId) {
      // Send PATCH request to update the conversation
      const response = await callApi(`${API_DOMAIN}/conversation/1212`, 'PATCH');
      const responseMessageData = { text: response?.message, isBot: true };

      setCookie({
        cookieName: 'conversationId',
        cookieValue: conversationId,
        expiryInDays: COOKIE_EXPIRATION_TIME_IN_DAYS
      });
      setMessages((prevMessages) => [...prevMessages, responseMessageData]);
    } else {
      // Send POST request to create a new conversation
      const response = await callApi(`${API_DOMAIN}/conversation`);
      const responseMessageData = { text: response?.message, isBot: true };

      setCookie({
        cookieName: 'conversationId',
        cookieValue: response?.conversationId,
        expiryInDays: COOKIE_EXPIRATION_TIME_IN_DAYS
      });
      setMessages((prevMessages) => [...prevMessages, responseMessageData]);
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
    const newMessageData = { text: eventText, isBot: true };

    if (event.length > 0) setCurrentEvent(event);

    if (event === 'end') {
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      newMessage = '';
      setCurrentMessage('');
      setStreaming(false);
    } else if (eventText?.length > 0) {
      try {
        const botText = JSON.parse(eventText);

        if (botText.type === 'markdown' && botText.text) {
          newMessage = newMessage + botText.text;
          setCurrentMessage(newMessage);
        }
      } catch (error) {
        console.error('ERROR', error);
      }
    }
  };

  /**
   * Handles the error that occurs when streaming a message.
   * Resets the current message, sets streaming to false, and pushes an error message.
   */
  const onStreamMessageError = (): void => {
    setCurrentMessage('');
    setStreaming(false);
    pushErrorMessage();
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
    setIsOpen(!isOpen);
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
        style={{ backgroundColor: theme.buttonColor }}
        onClick={toggleChatWindow}
        ref={chatBotButtonRef}
      >
        <img src={CHATBOT_ICON_URL} alt='Chat' className='chat-circle-icon' />
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
      <ChatBubble message={currentMessageData} index={-1} theme={theme} event={currentEvent} />
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
      <ChatBubble message={msg} index={index} theme={theme} event={currentEvent} />
    ));
  }, [messages]);

  return (
    <div>
      {renderChatBotIcon}
      <div className={`chat-window ${isOpen && 'open'}`} ref={chatBotWindowRef}>
        <ChatHeader toggleChatWindow={toggleChatWindow} />
        <div className='chat-display' ref={chatContainerRef}>
          {renderPreviousMessages}
          {renderCurrentMessage}
        </div>
        <ChatInput
          handleSendMessage={handleSendMessage}
          input={input}
          setInput={setInput}
          isDisabled={streaming}
        />
      </div>
    </div>
  );
};

export default ChatBotUI;
