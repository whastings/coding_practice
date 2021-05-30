import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DropdownMenuContextProvider } from './DropdownMenuContext';
import { useUniqueID } from '../../utils/uniqueID/UniqueIDContext';
import mergeRefs from '../../utils/mergeRefs';
import useOnOutsideClick from '../../utils/useOnOutsideClick';
import useAnchoredPosition, {
  AnchorPoint,
} from '../../utils/useAnchoredPosition';

type TriggerRef = React.MutableRefObject<HTMLButtonElement | null>;

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

function useDropdownMenu(menu: React.ReactElement): Result {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { anchorRef, position, positionedRef } = useAnchoredPosition<
    HTMLButtonElement,
    HTMLDivElement
  >({
    anchorPoint: AnchorPoint.BOTTOM,
    isRendered: isMenuOpen,
    offset: MENU_OFFSET,
  });
  const focusTriggerRef = useRef(false);
  const outsideClickRef = useOnOutsideClick((node) => {
    if (node !== anchorRef.current) {
      setIsMenuOpen(false);
    }
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
