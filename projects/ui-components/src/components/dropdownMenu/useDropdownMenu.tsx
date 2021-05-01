import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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

function getMenuPosition(triggerEl: HTMLButtonElement): MenuPosition {
  const triggerRect = getDocumentRelativeRect(
    triggerEl.getBoundingClientRect(),
  );
  return { left: triggerRect.left, top: triggerRect.bottom + MENU_OFFSET };
}

function useDropdownMenu(menu: React.ReactElement): Result {
  const triggerRef: TriggerRef = useRef(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const toggleMenu = useCallback(() => setIsMenuOpen((value) => !value), []);

  const getRenderedMenu = () => {
    return createPortal(
      <div ref={containerRef} style={{ ...menuPosition, position: 'absolute' }}>
        {menu}
      </div>,
      document.body,
    );
  };

  useEffect(() => {
    if (isMenuOpen) {
      if (triggerRef.current == null) {
        throw new Error('Trigger ref is not set');
      }
      setMenuPosition(getMenuPosition(triggerRef.current));
    } else {
      setMenuPosition(null);
    }
  }, [isMenuOpen]);

  useLayoutEffect(() => {
    if (menuPosition != null) {
      if (containerRef.current == null || triggerRef.current == null) {
        throw new Error('Missing container or trigger ref!');
      }

      const newPosition = getFlippedPosition(
        containerRef.current,
        triggerRef.current,
      );

      if (newPosition != null) {
        setMenuPosition(newPosition);
      }
    }
  }, [menuPosition]);

  const menuRenderer = isMenuOpen ? getRenderedMenu() : null;

  return { menuRenderer, toggleMenu, triggerRef };
}

export default useDropdownMenu;
