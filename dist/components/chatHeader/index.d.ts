import type { ChatHeaderProps } from '@types';
import './styles.css';
/**
 * Represents the header component of the chat window.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.toggleChatWindow - The function to toggle the chat window.
 * @param {Object} props.theme - The object to specify theme.
 * @returns {JSX.Element} The rendered component.
 */
declare const ChatHeader: (props: ChatHeaderProps) => import("preact").JSX.Element;
export default ChatHeader;
