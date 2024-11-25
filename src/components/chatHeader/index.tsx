import { useMemo } from 'preact/hooks';

import { DEFAULT_THEME } from '../../constants';
import type { ChatHeaderProps } from '../../types';

import './styles.css';

/**
 * Represents the header component of the chat window.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.toggleChatWindow - The function to toggle the chat window.
 * @param {Object} props.theme - The object to specify theme.
 * @param {String} props.chatTitle - The title of the chat window.
 * @returns {JSX.Element} The rendered component.
 */

const ChatHeader = (props: ChatHeaderProps) => {
  const {
    toggleChatWindow,
    botIcon,
    closeIcon,
    theme = DEFAULT_THEME,
    chatTitle,
    toggleSize
  } = props;
  const styles = {
    header: {
      backgroundColor: theme.primaryColor,
      color: theme.chatWindowColor
    }
  };

  const renderCloseIcon = useMemo(() => {
    if (closeIcon?.length)
      return <img src={closeIcon} alt='close' className='close-icon' width={25} height={25} />;

    return 'X';
  }, [closeIcon]);

  return (
    <div className='chat-header' style={styles.header} onClick={toggleSize}>
      <img src={botIcon} alt='Bot' className='header-image' width={30} height={30} />
      <span>{chatTitle}</span>
      <div className='close-icon' onClick={toggleChatWindow}>
        {renderCloseIcon}
      </div>
    </div>
  );
};

export default ChatHeader;
