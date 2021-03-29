import { useReducer } from 'react';
import { Position, Size } from './DraggableListType';

interface MovingItemState {
  index: number | null;
  mouseAnchorPosition: Position | null;
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
      if (state.mouseAnchorPosition == null) {
        throw new Error('Missing mouse anchor position in state');
      }
      return {
        ...state,
        position: getPosition(action.mousePosition, state.mouseAnchorPosition),
      };
    case ActionType.START_MOVING:
      return {
        index: action.index,
        mouseAnchorPosition: action.mouseAnchorPosition,
        position: getPosition(action.mousePosition, action.mouseAnchorPosition),
        size: action.size,
      };
    case ActionType.STOP_MOVING:
      return {
        index: null,
        mouseAnchorPosition: null,
        position: null,
        size: null,
      };
  }
}

export function useMovingItemState() {
  return useReducer(reducer, initialState);
}
