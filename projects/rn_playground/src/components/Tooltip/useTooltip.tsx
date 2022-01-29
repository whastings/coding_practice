import React, { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';
import Tooltip from './Tooltip';

interface Result {
  toggleTooltip: () => void;
  tooltip: React.ReactElement | null;
  triggerProps: { onLayout: (event: LayoutChangeEvent) => void };
}

function useTooltip(contents: React.ReactElement): Result {
  const [isOpen, setIsOpen] = useState(false);
  const triggerLayoutRef = useRef<LayoutRectangle | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

  const handleTooltipLayout = useCallback((event: LayoutChangeEvent) => {
    const triggerLayout = triggerLayoutRef.current;
    if (triggerLayout == null) {
      throw new Error('Trigger layout not available');
    }

    const tooltipLayout = event.nativeEvent.layout;
    const left =
      triggerLayout.x + triggerLayout.width / 2 - tooltipLayout.width / 2;
    const top = triggerLayout.y - 5 - tooltipLayout.height;

    setTooltipPosition({ left, top });
  }, []);

  const handleTriggerLayout = useCallback((event: LayoutChangeEvent) => {
    triggerLayoutRef.current = event.nativeEvent.layout;
  }, []);

  const toggleTooltip = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const tooltip = isOpen ? (
    <Tooltip onLayout={handleTooltipLayout} {...tooltipPosition}>
      {contents}
    </Tooltip>
  ) : null;

  return {
    toggleTooltip,
    tooltip,
    triggerProps: { onLayout: handleTriggerLayout },
  };
}

export default useTooltip;
