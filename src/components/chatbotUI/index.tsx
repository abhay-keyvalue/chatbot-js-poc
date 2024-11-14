import { marked } from 'marked';
import { useEffect, useRef, useState } from 'preact/hooks';

import { getBotResponse } from '@api';
import { DEFAULT_THEME } from '@constants/generic';
import { useOutsideClickAlerter } from '@hooks/useOutsideClickAlerter';
import type { ChatBotUIProps, Message } from '@types';

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

  useOutsideClickAlerter(chatBotWindowRef, () => setIsOpen(false), chatBotButtonRef);

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

  const onChangeInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const renderChatBubble = (msg: Message, index: number) => (
    <div
      key={index}
      className={`chat-message-container ${msg.isBot ? 'chat-message-bot' : 'chat-message-user'}`}
    >
      <div
        className='chat-message'
        style={{
          backgroundColor: msg.isBot ? '#e0e0e0' : theme.buttonColor,
          color: msg.isBot ? theme.textColor : '#fff'
        }}
      >
        {currentEvent?.length > 0 && index === -1 && (
          <div className='event-title'>{`${currentEvent}...`}</div>
        )}
        {msg.isBot ? (
          <div dangerouslySetInnerHTML={{ __html: marked(msg.text) as string }} />
        ) : (
          msg.text
        )}
      </div>
    </div>
  );

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
        <div className='chat-header'>
          <img
            src='https://cdn-icons-png.flaticon.com/128/18221/18221591.png'
            alt='Bot'
            className='header-image'
            width={30}
            height={30}
          />
          <span>ChatBot</span>
          <div className='close-icon' onClick={toggleChatWindow}>
            X
          </div>
        </div>

        <div className='chat-display' ref={chatContainerRef}>
          {messages?.length == 0 ? (
            <div className='start-conversation'>Start a conversation!</div>
          ) : (
            messages?.map((msg, index) => renderChatBubble(msg, index))
          )}
          {currentMessage?.length > 0 &&
            renderChatBubble({ text: currentMessage, isBot: true }, -1)}
        </div>

        <div className='chat-input-container'>
          <input
            type='text'
            value={input}
            onChange={onChangeInput}
            onKeyPress={handleKeyDown}
            className='input-field'
            placeholder='Message...'
          />
          <button className='send-button' onClick={handleSendMessage}>
            <img
              src='https://cdn-icons-png.flaticon.com/128/14025/14025522.png'
              alt='Send'
              className='send-icon'
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;
