import React, { useEffect, useRef } from 'react';

import isNullOrUndefined from './isNullOrUndefined';
import useKeyboardEvent from './keyboardEvents/useKeyboardEvent';

interface ChildArguments {
  initialFocusRef: React.RefCallback<HTMLElement>;
}

interface Props {
  children: (args: ChildArguments) => React.ReactChild;
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
  const initialFocusRef = useRef<HTMLElement | null>(null);
  const hasFocusedRef = useRef(false);

  useKeyboardEvent({
    callback: (event, container) => {
      const { target } = event;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const tabbableElements = getTabbableElements(container);
      const lastTabbableElement = tabbableElements[tabbableElements.length - 1];
      const firstTabbableElement = tabbableElements[0];
      if (!event.shiftKey && target === lastTabbableElement) {
        event.preventDefault();
        firstTabbableElement.focus();
      } else if (event.shiftKey && target === firstTabbableElement) {
        event.preventDefault();
        lastTabbableElement.focus();
      }
    },
    key: 'Tab',
  });

  useEffect(() => {
    const initialFocusEl = initialFocusRef.current;
    const hasFocused = hasFocusedRef.current;

    if (initialFocusEl != null && !hasFocused) {
      initialFocusEl.focus();
      hasFocusedRef.current = true;
    }
  }, []);

  return (
    <>
      {children({
        initialFocusRef: (el) => {
          initialFocusRef.current = el;
        },
      })}
    </>
  );
}

export default FocusContainer;
