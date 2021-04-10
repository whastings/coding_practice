import React, { useRef } from 'react';

import classNames from '../../utils/classNames';
import styles from './DraggableListItem.module.css';
import { Position, Size } from './DraggableListType';

interface Props {
  children: React.ReactChildren | string;
  index?: number;
  onMouseDown?: (
    index: number,
    position: Position,
    mouseAnchorPosition: Position,
    size: Size,
  ) => void;
  position?: Position;
  size?: Size;
}

function DraggableListItem({
  children,
  index,
  onMouseDown,
  position,
  size,
}: Props) {
  const containerRef = useRef<HTMLDivElement | undefined>();

  const getStyle = () => {
    if (position != null && size != null) {
      return {
        height: `${size.height}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: `${size.width}px`,
      };
    }

    return undefined;
  };

  const handleMouseDown = (
    event: React.SyntheticEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const containerEl = containerRef.current;

    if (containerEl == null) {
      throw new Error('Container ref not set');
    }

    if (onMouseDown == null || index == null) {
      throw new Error('Missing prop');
    }

    const containerRect = containerEl.getBoundingClientRect();
    const mouseInnerPosition = {
      x: event.nativeEvent.clientX - containerRect.x,
      y: event.nativeEvent.clientY - containerRect.y,
    };
    const size = { height: containerRect.height, width: containerRect.width };

    onMouseDown(
      index,
      { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY },
      mouseInnerPosition,
      size,
    );
  };

  return (
    <div
      className={classNames(
        styles.container,
        position != null && styles.moving,
      )}
      onMouseDown={onMouseDown != null ? handleMouseDown : undefined}
      ref={containerRef}
      style={getStyle()}
    >
      {children}
    </div>
  );
}

export type Type = typeof DraggableListItem;
export default DraggableListItem;
