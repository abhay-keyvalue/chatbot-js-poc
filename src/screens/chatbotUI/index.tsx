import { useEffect, useRef, useState } from 'preact/hooks';

import { callApi, getBotResponse } from '@api';
import { ChatBubble, ChatHeader, ChatInput } from '@components';
import { API_DOMAIN, COOKIE_EXPIRATION_TIME_IN_DAYS, DEFAULT_THEME } from '@constants/generic';
import { useOutsideClickAlerter } from '@hooks/useOutsideClickAlerter';
import type { ChatBotUIProps, Message } from '@types';
import { getCookie, setCookie } from '@utils';

import './styles.css';

let newMessage = '';

const ChatBotUI = ({ theme = DEFAULT_THEME }: ChatBotUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentEvent, setCurrentEvent] = useState('');
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatBotWindowRef = useRef<HTMLDivElement>(null);
  const chatBotButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage]);

  useEffect(() => {
    //cookie expiry resets everytime user opens site
    startConversations(getCookie({ cookieName: 'conversationId' }));
  }, []);

  useOutsideClickAlerter(chatBotWindowRef, () => setIsOpen(false), chatBotButtonRef);

  const startConversations = async (conversationId: string | null) => {
    if (conversationId) {
      const response = await callApi(`${API_DOMAIN}/conversation/1212`, 'PATCH');

      setCookie({
        cookieName: 'conversationId',
        cookieValue: conversationId,
        expiryInDays: COOKIE_EXPIRATION_TIME_IN_DAYS
      });
      setMessages((prevMessages) => [...prevMessages, { text: response?.message, isBot: true }]);
    } else {
      const response = await callApi(`${API_DOMAIN}/conversation`);

      setCookie({
        cookieName: 'conversationId',
        cookieValue: response?.conversationId,
        expiryInDays: COOKIE_EXPIRATION_TIME_IN_DAYS
      });
      setMessages((prevMessages) => [...prevMessages, { text: response?.message, isBot: true }]);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const handleSendMessage = async () => {
    if (input.trim()?.length > 0 && !streaming) {
      const userMessage = { text: input, isBot: false };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setStreaming(true);
      await getBotResponse(input, onStreamMessage, onStreamMessageError);
    }
  };

  const onStreamMessage = (messageData: { data: string; event: string }) => {
    const eventText = messageData?.data || '';
    const event = messageData?.event || '';

    if (event.length > 0) setCurrentEvent(event);

    if (event === 'end') {
      setMessages((prevMessages) => [...prevMessages, { text: newMessage, isBot: true }]);
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
        console.log('error in parse', error);
      }
    }
  };

  const onStreamMessageError = () => {
    setCurrentMessage('');
    setStreaming(false);
    pushErrorMessage();
  };

  const pushErrorMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Error occurred. Please try again.', isBot: true }
    ]);
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className='chatbot-button'
        style={{ backgroundColor: theme.buttonColor }}
        onClick={toggleChatWindow}
        ref={chatBotButtonRef}
      >
        <img
          src='https://cdn-icons-png.flaticon.com/128/18221/18221591.png'
          alt='Chat'
          className='chat-circle-icon'
        />
      </div>
      <div className={`chat-window ${isOpen && 'open'}`} ref={chatBotWindowRef}>
        <ChatHeader toggleChatWindow={toggleChatWindow} />
        <div
          className='chat-display'
          style={{ ...(streaming && { overflow: 'hidden' }) }}
          ref={chatContainerRef}
        >
          {messages?.length == 0 ? (
            <div className='start-conversation'>Start a conversation!</div>
          ) : (
            messages?.map((msg, index) => (
              <ChatBubble message={msg} index={index} theme={theme} event={currentEvent} />
            ))
          )}
          {currentMessage?.length > 0 && (
            <ChatBubble
              message={{ text: currentMessage, isBot: true }}
              index={-1}
              theme={theme}
              event={currentEvent}
            />
          )}
        </div>
        <ChatInput
          handleSendMessage={handleSendMessage}
          input={input}
          setInput={(val: string) => setInput(val)}
          isDisabled={streaming}
        />
      </div>
    </div>
  );
};

export default ChatBotUI;
