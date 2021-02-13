import React, { useLayoutEffect, useRef, useState } from 'react';

import styles from './HScroll.module.css';
import HScrollNavButton from './HScrollNavButton';
import HScrollNavDirection from './HScrollNavDirection';

interface Props {
  children: React.ReactNode[];
  numCardsDisplayed: number;
}

const GAP_WIDTH = 16;
const PEEK_WIDTH = 32;

const getSliderWidth = (
  containerWidth: number,
  numCardsDisplayed: number,
  numCardsTotal: number,
): number => {
  const numGaps = numCardsTotal + 1;
  const totalGapSpace = numGaps * GAP_WIDTH;

  const initialGapSpace = (numCardsDisplayed + 1) * GAP_WIDTH;
  const availableCardSpace = containerWidth - initialGapSpace - PEEK_WIDTH;
  const cardWidth = availableCardSpace / numCardsDisplayed;
  const totalCardSpace = cardWidth * numCardsTotal;

  return totalCardSpace + totalGapSpace;
};

const getOffsetChange = (containerWidth: number, fromEnd: boolean): number => {
  return fromEnd
    ? containerWidth - GAP_WIDTH - PEEK_WIDTH * 1.5
    : containerWidth - GAP_WIDTH - PEEK_WIDTH;
};

const HScroll: React.FC<Props> = ({ children, numCardsDisplayed }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sliderOffset, setSliderOffset] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (container == null) {
      throw new Error('Missing container ref');
    }
    const containerRect = container.getBoundingClientRect();
    setContainerWidth(containerRect.width);
  }, []);

  const sliderWidth =
    containerWidth > 0
      ? getSliderWidth(
          containerWidth,
          numCardsDisplayed,
          React.Children.count(children),
        )
      : 0;
  const maxSliderOffset = containerWidth > 0 ? sliderWidth - containerWidth : 0;

  const sliderStyles = {
    transform: `translateX(${sliderOffset * -1}px)`,
    width: sliderWidth,
  };

  const scrollNext = () => {
    setSliderOffset((prevOffset) => {
      const offsetIncrease = getOffsetChange(containerWidth, prevOffset === 0);
      return Math.min(prevOffset + offsetIncrease, maxSliderOffset);
    });
  };
  const scrollPrev = () => {
    setSliderOffset((prevOffset) => {
      const offsetDecrease = getOffsetChange(
        containerWidth,
        prevOffset === maxSliderOffset,
      );
      return Math.max(prevOffset - offsetDecrease, 0);
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
