import { useReducer } from 'react';
import { Position, Size } from './DraggableListType';

interface MovingItemState {
  index: number | null;
  mouseAnchorPosition: Position | null;
  placeholderIndex: number | null;
  position: Position | null;
  size: Size | null;
}

export enum ActionType {
  MOVE = 'move',
  START_MOVING = 'start_moving',
  STOP_MOVING = 'stop_moving',
}

interface MoveAction {
  mousePosition: Position;
  type: ActionType.MOVE;
}

interface StartMovingAction {
  index: number;
  mouseAnchorPosition: Position;
  mousePosition: Position;
  size: Size;
  type: ActionType.START_MOVING;
}

interface StopMovingAction {
  type: ActionType.STOP_MOVING;
}

type Action = MoveAction | StartMovingAction | StopMovingAction;

const initialState: MovingItemState = {
  index: null,
  mouseAnchorPosition: null,
  placeholderIndex: null,
  position: null,
  size: null,
};

const getPosition = (
  mousePosition: Position,
  mouseAnchorPosition: Position,
): Position => {
  return {
    x: mousePosition.x - mouseAnchorPosition.x,
    y: mousePosition.y - mouseAnchorPosition.y,
  };
};

function reducer(state: MovingItemState, action: Action): MovingItemState {
  switch (action.type) {
    case ActionType.MOVE:
      // Mouse move events still fire after mouse up until React re-renders,
      // so ignore those dispatches
      if (state.mouseAnchorPosition == null) {
        return state;
      }
      return {
        ...state,
        position: getPosition(action.mousePosition, state.mouseAnchorPosition),
      };
    case ActionType.START_MOVING:
      return {
        index: action.index,
        mouseAnchorPosition: action.mouseAnchorPosition,
        placeholderIndex: action.index,
        position: getPosition(action.mousePosition, action.mouseAnchorPosition),
        size: action.size,
      };
    case ActionType.STOP_MOVING:
      return {
        index: null,
        mouseAnchorPosition: null,
        placeholderIndex: null,
        position: null,
        size: null,
      };
  }
}

export function useMovingItemState() {
  return useReducer(reducer, initialState);
}
