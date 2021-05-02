import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactElement[];
  direction: 'horizontal' | 'vertical';
  onNavigate?: (activeItemIndex: number) => void;
  shouldFocusOnMount?: boolean;
}

function KeyboardNavigableList({
  children,
  direction,
  onNavigate,
  shouldFocusOnMount = false,
}: Props) {
  const hasMountedRef = useRef(false);
  const listItemsRef = useRef<HTMLElement[]>([]);

  const addItemRef = (element: HTMLElement, index: number): void => {
    listItemsRef.current[index] = element;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const nextKey = direction === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    const prevKey = direction === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    if (event.key !== nextKey && event.key !== prevKey) {
      return;
    }

    const listItems = listItemsRef.current;
    const focusedItemIndex = listItems.findIndex(
      (item) => item === document.activeElement,
    );

    if (focusedItemIndex != null) {
      let indexToFocus =
        event.key === nextKey ? focusedItemIndex + 1 : focusedItemIndex - 1;
      if (indexToFocus >= listItems.length) {
        indexToFocus = 0;
      } else if (indexToFocus < 0) {
        indexToFocus = listItems.length - 1;
      }
      listItems[indexToFocus].focus();
      if (onNavigate != null) {
        onNavigate(indexToFocus);
      }
    }
  };

  useEffect(() => {
    if (!hasMountedRef.current && shouldFocusOnMount) {
      const firstElement = listItemsRef.current[0];
      firstElement.focus();
      hasMountedRef.current = true;
    }
  });

  return (
    <div onKeyDown={handleKeyDown} style={{ display: 'contents' }}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ref: (el: HTMLElement) => addItemRef(el, i),
        }),
      )}
    </div>
  );
}

export default KeyboardNavigableList;
