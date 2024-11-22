import { marked } from 'marked';

import { COLORS } from '@constants';
import type { ChatBubbleProps } from '@types';

import './styles.css';
import { Table } from '../Table';

/**
 * Represents a chat bubble component.
 * @param {ChatBubbleProps} props - The props for the chat bubble component.
 * @returns {JSX.Element} The rendered chat bubble component.
 */

const ChatBubble = (props: ChatBubbleProps) => {
  const { message, index, theme } = props;
  const styles = {
    bubble: {
      backgroundColor: message.isBot ? COLORS.bubble : theme.primaryColor,
      color: message.isBot ? theme.textColor : COLORS.white
    }
  };

  return (
    <div
      key={index}
      className={`chat-message-container ${message.isBot ? 'chat-message-bot' : 'chat-message-user'}`}
      data-testId='chat-message-bubble'
    >
      <div className={`chat-message ${message.isBot && 'bot-message'}`} style={styles.bubble}>
        {/* {event?.length > 0 && index === -1 && <div className='event-title'>{`${event}...`}</div>} */}
        {message.isBot ? (
          <div dangerouslySetInnerHTML={{ __html: marked(message.text) as string }} />
        ) : (
          message.text
        )}
        {(message.data?.columns?.length || 0) > 0 && (
          <Table columns={message?.data?.columns || []} rows={message?.data?.rows || []} />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
