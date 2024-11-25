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
 * @param {Object} props.settings - The object to specify settings.
 * @returns {JSX.Element} The rendered component.
 */

const ChatHeader = (props: ChatHeaderProps) => {
  const { toggleChatWindow, settings, toggleSize } = props;

  const { chatTitle, closeIcon, botIcon, maximizeIcon, theme = DEFAULT_THEME } = settings || {};

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

  const renderMaximize = useMemo(() => {
    if (maximizeIcon?.length)
      return <img src={maximizeIcon} alt='close' className='close-icon' width={25} height={25} />;

    return 'O';
  }, [maximizeIcon]);

  return (
    <div className='chat-header' style={styles.header}>
      <div className='header-row'>
        <img src={botIcon} alt='Bot' className='header-image' width={30} height={30} />
        <span>{chatTitle}</span>
      </div>
      <div className='header-row'>
        <div className='minimize-icon' onClick={toggleSize}>
          {renderMaximize}
        </div>
        <div className='close-icon' onClick={toggleChatWindow}>
          {renderCloseIcon}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
