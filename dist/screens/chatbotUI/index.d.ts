import type { JSX } from 'preact/jsx-runtime';
import type { ChatBotUIProps } from '@types';
import './styles.css';
/**
 * Represents the ChatBotUI component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} [props.settings] - Contains Tenant settings.
 * @param {Object} [props.config] - Contains apiKey and agentType.
 * @param {String} [props.backendBaseUrl] - The backend base URL.
 * @param {Object} [props.chat] - Contains chatId and history.
 * @returns {JSX.Element} The rendered ChatBotUI component.
 */
declare const ChatBotUI: (props: ChatBotUIProps) => JSX.Element;
export default ChatBotUI;
