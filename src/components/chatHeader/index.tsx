import type { ChatHeaderProps } from '@types';

import './styles.css';

const ChatHeader = ({ toggleChatWindow }: ChatHeaderProps) => (
  <div className='chat-header'>
    <img
      src='https://cdn-icons-png.flaticon.com/128/18221/18221591.png'
      alt='Bot'
      className='header-image'
      width={30}
      height={30}
    />
    <span>ChatBot</span>
    <div className='close-icon' onClick={toggleChatWindow}>
      X
    </div>
  </div>
);

export default ChatHeader;
