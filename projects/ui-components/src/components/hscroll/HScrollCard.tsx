import React from 'react';

import styles from './HScrollCard.module.css';

export interface Props {
  children: React.ReactNode;
}

const HScrollCard: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export type Type = typeof HScrollCard;
export default HScrollCard;
