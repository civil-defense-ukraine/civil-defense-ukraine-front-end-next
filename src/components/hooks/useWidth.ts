'use client';

import { useEffect, useState } from 'react';

export const useWidth = () => {
  const [width, setWidth] = useState<number>(1440);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(document.documentElement.clientWidth);
    };

    // Initialize width on mount
    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return width;
};
