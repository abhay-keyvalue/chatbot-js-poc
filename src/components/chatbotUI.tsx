import { useMemo, useState } from 'preact/hooks';

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

const ChatBotUI = ({
  theme = { buttonColor: 'blue', chatWindowColor: 'white', textColor: 'white' }
}: ChatBotUIProps) => {
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

  const getBotResponse = async (userMessage: string): Promise<any> => {
    console.log('User message:', userMessage);
    const streamUrl = 'https://51a3-103-138-236-18.ngrok-free.app/sse-endpoint';

    try {
      const eventSource = new EventSource(streamUrl);
      let message = '';

      setStreaming(true);
      eventSource.onmessage = (event) => {
        // Process each new chunk of text received
        const eventText = event?.data || '';

        console.log('Event:', eventText);

        if (eventText === '[DONE]') {
          console.log('All data received');
          setMessages((prevMessages) => [...prevMessages, { text: message, isBot: true }]);
          setCurrentMessage('');
          eventSource.close();
          setStreaming(false);
        } else {
          if (eventText?.length > 0) {
            message = message + ' ' + eventText;
            setCurrentMessage(message);
          }
        }

        return eventText;
      };

      eventSource.onerror = () => {
        // Handle error and close the stream
        eventSource.close();
        setCurrentMessage('');
        setStreaming(false);

        return "I'm sorry, I don't understand that.";
      };
    } catch (error) {
      console.error('Error:', error);

      return 'Error occurred. Please try again.';
    }
  };

  const updatedMessages = useMemo(() => {
    if (currentMessage?.length > 0) return [...messages, { text: currentMessage, isBot: true }];
    else return messages;
  }, [messages, currentMessage]);

  return (
    <div>
      <div
        style={{
          backgroundColor: theme.buttonColor,
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src='https://cdn-icons-png.flaticon.com/128/18221/18221591.png'
          alt='Chat'
          style={{ width: '60px', height: '60px', borderRadius: '50%' }}
        />
      </div>

      {isOpen && (
        <div
          style={{
            backgroundColor: theme.chatWindowColor,
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
          }}
        >
          <div
            style={{
              backgroundColor: theme.buttonColor,
              padding: '15px',
              color: 'white',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>ChatBot</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
            {updatedMessages?.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.isBot ? 'flex-start' : 'flex-end',
                  margin: '8px 0'
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.isBot ? '#e0e0e0' : theme.buttonColor,
                    color: msg.isBot ? 'black' : theme.textColor,
                    padding: '10px',
                    borderRadius: '15px',
                    maxWidth: '70%'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              padding: '10px',
              alignItems: 'center',
              borderTop: '1px solid #ddd'
            }}
          >
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ flex: 1, padding: '8px', borderRadius: '25px', border: '1px solid #ddd' }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                marginLeft: '10px',
                backgroundColor: theme.buttonColor,
                borderRadius: '50%'
              }}
            >
              <img
                src='https://cdn-icons-png.flaticon.com/128/14025/14025522.png'
                alt='Send'
                style={{ width: '32px', height: '32px' }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotUI;
