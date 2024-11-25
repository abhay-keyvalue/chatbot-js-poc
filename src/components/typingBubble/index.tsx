import { COLORS } from '../../constants';
import type { TypingBubbleProps } from '../../types';

import './styles.css';

const TypingBubble = (props: TypingBubbleProps) => {
  const { dotColor } = props;

  return (
    <div className='dot-container' style={{ backgroundColor: COLORS.bubble }}>
      {[0, 1, 2].map((it) => (
        <span key={it} className='dot' style={{ backgroundColor: dotColor }} />
      ))}
    </div>
  );
};

export default TypingBubble;
