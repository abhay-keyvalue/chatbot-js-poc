import { marked } from 'marked';

import type { ChatBubbleProps } from '@types';

import './styles.css';

const ChatBubble = ({ message, index, theme, event }: ChatBubbleProps) => (
  <div
    key={index}
    className={`chat-message-container ${message.isBot ? 'chat-message-bot' : 'chat-message-user'}`}
  >
    <div
      className='chat-message'
      style={{
        backgroundColor: message.isBot ? '#e0e0e0' : theme.buttonColor,
        color: message.isBot ? theme.textColor : '#fff'
      }}
    >
      {event?.length > 0 && index === -1 && <div className='event-title'>{`${event}...`}</div>}
      {message.isBot ? (
        <div dangerouslySetInnerHTML={{ __html: marked(message.text) as string }} />
      ) : (
        message.text
      )}
    </div>
  </div>
);

export default ChatBubble;
