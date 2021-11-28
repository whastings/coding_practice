import { useCallback } from 'react';

import { KeyframesGenerator } from './AnimationTypes';

interface Options {
  friction: number; // a.k.a. damping
  mass: number;
  precision: number;
  tension: number; // a.k.a. stiffness
}

interface Position {
  x: number;
  y: number;
}

const FRAME_LENGTH = 1 / 60;
const MS_PER_FRAME = FRAME_LENGTH * 1000;
const SPRING_LENGTH = 1;

function getFramePositions(
  startPosition: Position,
  endPosition: Position,
  options: Options,
): Position[] {
  const { friction, mass, precision, tension } = options;
  let currentX = startPosition.x;
  let currentY = startPosition.y;
  let velocityX = 0;
  let velocityY = 0;
  const positions: Position[] = [{ x: currentX, y: currentY }];

  while (
    Math.abs(currentX - endPosition.x) > precision ||
    Math.abs(currentY - endPosition.y) > precision
  ) {
    const springForceX = -tension * (currentX - SPRING_LENGTH);
    const springForceY = -tension * (currentY - SPRING_LENGTH);

    const frictionForceX = -friction * velocityX;
    const frictionForceY = -friction * velocityY;

    // Derived from: force = mass * acceleration
    const accelerationX = (springForceX + frictionForceX) / mass;
    const accelerationY = (springForceY + frictionForceY) / mass;

    velocityX += accelerationX * FRAME_LENGTH;
    velocityY += accelerationY * FRAME_LENGTH;

    currentX += velocityX * FRAME_LENGTH;
    currentY += velocityY * FRAME_LENGTH;

    positions.push({ x: currentX, y: currentY });
  }

  const lastPosition = positions[positions.length - 1];
  if (lastPosition.x !== endPosition.x || lastPosition.y !== endPosition.y) {
    positions.push(endPosition);
  }

  return positions;
}

function useSpringKeyframesGenerator(options: Options): KeyframesGenerator {
  const { friction, mass, precision, tension } = options;

  return useCallback(
    (startRect, endRect) => {
      const positionDiff = {
        x: startRect.x - endRect.x,
        y: startRect.y - endRect.y,
      };
      const framePositions = getFramePositions(
        positionDiff,
        { x: 0, y: 0 },
        {
          friction,
          mass,
          precision,
          tension,
        },
      );

      const keyframes = framePositions.map((position) => {
        return {
          transform: new DOMMatrix()
            .translateSelf(position.x, position.y)
            .toString(),
        };
      });

      return {
        keyframes,
        options: { duration: keyframes.length * MS_PER_FRAME },
      };
    },
    [friction, mass, precision, tension],
  );
}

export default useSpringKeyframesGenerator;
