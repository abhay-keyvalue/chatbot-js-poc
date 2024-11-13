import { useMemo, useState } from 'preact/hooks';
import './styles.css';

import { API_DOMAIN, DEFAULT_THEME } from '../../constants/generic';

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatBotUIProps {
  theme?: {
    buttonColor?: string;
    chatWindowColor?: string;
    textColor?: string;
  };
  config?: {
    apiKey: string;
    agentType: string;
  };
}

const ChatBotUI = ({ theme = DEFAULT_THEME }: ChatBotUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() && streaming) return;

    const userMessage = { text: input, isBot: false };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInput('');
    await getBotResponse(input);
  };

  const pushErrorMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Error occurred. Please try again.', isBot: true }
    ]);
  };

  const getBotResponse = async (userMessage: string): Promise<void> => {
    const streamUrl = API_DOMAIN;

    try {
      const eventSource = new EventSource(streamUrl);
      let message = '';

      setStreaming(true);
      eventSource.onmessage = (event) => {
        const eventText = event?.data || '' || userMessage;

        if (eventText === '[DONE]') {
          setMessages((prevMessages) => [...prevMessages, { text: message, isBot: true }]);
          setCurrentMessage('');
          eventSource.close();
          setStreaming(false);
        } else if (eventText?.length > 0) {
          message = message + ' ' + eventText;
          setCurrentMessage(message);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setCurrentMessage('');
        setStreaming(false);
        pushErrorMessage();
      };
    } catch (error) {
      pushErrorMessage();
    }
  };

  const updatedMessages = useMemo(() => {
    if (currentMessage?.length > 0) return [...messages, { text: currentMessage, isBot: true }];

    return messages;
  }, [messages, currentMessage]);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  const onChangeInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div>
      <div
        className='chat-button'
        style={{ backgroundColor: theme.buttonColor }}
        onClick={toggleChatWindow}
      >
        <img
          src='https://cdn-icons-png.flaticon.com/128/18221/18221591.png'
          alt='Chat'
          className='chat-icon'
        />
      </div>

      {isOpen && (
        <div className='chat-window' style={{ backgroundColor: theme.chatWindowColor }}>
          <div className='chat-header' style={{ backgroundColor: theme.buttonColor }}>
            <span>ChatBot</span>
            <button onClick={toggleChatWindow}>✕</button>
          </div>

          <div className='chat-messages'>
            {updatedMessages?.map((msg, index) => (
              <div
                key={index}
                className={`chat-message-container ${msg.isBot ? 'chat-message-bot' : 'chat-message-user'}`}
              >
                <div
                  className='chat-message'
                  style={{
                    backgroundColor: msg.isBot ? '#e0e0e0' : theme.buttonColor,
                    color: msg.isBot ? 'black' : theme.textColor
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className='input-container'>
            <input
              type='text'
              value={input}
              onChange={onChangeInput}
              onKeyPress={handleKeyDown}
              className='input-field'
            />
            <button
              onClick={handleSendMessage}
              className='send-button'
              style={{ backgroundColor: theme.buttonColor }}
            >
              <img
                src='https://cdn-icons-png.flaticon.com/128/14025/14025522.png'
                alt='Send'
                className='send-icon'
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotUI;
