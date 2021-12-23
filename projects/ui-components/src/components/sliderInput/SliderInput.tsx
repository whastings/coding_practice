import React, { useEffect, useRef, useState } from 'react';

import styles from './SliderInput.module.css';

interface Props {
  max: number;
  min: number;
  value: number;
}

function validateProps(value: number, min: number, max: number) {
  if (value < min || value > max) {
    throw new Error('value out of range');
  }

  if (max <= min) {
    throw new Error('max is not greater than min');
  }
}

function SliderInput({ min, max, value }: Props) {
  validateProps(value, min, max);
  const [trackSize, setTrackSize] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current == null) {
      throw new Error('trackRef not set');
    }

    if (trackSize == null) {
      setTrackSize(trackRef.current.getBoundingClientRect().width);
    }
  }, [trackSize]);

  const numSteps = max - min;
  const pixelsPerStep = trackSize != null ? trackSize / numSteps : null;
  const thumbPosition = pixelsPerStep != null ? value * pixelsPerStep : null;

  return (
    <div className={styles.container}>
      <div className={styles.track} ref={trackRef} />
      {thumbPosition != null && (
        <div
          className={styles.thumb}
          style={{
            transform: `translateX(
              clamp(
                0px,
                calc(${thumbPosition}px - 50%),
                calc(${trackSize}px - 100%)
              )
            )`,
          }}
        />
      )}
    </div>
  );
}

export default SliderInput;
