import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DropdownMenuContextProvider } from './DropdownMenuContext';
import getDocumentRelativeRect from '../../utils/getDocumentRelativeRect';
import { useUniqueID } from '../../utils/uniqueID/UniqueIDContext';
import mergeRefs from '../../utils/mergeRefs';
import useOnOutsideClick from '../../utils/useOnOutsideClick';
import useAnchoredPosition, {
  AnchorPoint,
} from '../../utils/useAnchoredPosition';

type TriggerRef = React.MutableRefObject<HTMLButtonElement | null>;

interface MenuPosition {
  left: number;
  top: number;
}

interface TriggerProps {
  'aria-controls': string;
  'aria-expanded'?: true;
  'aria-haspopup': true;
  id: string;
}

interface Result {
  menuRenderer: React.ReactElement | null;
  toggleMenu: () => void;
  triggerProps: TriggerProps;
  triggerRef: TriggerRef;
}

const MENU_OFFSET = 5;

function getFlippedPosition(
  containerEl: HTMLDivElement,
  triggerEl: HTMLButtonElement,
): MenuPosition | null {
  const containerRect = containerEl.getBoundingClientRect();
  if (containerRect.bottom < window.innerHeight) {
    return null;
  }

  const triggerRect = getDocumentRelativeRect(
    triggerEl.getBoundingClientRect(),
  );
  return {
    left: triggerRect.left,
    top: triggerRect.top - MENU_OFFSET - containerRect.height,
  };
}

function useDropdownMenu(menu: React.ReactElement): Result {
  const { anchorRef, position, positionedRef } = useAnchoredPosition<
    HTMLButtonElement,
    HTMLDivElement
  >({
    anchorPoint: AnchorPoint.BOTTOM,
    offset: MENU_OFFSET,
  });
  const focusTriggerRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const outsideClickRef = useOnOutsideClick(() => {
    setIsMenuOpen(false);
  });
  const triggerID = useUniqueID();
  const menuID = useUniqueID();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((value) => {
      if (value) {
        focusTriggerRef.current = true;
      }
      return !value;
    });
  }, []);

  const getRenderedMenu = () => {
    return createPortal(
      <DropdownMenuContextProvider
        menuID={menuID}
        onItemActivate={toggleMenu}
        triggerID={triggerID}
      >
        <div
          ref={mergeRefs(positionedRef, outsideClickRef)}
          style={{ ...position, position: 'absolute' }}
        >
          {menu}
        </div>
      </DropdownMenuContextProvider>,
      document.body,
    );
  };

  const getTriggerProps = () => {
    const triggerProps: TriggerProps = {
      'aria-controls': menuID,
      'aria-haspopup': true,
      id: triggerID,
    };
    if (isMenuOpen) {
      triggerProps['aria-expanded'] = true;
    }
    return triggerProps;
  };

  useEffect(() => {
    if (focusTriggerRef.current && anchorRef.current) {
      anchorRef.current.focus();
      focusTriggerRef.current = false;
    }
  });

  const menuRenderer = isMenuOpen ? getRenderedMenu() : null;

  return {
    menuRenderer,
    toggleMenu,
    triggerProps: getTriggerProps(),
    triggerRef: anchorRef,
  };
}

export default useDropdownMenu;
