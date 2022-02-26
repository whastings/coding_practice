import React, { MouseEventHandler, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import styles from './DrawToCursor.module.css';

interface Position {
  x: number;
  y: number;
}

export default {
  title: 'Playground/DrawToCursor',
} as Meta;

const LINE_HEIGHT = 10;
const MIDPOINT: Position = { x: 150, y: 150 };

function getDistance(position1: Position, position2: Position): number {
  return Math.sqrt(
    Math.pow(position2.x - position1.x, 2) +
      Math.pow(position2.y - position1.y, 2),
  );
}

function getLineStyles(mousePosition: Position) {
  const distance = getDistance(mousePosition, MIDPOINT);
  const lineScale = distance / LINE_HEIGHT;

  const opposite = getDistance(mousePosition, {
    x: MIDPOINT.x,
    y: mousePosition.y,
  });
  let angle = Math.asin(opposite / distance);

  return { transform: `rotate(${angle}rad) scaleY(${lineScale})` };
}

export function Default() {
  const [mousePosition, setMousePosition] = useState<Position | null>(null);

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    setMousePosition({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };

  const lineStyles =
    mousePosition != null ? getLineStyles(mousePosition) : undefined;

  return (
    <div
      className={styles.container}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.line} style={lineStyles} />
    </div>
  );
}
