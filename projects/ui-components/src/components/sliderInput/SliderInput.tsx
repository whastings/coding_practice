import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './SliderInput.module.css';

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
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (trackRef.current == null) {
      throw new Error('trackRef not set');
    }

    if (trackRect == null) {
      setTrackRect(trackRef.current.getBoundingClientRect());
    }
  }, [trackRect]);

  const numSteps = max - min;
  const pixelsPerStep = trackRect != null ? trackRect.width / numSteps : null;
  const thumbPosition = pixelsPerStep != null ? value * pixelsPerStep : null;

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (trackRect == null || pixelsPerStep == null) {
        throw new Error('trackRef or pixelsPerStep is null');
      }

      const relativeMousePosition = event.clientX - trackRect.left;
      const clampedPosition = Math.min(
        Math.max(relativeMousePosition, 0),
        trackRect.width,
      );
      const newValue = Math.round(clampedPosition / pixelsPerStep);

      if (newValue !== valueRef.current) {
        onChangeRef.current(newValue);
      }
    },
    [pixelsPerStep, trackRect],
  );

  const handleMouseUp = useCallback(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleThumbMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles.container}>
      <div className={styles.track} ref={trackRef} />
      {trackRect != null && thumbPosition != null && (
        <div
          className={styles.thumb}
          onMouseDown={handleThumbMouseDown}
          style={{
            transform: `translateX(
              clamp(
                0px,
                calc(${thumbPosition}px - 50%),
                calc(${trackRect.width}px - 100%)
              )
            )`,
          }}
        />
      )}
    </div>
  );
}

export default SliderInput;
