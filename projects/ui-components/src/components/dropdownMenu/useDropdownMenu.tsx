import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import getDocumentRelativeRect from '../../utils/getDocumentRelativeRect';

type TriggerRef = React.MutableRefObject<HTMLButtonElement | null>;

interface MenuPosition {
  left: number;
  top: number;
}

interface Result {
  menuRenderer: React.ReactElement | null;
  toggleMenu: () => void;
  triggerRef: TriggerRef;
}

const MENU_OFFSET = 5;

function getMenuPosition(triggerEl: HTMLButtonElement): MenuPosition {
  const triggerRect = getDocumentRelativeRect(
    triggerEl.getBoundingClientRect(),
  );
  return { left: triggerRect.left, top: triggerRect.bottom + MENU_OFFSET };
}

function useDropdownMenu(menu: React.ReactElement): Result {
  const triggerRef: TriggerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    left: 0,
    top: 0,
  });

  const toggleMenu = useCallback(() => setIsMenuOpen((value) => !value), []);

  const getRenderedMenu = () => {
    return createPortal(
      <div style={{ ...menuPosition, position: 'absolute' }}>{menu}</div>,
      document.body,
    );
  };

  useEffect(() => {
    if (isMenuOpen) {
      if (triggerRef.current == null) {
        throw new Error('Trigger ref is not set');
      }
      setMenuPosition(getMenuPosition(triggerRef.current));
    }
  }, [isMenuOpen]);

  const menuRenderer = isMenuOpen ? getRenderedMenu() : null;

  return { menuRenderer, toggleMenu, triggerRef };
}

export default useDropdownMenu;
