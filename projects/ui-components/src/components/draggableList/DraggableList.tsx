import React, { useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

import styles from './DraggableList.module.css';
import { Type as DraggableListItemType } from './DraggableListItem';
import { Position, Size } from './DraggableListType';
import { ActionType, useMovingItemState } from './movingItemState';
import DraggableListPlaceholder from './DraggableListPlaceholder';

type ChildType = React.ReactComponentElement<DraggableListItemType>;

interface Props {
  children: ChildType[];
}

function DraggableList({ children }: Props) {
  const [movingItemState, dispatch] = useMovingItemState();

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
  }, [dispatch]);

  useEffect(() => {
    if (movingItemState.index != null) {
      document.body.addEventListener('mousemove', handleMouseMove);
      document.body.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp, movingItemState]);

  const listItems = useMemo(() => {
    const items = React.Children.map<React.ReactElement | null, ChildType>(
      children,
      (child, i) => {
        if (i === movingItemState.index) {
          return null;
        }

        return React.cloneElement(child, {
          index: i,
          onMouseDown: handleItemMouseDown,
        });
      },
    );

    if (
      movingItemState.placeholderIndex != null &&
      movingItemState.size != null
    ) {
      items.splice(
        movingItemState.placeholderIndex,
        0,
        <DraggableListPlaceholder size={movingItemState.size} />,
      );
    }

    return items.filter(Boolean);
  }, [children, handleItemMouseDown, movingItemState]);

  const movingItem =
    movingItemState.index != null && movingItemState.position != null
      ? ReactDOM.createPortal(
          React.cloneElement(children[movingItemState.index], {
            position: movingItemState.position,
            size: movingItemState.size ?? undefined,
          }),
          document.body,
        )
      : null;

  return (
    <div className={styles.container}>
      {listItems}
      {movingItem}
    </div>
  );
}

export default DraggableList;
