import { useState } from 'react';
import { createPortal } from 'react-dom';

import useAnchoredPosition, {
  AnchorPoint,
} from '../../utils/useAnchoredPosition';

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

function useTooltip(contents: React.ReactElement): Result {
  const [isVisible, setIsVisible] = useState(false);
  const { anchorRef, position, positionedRef } = useAnchoredPosition<
    HTMLButtonElement,
    HTMLDivElement
  >({
    anchorPoint: AnchorPoint.TOP,
  });

  const getRenderedTooltip = () => {
    if (!isVisible) {
      return null;
    }

    return createPortal(
      <div ref={positionedRef} style={{ ...position, position: 'absolute' }}>
        {contents}
      </div>,
      document.body,
    );
  };

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const eventHandlers: EventHandlers = {
    onBlur: hideTooltip,
    onFocus: showTooltip,
    onMouseOver: showTooltip,
    onMouseOut: hideTooltip,
  };

  return {
    tooltipRenderer: getRenderedTooltip(),
    triggerEventHandlers: eventHandlers,
    triggerRef: anchorRef,
  };
}

export default useTooltip;
