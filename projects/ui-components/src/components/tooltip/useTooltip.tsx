import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const triggerRef: TriggerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const getRenderedTooltip = () => {
    if (!isVisible) {
      return null;
    }

    return createPortal(
      <div style={{ position: 'absolute' }}>{contents}</div>,
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
    triggerRef,
  };
}

export default useTooltip;
