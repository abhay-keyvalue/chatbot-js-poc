import { useMemo, useState } from 'preact/hooks';

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
        const eventText = event?.data || '' || userMessage; // TO DO: To be removed

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
        style={{ ...styles.chatButton, backgroundColor: theme.buttonColor }}
        onClick={toggleChatWindow}
      >
        <img
          src='https://cdn-icons-png.flaticon.com/128/18221/18221591.png'
          alt='Chat'
          style={styles.chatIcon}
        />
      </div>

      {isOpen && (
        <div style={{ ...styles.chatWindow, backgroundColor: theme.chatWindowColor }}>
          <div style={{ ...styles.chatHeader, backgroundColor: theme.buttonColor }}>
            <span>ChatBot</span>
            <button onClick={toggleChatWindow}>✕</button>
          </div>

          <div style={styles.chatMessages}>
            {updatedMessages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.chatMessageContainer,
                  ...(msg.isBot ? styles.chatMessageBot : styles.chatMessageUser)
                }}
              >
                <div
                  style={{
                    ...styles.chatMessage,
                    backgroundColor: msg.isBot ? '#e0e0e0' : theme.buttonColor,
                    color: msg.isBot ? 'black' : theme.textColor
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.inputContainer}>
            <input
              type='text'
              value={input}
              onChange={onChangeInput}
              onKeyPress={handleKeyDown}
              style={styles.inputField}
            />
            <button
              onClick={handleSendMessage}
              style={{ ...styles.sendButton, backgroundColor: theme.buttonColor }}
            >
              <img
                src='https://cdn-icons-png.flaticon.com/128/14025/14025522.png'
                alt='Send'
                style={styles.sendIcon}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  chatButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    cursor: 'pointer'
  },
  chatIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%'
  },
  chatWindow: {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    width: '100%',
    maxWidth: '400px',
    height: '70%',
    maxHeight: '600px',
    borderRadius: '15px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000
  },
  chatHeader: {
    padding: '15px',
    color: 'white',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chatMessages: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    backgroundColor: '#ffffff'
  },
  chatMessageContainer: {
    display: 'flex',
    margin: '8px 0'
  },
  chatMessageBot: {
    justifyContent: 'flex-start'
  },
  chatMessageUser: {
    justifyContent: 'flex-end'
  },
  chatMessage: {
    padding: '10px',
    borderRadius: '15px',
    maxWidth: '70%'
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    borderTop: '1px solid #ddd'
  },
  inputField: {
    flex: 1,
    padding: '8px',
    borderRadius: '25px',
    border: '1px solid #ddd'
  },
  sendButton: {
    marginLeft: '10px',
    borderRadius: '50%'
  },
  sendIcon: {
    width: '32px',
    height: '32px'
  }
};

export default ChatBotUI;
