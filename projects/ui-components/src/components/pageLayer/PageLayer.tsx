import React, { useLayoutEffect, useRef, useState } from 'react';

import nonNull from '../../utils/nonNull';
import styles from './PageLayer.module.css';
import usePreviousValue from '../../utils/usePreviousValue';

interface Props {
  children: React.ReactChild;
  isActive: boolean;
}

function PageLayer({ children, isActive: shouldBeActive }: Props) {
  const [isActive, setIsActive] = useState(shouldBeActive);
  const initialScrollRef = useRef(false);
  const scrollPositionRef = useRef<{ x: number; y: number } | null>(null);
  const previouslyActive = usePreviousValue(isActive);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!initialScrollRef.current) {
      window.scrollTo(0, 0);
      initialScrollRef.current = true;
    }
  });

  useLayoutEffect(() => {
    if (isActive && !shouldBeActive) {
      scrollPositionRef.current = { x: window.scrollX, y: window.scrollY };
    }

    if (isActive && shouldBeActive && scrollPositionRef.current != null) {
      const { x, y } = scrollPositionRef.current;
      window.scrollTo(x, y);
      scrollPositionRef.current = null;
    }

    if (previouslyActive && !isActive) {
      const { x, y } = nonNull(scrollPositionRef.current);
      nonNull(rootRef.current).scrollTo(x, y);
    }

    setIsActive(shouldBeActive);
  }, [isActive, previouslyActive, shouldBeActive]);

  return (
    <div className={isActive ? undefined : styles.inactive} ref={rootRef}>
      {children}
    </div>
  );
}

export default PageLayer;
