import React, { useState } from 'react';

import useIntersectionObserver from '../../utils/useIntersectionObserver';
import styles from './StickyHeader.module.css';

interface Props {
  children: (isSticky: boolean) => React.ReactNode;
  onStick?: () => void;
  onUnstick?: () => void;
}

function StickyHeader({ children, onStick, onUnstick }: Props) {
  const [isSticky, setIsSticky] = useState(false);
  const intersectionObserverRef = useIntersectionObserver<HTMLDivElement>(
    (entry) => {
      if (entry.intersectionRatio < 1) {
        setIsSticky(true);
        onStick?.();
      } else {
        setIsSticky(false);
        onUnstick?.();
      }
    },
  );

  return (
    <>
      <div ref={intersectionObserverRef} />
      <div className={styles.root}>{children(isSticky)}</div>
    </>
  );
}

export default StickyHeader;
