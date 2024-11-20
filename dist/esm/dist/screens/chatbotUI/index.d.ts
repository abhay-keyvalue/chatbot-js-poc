import type { JSX } from 'preact/jsx-runtime';
import type { ChatBotUIProps } from '@types';
import './styles.css';
/**
 * Represents the ChatBotUI component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.theme=DEFAULT_THEME] - The theme for the chatbot UI.
 * @returns {JSX.Element} The rendered ChatBotUI component.
 */
declare const ChatBotUI: (props: ChatBotUIProps) => JSX.Element;
export default ChatBotUI;
