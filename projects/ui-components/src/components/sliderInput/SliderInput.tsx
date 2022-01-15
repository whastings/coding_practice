import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import classNames from '../../utils/classNames';

import styles from './SliderInput.module.css';
import useSliderEventHandlers from './useSliderEventHandlers';

export interface Props {
  max: number;
  min: number;
  onChange: (newValue: number) => void;
  step?: number;
  value: number;
  vertical?: boolean;
}

function validateProps(value: number, min: number, max: number, step: number) {
  if (value < min || value > max) {
    throw new Error('value out of range');
  }

  if (max <= min) {
    throw new Error('max is not greater than min');
  }

  if (step >= max - min) {
    throw new Error('step is too large');
  }
}

function SliderInput({
  min,
  max,
  onChange,
  step = 1,
  value,
  vertical = false,
}: Props) {
  validateProps(value, min, max, step);
  const [trackRect, setTrackRect] = useState<DOMRect | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const dimension = vertical ? 'height' : 'width';
  const numSteps = (max - min) / step;
  const pixelsPerStep =
    trackRect != null ? trackRect[dimension] / numSteps : null;
  const thumbPosition =
    pixelsPerStep != null ? ((value - min) / step) * pixelsPerStep : null;

  const updateValue = (eventPosition: { x: number; y: number }) => {
    if (trackRect == null || pixelsPerStep == null) {
      throw new Error('trackRef or pixelsPerStep is null');
    }

    const coord = vertical ? 'y' : 'x';
    const side = vertical ? 'bottom' : 'left';
    const relativeMousePosition = Math.abs(
      eventPosition[coord] - trackRect[side],
    );
    const clampedPosition = Math.min(
      Math.max(relativeMousePosition, 0),
      trackRect[dimension],
    );
    const newValue = Math.round(clampedPosition / pixelsPerStep) * step + min;

    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const getTransform = () => {
    if (trackRect == null) {
      throw new Error('trackRect is null');
    }

    if (vertical) {
      return `
        translateY(
          clamp(
            calc(-${trackRect.height}px + 100%),
            calc(-${thumbPosition}px + 50%),
            0px
          )
        )
      `;
    }

    return `
      translateX(
        clamp(
          0px,
          calc(${thumbPosition}px - 50%),
          calc(${trackRect.width}px - 100%)
        )
      )
    `;
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
    <div
      className={classNames(
        styles.container,
        vertical && styles.containerVertical,
      )}
    >
      <div className={styles.track} ref={trackRef} {...eventHandlers} />
      {trackRect != null && thumbPosition != null && (
        <>
          <div className={styles.fill} style={{ [dimension]: thumbPosition }} />
          <div
            className={styles.thumb}
            style={{
              transform: getTransform(),
            }}
          />
        </>
      )}
    </div>
  );
}

export default SliderInput;
