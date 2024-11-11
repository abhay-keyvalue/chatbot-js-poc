import React, { useState } from 'react';

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
  onSendMessage?: (message: string) => Promise<string>;
}

const ChatBotUI: React.FC<ChatBotUIProps> = ({ theme={}, onSendMessage=()=> null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };

    setMessages([...messages, userMessage]);

    setInput('');
    await onSendMessage(input);
  };

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
      {/* Chat Window */}
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
          {/* Header */}
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

          {/* Chat Display */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#ffffff' }}>
            {messages.map((msg, index) => (
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
                    color: msg.isBot ? theme.textColor : 'white',
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

          {/* Input */}
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
              onChange={(e) => setInput(e.target.value)}
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
