import type { JSX } from 'preact';

import { en } from '@constants';
import type { ChatInputProps } from '@types';

import './styles.css';

/**
 * Represents the chat input component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleSendMessage - The function to handle sending a message.
 * @param {string} props.input - The input value.
 * @param {Function} props.setInput - The function to set the input value.
 * @param {boolean} props.isDisabled - Indicates if the input is disabled.
 * @param {string} props.sendIcon - Url for sendIcon.
 * @returns {JSX.Element} The rendered component.
 */

const ChatInput = (props: ChatInputProps) => {
  const { handleSendMessage, input, setInput, isDisabled, sendIcon } = props;
  const onChangeInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const eventTarget = e?.target as HTMLInputElement;

    setInput(eventTarget?.value || '');
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
        placeholder={en.chatbot_placeholder}
      />
      <button
        className={isDisabled ? 'disabled-send-button' : 'send-button'}
        onClick={handleSendMessage}
      >
        <img src={sendIcon} alt='Send' className='send-icon' width={32} height={32} />
      </button>
    </div>
  );
};

export default ChatInput;