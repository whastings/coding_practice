import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import useTooltip from './useTooltip';
import { AnchorPoint } from '../../utils/useAnchoredPosition';

export default {
  title: 'Components/Tooltip',
} as Meta;

function ButtonWithTooltip({ anchorPoint }: { anchorPoint?: AnchorPoint }) {
  const {
    tooltipRenderer,
    triggerEventHandlers,
    triggerRef,
  } = useTooltip(<div>I am a tooltip......</div>, { anchorPoint });
  return (
    <>
      <button {...triggerEventHandlers} ref={triggerRef}>
        Trigger Tooltip
      </button>
      {tooltipRenderer}
    </>
  );
}

export function Horizontal() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100px',
        justifyContent: 'space-between',
      }}
    >
      <ButtonWithTooltip anchorPoint={AnchorPoint.END} />
      <ButtonWithTooltip anchorPoint={AnchorPoint.START} />
    </div>
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
      <div style={{ alignSelf: 'flex-end' }}>
        <ButtonWithTooltip anchorPoint={AnchorPoint.BOTTOM} />
      </div>
    </div>
  );
}
