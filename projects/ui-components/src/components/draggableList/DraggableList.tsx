import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';

import styles from './DraggableList.module.css';
import DraggableListItem from './DraggableListItem';
import { Position, Size } from './DraggableListType';
import { ActionType, useMovingItemState } from './movingItemState';
import DraggableListPlaceholder from './DraggableListPlaceholder';
import {
  getDocumentRelativeRect,
  getNewPlaceholderIndex,
} from './DraggableListUtils';

interface Props<T> {
  list: T[];
  onUpdateList: (newList: T[]) => void;
  renderItem: (item: T) => React.ReactChildren | string;
}

function DraggableList<T>({ list, onUpdateList, renderItem }: Props<T>) {
  const [movingItemState, dispatch] = useMovingItemState();
  const listElementsRef = useRef<Array<HTMLDivElement | null>>([]);
  const listElementRectsRef = useRef(new Map<number, DOMRect>());

  const handleItemMouseDown = useCallback(
    (
      index: number,
      mousePosition: Position,
      mouseAnchorPosition: Position,
      size: Size,
    ) => {
      dispatch({
        index,
        mouseAnchorPosition,
        mousePosition,
        size,
        type: ActionType.START_MOVING,
      });
    },
    [dispatch],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      dispatch({
        mousePosition: { x: event.pageX, y: event.pageY },
        type: ActionType.MOVE,
      });
    },
    [dispatch],
  );

  const handleMouseUp = useCallback(() => {
    dispatch({ type: ActionType.STOP_MOVING });

    const index = movingItemState.index;
    const placeholderIndex = movingItemState.placeholderIndex;
    if (index == null || placeholderIndex == null) {
      throw new Error('Missing state');
    }
    const movedListItem = list[index];
    const updatedList = list.slice();
    updatedList.splice(placeholderIndex, 0, movedListItem);
    const indexToRemove = placeholderIndex < index ? index + 1 : index;
    updatedList.splice(indexToRemove, 1);
    onUpdateList(updatedList);
  }, [
    dispatch,
    list,
    movingItemState.index,
    movingItemState.placeholderIndex,
    onUpdateList,
  ]);

  useEffect(() => {
    if (movingItemState.index != null) {
      document.body.addEventListener('mousemove', handleMouseMove);
      document.body.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, movingItemState.index]);

  useEffect(() => {
    listElementsRef.current.forEach((element, i) => {
      if (element != null) {
        listElementRectsRef.current.set(
          i,
          getDocumentRelativeRect(element.getBoundingClientRect()),
        );
      }
    });
  }, [movingItemState.placeholderIndex]);

  useEffect(() => {
    if (
      movingItemState.placeholderIndex != null &&
      movingItemState.position != null &&
      movingItemState.size != null
    ) {
      const newPlaceholderIndex = getNewPlaceholderIndex(
        listElementsRef.current,
        listElementRectsRef.current,
        movingItemState.position,
        movingItemState.size,
        movingItemState.placeholderIndex,
      );
      if (newPlaceholderIndex != null) {
        dispatch({
          index: newPlaceholderIndex,
          type: ActionType.MOVE_PLACEHOLDER,
        });
      }
    }
  }, [
    dispatch,
    movingItemState.placeholderIndex,
    movingItemState.position,
    movingItemState.size,
  ]);

  const renderedList = useMemo(() => {
    const items = list.map((item, i) => {
      if (i === movingItemState.index) {
        listElementsRef.current[i] = null;
        return null;
      }

      return (
        <div
          key={i}
          ref={(el) => {
            if (el != null) {
              listElementsRef.current[i] = el;
            }
          }}
        >
          <DraggableListItem index={i} onMouseDown={handleItemMouseDown}>
            {renderItem(item)}
          </DraggableListItem>
        </div>
      );
    });

    if (
      movingItemState.placeholderIndex != null &&
      movingItemState.size != null
    ) {
      items.splice(
        movingItemState.placeholderIndex,
        0,
        <DraggableListPlaceholder
          key="placeholder"
          size={movingItemState.size}
        />,
      );
    }

    return items.filter(Boolean);
  }, [
    handleItemMouseDown,
    list,
    movingItemState.index,
    movingItemState.placeholderIndex,
    movingItemState.size,
    renderItem,
  ]);

  const movingItem =
    movingItemState.index != null && movingItemState.position != null
      ? ReactDOM.createPortal(
          <DraggableListItem
            position={movingItemState.position}
            size={movingItemState.size ?? undefined}
          >
            {renderItem(list[movingItemState.index])}
          </DraggableListItem>,
          document.body,
        )
      : null;

  return (
    <div className={styles.container}>
      {renderedList}
      {movingItem}
    </div>
  );
}

export default DraggableList;
