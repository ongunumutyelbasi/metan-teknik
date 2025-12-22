"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const brandColors: Record<string, string> = {
  '/neumann': '#ef7622',
  '/sennheiser': '#057cc3',
  '/merging': '#e30613',
  'default': '#013746',
};

export default function BrandThemeObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the current path starts with one of our brand keys
    const activeBrand = Object.keys(brandColors).find(key => 
      pathname.startsWith(key)
    );
    
    const color = activeBrand ? brandColors[activeBrand] : brandColors['default'];
    
    // Apply directly to the root elements
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;

  }, [pathname]);

  return null;
}