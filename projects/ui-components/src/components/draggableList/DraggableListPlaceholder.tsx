import React from 'react';

import { Size } from './DraggableListType';
import styles from './DraggableListPlaceholder.module.css';

interface Props {
  size: Size;
}

function DraggableListPlaceholder({ size }: Props) {
  return <div className={styles.container} style={size} />;
}

export default DraggableListPlaceholder;
