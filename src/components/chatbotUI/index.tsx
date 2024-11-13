import { useMemo, useState } from 'preact/hooks';
import './styles.css';

import { getBotResponse } from '../../api';
import { DEFAULT_THEME } from '../../constants/generic';
import type { ChatBotUIProps, Message } from '../../types';

let newMessage = '';

const ChatBotUI = ({ theme = DEFAULT_THEME }: ChatBotUIProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()?.length > 0 && streaming) return;

    const userMessage = { text: input, isBot: false };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setStreaming(true);
    await getBotResponse(input, onStreamMessage, onStreamMessageError);
  };

  const onStreamMessage = (messageData: { data: string; event: string }) => {
    const eventText = messageData?.data || '';
    const event = messageData?.event || '';

    if (event === 'end') {
      setMessages((prevMessages) => [...prevMessages, { text: newMessage, isBot: true }]);
      newMessage = '';
      setCurrentMessage('');
      setStreaming(false);
    } else if (eventText?.length > 0) {
      newMessage = newMessage + ' ' + eventText;
      setCurrentMessage(newMessage);
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
            <div className='close-icon' onClick={toggleChatWindow}>
              X
            </div>
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
                    color: msg.isBot ? theme.textColor : '#fff'
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
            <div onClick={handleSendMessage} className='send-button'>
              <img
                src='https://cdn-icons-png.flaticon.com/128/14025/14025522.png'
                alt='Send'
                className='send-icon'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotUI;
