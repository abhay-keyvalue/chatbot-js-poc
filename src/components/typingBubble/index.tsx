import type { TypingBubbleProps } from '../../types';

import './styles.css';

const TypingBubble = (props: TypingBubbleProps) => {
  const { theme } = props;

  return (
    <div className='dot-container' style={{ backgroundColor: theme.chatBubbleColor }}>
      {Array.from({ length: 3 }, (_, index) => (
        <span key={index} className='dot' style={{ backgroundColor: theme?.textColor }} />
      ))}
    </div>
  );
};

export default TypingBubble;
