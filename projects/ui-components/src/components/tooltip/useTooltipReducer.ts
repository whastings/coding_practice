import { useReducer } from 'react';

export enum InteractionType {
  KEYBOARD,
  MOUSE,
}

export enum Status {
  CLOSED,
  CLOSING,
  OPEN,
  OPENING,
}

interface TooltipState {
  interactionType: InteractionType | null;
  status: Status;
  timerID: number | null;
}

export enum ActionType {
  CLOSE,
  OPEN,
  SCHEDULE_CLOSE,
  SCHEDULE_OPEN,
}

interface CloseAction {
  type: ActionType.CLOSE;
}

interface OpenAction {
  type: ActionType.OPEN;
}

interface ScheduleCloseAction {
  type: ActionType.SCHEDULE_CLOSE;
  timerID: number;
}

interface ScheduleOpenAction {
  interactionType: InteractionType;
  type: ActionType.SCHEDULE_OPEN;
  timerID: number;
}

type Action =
  | CloseAction
  | OpenAction
  | ScheduleCloseAction
  | ScheduleOpenAction;

function reducer(state: TooltipState, action: Action): TooltipState {
  switch (action.type) {
    case ActionType.CLOSE:
      return {
        interactionType: null,
        status: Status.CLOSED,
        timerID: null,
      };
    case ActionType.OPEN:
      return {
        ...state,
        status: Status.OPEN,
        timerID: null,
      };
    case ActionType.SCHEDULE_CLOSE:
      return {
        ...state,
        status: Status.CLOSING,
        timerID: action.timerID,
      };
    case ActionType.SCHEDULE_OPEN:
      return {
        interactionType: action.interactionType,
        status: Status.OPENING,
        timerID: action.timerID,
      };
  }
}

function useTooltipReducer() {
  return useReducer(reducer, {
    interactionType: null,
    status: Status.CLOSED,
    timerID: null,
  });
}

export default useTooltipReducer;
