import type { JSX } from 'preact';

import { DEFAULT_THEME } from '../../constants';
import type { ChatInputProps } from '../../types';

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
 * @param {theme} props.theme - The chat theme.
 * @param {string} props.placeholder - The placeholder for the input field.
 * @returns {JSX.Element} The rendered component.
 */

const ChatInput = (props: ChatInputProps) => {
  const {
    handleSendMessage,
    input,
    setInput,
    isDisabled = false,
    sendIcon,
    theme = DEFAULT_THEME,
    placeholder
  } = props;
  const styles = {
    sendButton: {
      backgroundColor: theme?.secondaryColor
    }
  };
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
        placeholder={placeholder}
        aria-label='Type your message to send here'
        aria-disabled={isDisabled}
        data-testid='chat-input-field'
      />
      <button
        className={isDisabled ? 'disabled-send-button' : 'send-button'}
        style={styles.sendButton}
        onClick={handleSendMessage}
        aria-label='Click to send your message'
        disabled={isDisabled}
        data-testid='chat-send-button'
      >
        <img src={sendIcon} alt='Send' className='send-icon' width={32} height={32} />
      </button>
    </div>
  );
};

export default ChatInput;
