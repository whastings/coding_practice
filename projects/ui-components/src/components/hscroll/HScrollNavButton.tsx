import React from 'react';

import HScrollNavDirection from './HScrollNavDirection';
import styles from './HScrollNavButton.module.css';
import classNames from '../../utils/classNames';

interface Props {
  direction: HScrollNavDirection;
  hidden: boolean;
  onClick: () => void;
}

const getButtonText = (direction: HScrollNavDirection): string => {
  switch (direction) {
    case HScrollNavDirection.NEXT:
      return 'Next';
    case HScrollNavDirection.PREVIOUS:
      return 'Prev';
  }
};

const getButtonClass = (direction: HScrollNavDirection): string => {
  switch (direction) {
    case HScrollNavDirection.NEXT:
      return styles.buttonNext;
    case HScrollNavDirection.PREVIOUS:
      return styles.buttonPrev;
  }
};

const HScrollNavButton: React.FC<Props> = ({ direction, hidden, onClick }) => {
  const buttonText = getButtonText(direction);
  const buttonClass = getButtonClass(direction);

  return (
    <button
      className={classNames(styles.button, buttonClass)}
      hidden={hidden}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default HScrollNavButton;
