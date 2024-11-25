import { COLORS } from '../../constants';
import type { TypingBubbleProps } from '../../types';

import './styles.css';

const TypingBubble = (props: TypingBubbleProps) => {
  const { dotColor } = props;

  return (
    <div className='dot-container' style={{ backgroundColor: COLORS.bubble }}>
      {Array.from({ length: 3 }, (_, index) => (
        <span key={index} className='dot' style={{ backgroundColor: dotColor }} />
      ))}
    </div>
  );
};

export default TypingBubble;
