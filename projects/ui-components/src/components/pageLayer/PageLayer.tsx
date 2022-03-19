import React, { useLayoutEffect, useRef, useState } from 'react';

import styles from './PageLayer.module.css';

interface Props {
  children: React.ReactChild;
  isActive: boolean;
}

function PageLayer({ children, isActive: shouldBeActive }: Props) {
  const [isActive, setIsActive] = useState(shouldBeActive);
  const initialScrollRef = useRef(false);
  const scrollPositionRef = useRef<{ x: number; y: number } | null>(null);

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

    setIsActive(shouldBeActive);
  }, [isActive, shouldBeActive]);

  return (
    <div className={isActive ? undefined : styles.inactive}>{children}</div>
  );
}

export default PageLayer;
