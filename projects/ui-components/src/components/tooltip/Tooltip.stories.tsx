import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import useTooltip from './useTooltip';

export default {
  title: 'Components/Tooltip',
} as Meta;

function ButtonWithTooltip() {
  const { tooltipRenderer, triggerEventHandlers, triggerRef } = useTooltip(
    <div>I am a tooltip......</div>,
  );
  return (
    <>
      <button {...triggerEventHandlers} ref={triggerRef}>
        Trigger Tooltip
      </button>
      {tooltipRenderer}
    </>
  );
}

export function Vertical() {
  return (
    <div
      style={{
        display: 'flex',
        height: 300,
        justifyContent: 'center',
        marginBottom: '100vh',
      }}
    >
      <div style={{ alignSelf: 'flex-end' }}>
        <ButtonWithTooltip />
      </div>
      <div style={{ alignSelf: 'flex-start' }}>
        <ButtonWithTooltip />
      </div>
    </div>
  );
}
