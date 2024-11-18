import { CHATBOT_ICON_URL, en } from '@constants';
import type { ChatHeaderProps } from '@types';

import './styles.css';

/**
 * Represents the header component of the chat window.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.toggleChatWindow - The function to toggle the chat window.
 * @returns {JSX.Element} The rendered component.
 */

const ChatHeader = (props: ChatHeaderProps) => {
  const { toggleChatWindow } = props;

  return (
    <div className='chat-header'>
      <img src={CHATBOT_ICON_URL} alt='Bot' className='header-image' width={30} height={30} />
      <span>{en.chatbot_title}</span>
      <div className='close-icon' onClick={toggleChatWindow}>
        X
      </div>
    </div>
  );
};

export default ChatHeader;
