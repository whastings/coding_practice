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
  const [pageNum, setPageNum] = useState(1);

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
  const numPages = sliderWidth / widthRef.current;
  const sliderScroll = (pageNum - 1) * widthRef.current * -1;
  const sliderStyles = {
    transform: `translateX(${sliderScroll}px)`,
    width: sliderWidth,
  };

  const scrollNext = () => {
    setPageNum((prevPageNum) => prevPageNum + 1);
  };
  const scrollPrev = () => {
    setPageNum((prevPageNum) => prevPageNum - 1);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <HScrollNavButton
        direction={HScrollNavDirection.PREVIOUS}
        hidden={pageNum === 1}
        onClick={scrollPrev}
      />
      <HScrollNavButton
        direction={HScrollNavDirection.NEXT}
        hidden={pageNum === numPages}
        onClick={scrollNext}
      />
      <div className={styles.slider} style={sliderStyles}>
        {children}
      </div>
    </div>
  );
};

export default HScroll;
