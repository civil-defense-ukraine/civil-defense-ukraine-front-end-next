'use client';

import { MenuContext } from '@/components/context/MenuContext';
import { useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu } from '../Menu/Menu';

export const MenuManager = () => {
  const { showMenu } = useContext(MenuContext);
  const [isClient, setIsClient] = useState(false);

  // This effect runs once after the component mounts to ensure we're in the client environment
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Ensure this runs only on the client-side

  return showMenu ? createPortal(<Menu />, document.body) : null;
};
