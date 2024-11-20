import type { JSX } from 'preact';
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
declare const ChatInput: (props: ChatInputProps) => JSX.Element;
export default ChatInput;
