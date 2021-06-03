import { useState } from 'react';
import { createPortal } from 'react-dom';

import Tooltip from './Tooltip';
import useAnchoredPosition, {
  AnchorAlignment,
  AnchorPoint,
} from '../../utils/useAnchoredPosition';

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

function useTooltip(
  contents: React.ReactElement,
  { anchorPoint = AnchorPoint.TOP }: Options = {},
): Result {
  const [isVisible, setIsVisible] = useState(false);
  const {
    anchorPoint: renderedAnchorPoint,
    anchorRef,
    position,
    positionedRef,
  } = useAnchoredPosition<HTMLButtonElement, HTMLDivElement>({
    anchorAlignment: AnchorAlignment.CENTER,
    anchorPoint,
    isRendered: isVisible,
  });

  const getRenderedTooltip = () => {
    if (!isVisible) {
      return null;
    }

    return createPortal(
      <div ref={positionedRef} style={{ ...position, position: 'absolute' }}>
        <Tooltip anchorPoint={renderedAnchorPoint}>{contents}</Tooltip>
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
