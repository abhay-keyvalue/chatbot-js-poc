import dateFormat from 'dateformat';
import { marked } from 'marked';

import { COLORS, MessageTypes } from '@constants';
import type { ChatBubbleProps } from '@types';

import { Table } from '../Table';
import './styles.css';

/**
 * Represents a chat bubble component.
 * @param {ChatBubbleProps} props - The props for the chat bubble component.
 * @returns {JSX.Element} The rendered chat bubble component.
 */
const ChatBubble = (props: ChatBubbleProps) => {
  const { message, index, theme } = props;
  const styles = {
    bubble: {
      backgroundColor: message.type === MessageTypes.BOT ? COLORS.bubble : theme.primaryColor,
      color: message.type === MessageTypes.BOT ? theme.textColor : COLORS.white
    }
  };

  const renderDateMessage = () => (
    <div key={index} className='chat-date'>
      {message.text}
    </div>
  );

  const renderBotMessage = () => (
    <div key={index} className='chat-message-container chat-message-bot' data-testId='chat-bot-message-bubble'>
      <div className='chat-message bot-message' style={styles.bubble}>
        <div dangerouslySetInnerHTML={{ __html: marked(message.text) as string }} />
        {(message.data?.columns?.length || 0) > 0 && (
          <Table columns={message?.data?.columns || []} rows={message?.data?.rows || []} />
        )}
      </div>
      <div className='chat-timestamp'>{dateFormat(message.timestamp, 'h:MM')}</div>
    </div>
  );

  const renderUserMessage = () => (
    <div key={index} className='chat-message-container chat-message-user' data-testId='chat-user-message-bubble'>
      <div className='chat-message' style={styles.bubble}>
        {message.text}
      </div>
      <div className='chat-timestamp'>{dateFormat(message.timestamp, 'h:MM')}</div>
    </div>
  );

  switch (message.type) {
    case MessageTypes.DATE:
      return renderDateMessage();
    case MessageTypes.BOT:
      return renderBotMessage();
    case MessageTypes.USER:
      return renderUserMessage();
    default:
      return null;
  }
};

export default ChatBubble;
