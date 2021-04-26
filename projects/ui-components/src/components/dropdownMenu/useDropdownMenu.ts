import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TriggerRef = React.MutableRefObject<HTMLButtonElement | null>;

interface Result {
  menuRenderer: React.ReactElement | null;
  toggleMenu: () => void;
  triggerRef: TriggerRef;
}

function useDropdownMenu(menu: React.ReactElement): Result {
  const triggerRef: TriggerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen((value) => !value), []);
  const menuRenderer = isMenuOpen ? createPortal(menu, document.body) : null;

  return { menuRenderer, toggleMenu, triggerRef };
}

export default useDropdownMenu;
