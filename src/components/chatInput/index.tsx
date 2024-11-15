import type { ChatInputProps } from '@types';

import './styles.css';

const ChatInput = ({ handleSendMessage, input, setInput, isDisabled }: ChatInputProps) => {
  const onChangeInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className='chat-input-container'>
      <input
        type='text'
        value={input}
        onInput={onChangeInput}
        onKeyUp={handleKeyDown}
        className='input-field'
        placeholder='Message...'
      />
      <button
        className={isDisabled ? 'disabled-send-button' : 'send-button'}
        onClick={handleSendMessage}
      >
        <img
          src='https://cdn-icons-png.flaticon.com/128/14025/14025522.png'
          alt='Send'
          className='send-icon'
          width={32}
          height={32}
        />
      </button>
    </div>
  );
};

export default ChatInput;
