import React from 'react';

import { AnchorPoint } from '../../utils/useAnchoredPosition';
import classNames from '../../utils/classNames';
import styles from './Tooltip.module.css';

interface Props {
  anchorPoint: AnchorPoint;
  children: React.ReactNode;
}

function Tooltip({ anchorPoint, children }: Props) {
  const getAnchorPointClass = () => {
    switch (anchorPoint) {
      case AnchorPoint.TOP:
        return styles.anchorTop;
      case AnchorPoint.BOTTOM:
        return styles.anchorBottom;
      case AnchorPoint.START:
        return styles.anchorStart;
      case AnchorPoint.END:
        return styles.anchorEnd;
    }
  };

  return (
    <div
      className={classNames(
        styles.container,
        styles.anchored,
        getAnchorPointClass(),
      )}
    >
      {children}
    </div>
  );
}

export default Tooltip;
