import React, { useRef } from 'react';
import isNullOrUndefined from '../utils/isNullOrUndefined';

interface Props {
  children: React.ReactChild;
}

const TABBABLE_SELECTOR = `
  input, button, textarea, select,
  a[href],
  [tabindex]
`;

function getTabbableElements(containerEl: HTMLElement): HTMLElement[] {
  const tabbableElements = Array.from(
    containerEl.querySelectorAll(TABBABLE_SELECTOR),
  );

  return tabbableElements
    .map((element) => (element instanceof HTMLElement ? element : null))
    .filter(isNullOrUndefined)
    .filter((element) => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex === '-1') {
        return false;
      }

      return true;
    });
}

function FocusContainer({ children }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (containerRef.current == null) {
      throw new Error('Container ref not set!');
    }
    const tabbableElements = getTabbableElements(containerRef.current);
    const { key, target } = event;
    if (key !== 'Tab' || !(target instanceof HTMLElement)) {
      return;
    }

    const lastTabbableElement = tabbableElements[tabbableElements.length - 1];
    const firstTabbableElement = tabbableElements[0];
    if (!event.shiftKey && target === lastTabbableElement) {
      event.preventDefault();
      firstTabbableElement.focus();
    } else if (event.shiftKey && target === firstTabbableElement) {
      event.preventDefault();
      lastTabbableElement.focus();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} ref={containerRef}>
      {children}
    </div>
  );
}

export default FocusContainer;
