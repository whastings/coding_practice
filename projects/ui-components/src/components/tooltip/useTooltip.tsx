import { createPortal } from 'react-dom';

import Tooltip from './Tooltip';
import useAnchoredPosition, {
  AnchorAlignment,
  AnchorPoint,
} from '../../utils/useAnchoredPosition';
import useTooltipReducer, {
  ActionType,
  InteractionType,
  Status,
} from './useTooltipReducer';

interface Options {
  anchorPoint?: AnchorPoint;
}

interface EventHandlers {
  onBlur: () => void;
  onFocus: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

type TriggerRef = React.MutableRefObject<HTMLButtonElement | null>;

interface Result {
  tooltipRenderer: React.ReactElement | null;
  triggerEventHandlers: EventHandlers;
  triggerRef: TriggerRef;
}

const INTERACTION_DELAY = 100;

function useTooltip(
  contents: React.ReactElement,
  { anchorPoint = AnchorPoint.TOP }: Options = {},
): Result {
  const [state, dispatch] = useTooltipReducer();
  const isOpen =
    state.status === Status.OPEN || state.status === Status.CLOSING;
  const {
    anchorPoint: renderedAnchorPoint,
    anchorRef,
    position,
    positionedRef,
  } = useAnchoredPosition<HTMLButtonElement, HTMLDivElement>({
    anchorAlignment: AnchorAlignment.CENTER,
    anchorPoint,
    isRendered: isOpen,
  });

  const getRenderedTooltip = () => {
    if (!isOpen) {
      return null;
    }

    return createPortal(
      <div ref={positionedRef} style={{ ...position, position: 'absolute' }}>
        <Tooltip anchorPoint={renderedAnchorPoint}>{contents}</Tooltip>
      </div>,
      document.body,
    );
  };

  const open = () => {
    dispatch({ type: ActionType.OPEN });
  };

  const close = () => {
    dispatch({ type: ActionType.CLOSE });
  };

  const scheduleOpen = (interactionType: InteractionType) => {
    if (
      state.interactionType != null &&
      state.interactionType !== interactionType
    ) {
      return;
    }

    switch (state.status) {
      case Status.CLOSED:
        const timerID = window.setTimeout(open, INTERACTION_DELAY);
        dispatch({ interactionType, timerID, type: ActionType.SCHEDULE_OPEN });
        break;
      case Status.CLOSING:
        if (state.timerID) {
          window.clearTimeout(state.timerID);
        }
        open();
        break;
      default:
        return;
    }
  };

  const scheduleClose = (interactionType: InteractionType) => {
    if (
      state.interactionType != null &&
      state.interactionType !== interactionType
    ) {
      return;
    }

    switch (state.status) {
      case Status.OPEN:
        const timerID = window.setTimeout(close, INTERACTION_DELAY);
        dispatch({ timerID, type: ActionType.SCHEDULE_CLOSE });
        break;
      case Status.OPENING:
        if (state.timerID) {
          window.clearTimeout(state.timerID);
        }
        close();
        break;
      default:
        return;
    }
  };

  const eventHandlers: EventHandlers = {
    onBlur: () => {
      scheduleClose(InteractionType.KEYBOARD);
    },
    onFocus: () => {
      scheduleOpen(InteractionType.KEYBOARD);
    },
    onMouseOver: () => {
      scheduleOpen(InteractionType.MOUSE);
    },
    onMouseOut: () => {
      scheduleClose(InteractionType.MOUSE);
    },
  };

  return {
    tooltipRenderer: getRenderedTooltip(),
    triggerEventHandlers: eventHandlers,
    triggerRef: anchorRef,
  };
}

export default useTooltip;
