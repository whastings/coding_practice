import React, { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactElement[];
}

function KeyboardNavigableList({ children }: Props) {
  const hasMountedRef = useRef(false);
  const listItemsRef = useRef<HTMLElement[]>([]);

  const addItemRef = (element: HTMLElement, index: number): void => {
    listItemsRef.current[index] = element;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    const listItems = listItemsRef.current;
    const focusedItemIndex = listItems.findIndex(
      (item) => item === document.activeElement,
    );

    if (focusedItemIndex != null) {
      let indexToFocus =
        event.key === 'ArrowDown' ? focusedItemIndex + 1 : focusedItemIndex - 1;
      if (indexToFocus >= listItems.length) {
        indexToFocus = 0;
      } else if (indexToFocus < 0) {
        indexToFocus = listItems.length - 1;
      }
      listItems[indexToFocus].focus();
    }
  };

  useEffect(() => {
    if (!hasMountedRef.current) {
      const firstElement = listItemsRef.current[0];
      firstElement.focus();
      hasMountedRef.current = true;
    }
  });

  return (
    <div onKeyDown={handleKeyDown}>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          ref: (el: HTMLElement) => addItemRef(el, i),
        }),
      )}
    </div>
  );
}

export default KeyboardNavigableList;
