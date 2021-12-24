import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';

import styles from './SliderInput.module.css';
import useSliderEventHandlers from './useSliderEventHandlers';

export interface Props {
  max: number;
  min: number;
  onChange: (newValue: number) => void;
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

function SliderInput({ min, max, onChange, value }: Props) {
  validateProps(value, min, max);
  const [trackRect, setTrackRect] = useState<DOMRect | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const numSteps = max - min;
  const pixelsPerStep = trackRect != null ? trackRect.width / numSteps : null;
  const thumbPosition =
    pixelsPerStep != null ? (value - min) * pixelsPerStep : null;

  const updateValue = (eventPosition: { x: number; y: number }) => {
    if (trackRect == null || pixelsPerStep == null) {
      throw new Error('trackRef or pixelsPerStep is null');
    }

    const relativeMousePosition = eventPosition.x - trackRect.left;
    const clampedPosition = Math.min(
      Math.max(relativeMousePosition, 0),
      trackRect.width,
    );
    const newValue = Math.round(clampedPosition / pixelsPerStep) + min;

    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const handleTrackClick: MouseEventHandler<HTMLDivElement> = (event) => {
    updateValue({ x: event.clientX, y: event.clientY });
  };

  const eventHandlers = useSliderEventHandlers(updateValue);

  useEffect(() => {
    if (trackRef.current == null) {
      throw new Error('trackRef not set');
    }

    if (trackRect == null) {
      setTrackRect(trackRef.current.getBoundingClientRect());
    }
  }, [trackRect]);

  return (
    <div className={styles.container}>
      <div className={styles.track} onClick={handleTrackClick} ref={trackRef} />
      {trackRect != null && thumbPosition != null && (
        <>
          <div className={styles.fill} style={{ width: thumbPosition }} />
          <div
            className={styles.thumb}
            style={{
              transform: `translateX(
                clamp(
                  0px,
                  calc(${thumbPosition}px - 50%),
                  calc(${trackRect.width}px - 100%)
                )
              )`,
            }}
            {...eventHandlers}
          />
        </>
      )}
    </div>
  );
}

export default SliderInput;
