import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import useTooltip from './useTooltip';

export default {
  title: 'Components/Tooltip',
} as Meta;

export function Vertical() {
  const { tooltipRenderer, triggerEventHandlers, triggerRef } = useTooltip(
    <div>I am a tooltip</div>,
  );

  return (
    <div>
      <button {...triggerEventHandlers} ref={triggerRef}>
        Trigger Tooltip
      </button>
      {tooltipRenderer}
    </div>
  );
}
