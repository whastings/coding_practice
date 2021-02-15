import React from 'react';

import ChevronLeftIcon from '../../assets/icons/ChevronLeftIcon.svg';
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.svg';
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
      return 'Previous';
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

const getButtonIcon = (direction: HScrollNavDirection): React.ReactElement => {
  switch (direction) {
    case HScrollNavDirection.NEXT:
      return <ChevronRightIcon width={32} height={32} />;
    case HScrollNavDirection.PREVIOUS:
      return <ChevronLeftIcon />;
  }
};

const HScrollNavButton: React.FC<Props> = ({ direction, hidden, onClick }) => {
  const buttonText = getButtonText(direction);
  const buttonClass = getButtonClass(direction);
  const buttonIcon = getButtonIcon(direction);

  return (
    <button
      aria-label={buttonText}
      className={classNames(styles.button, buttonClass)}
      hidden={hidden}
      onClick={onClick}
    >
      {buttonIcon}
    </button>
  );
};

export default HScrollNavButton;
