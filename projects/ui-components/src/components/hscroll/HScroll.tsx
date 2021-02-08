import React, { useEffect, useRef, useState } from 'react';

import styles from './HScroll.module.css';
import HScrollNavButton from './HScrollNavButton';
import HScrollNavDirection from './HScrollNavDirection';

interface Props {
  children: React.ReactNode[];
}

const CARD_WIDTH = 200;

const HScroll: React.FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(1);
  const [sliderOffset, setSliderOffset] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    if (container == null) {
      throw new Error('Missing container ref');
    }
    const containerRect = container.getBoundingClientRect();
    widthRef.current = containerRect.width;
  }, []);

  const numChildren = React.Children.count(children);
  const sliderWidth = numChildren * CARD_WIDTH;
  const maxSliderOffset = sliderWidth - widthRef.current;

  const sliderStyles = {
    transform: `translateX(${sliderOffset * -1}px)`,
    width: sliderWidth,
  };

  const scrollNext = () => {
    setSliderOffset((prevOffset) => {
      return Math.min(prevOffset + widthRef.current, maxSliderOffset);
    });
  };
  const scrollPrev = () => {
    setSliderOffset((prevOffset) => {
      return Math.max(prevOffset - widthRef.current, 0);
    });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <HScrollNavButton
        direction={HScrollNavDirection.PREVIOUS}
        hidden={sliderOffset === 0}
        onClick={scrollPrev}
      />
      <HScrollNavButton
        direction={HScrollNavDirection.NEXT}
        hidden={sliderOffset === maxSliderOffset}
        onClick={scrollNext}
      />
      <div className={styles.slider} style={sliderStyles}>
        {children}
      </div>
    </div>
  );
};

export default HScroll;
