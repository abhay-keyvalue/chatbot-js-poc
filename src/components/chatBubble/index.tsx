import { marked } from 'marked';

import type { ChatBubbleProps } from '@types';

import './styles.css';

/**
 * Represents a chat bubble component.
 * @param {ChatBubbleProps} props - The props for the chat bubble component.
 * @returns {JSX.Element} The rendered chat bubble component.
 */

const ChatBubble = (props: ChatBubbleProps) => {
  const { message, index, theme, event } = props;

  return (
    <div
      key={index}
      className={`chat-message-container ${message.isBot ? 'chat-message-bot' : 'chat-message-user'}`}
    >
      <div
        className={`chat-message ${message.isBot && 'bot-message'}`}
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
};

export default ChatBubble;
