'use client';
import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure this runs only on the client

    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    setIsMobile(window.innerWidth < breakpoint); // Initialize state on the client
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mql.addEventListener('change', onChange);

    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}
