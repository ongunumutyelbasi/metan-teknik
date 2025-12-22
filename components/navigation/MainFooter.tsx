"use client";

import { usePathname } from 'next/navigation';
import MetanFooter from './footers/MetanFooter';
import SennheiserFooter from './footers/SennheiserFooter';
import NeumannFooter from './footers/NeumannFooter';
import MergingFooter from './footers/MergingFooter';

export default function MainFooter() {
  const pathname = usePathname();

  if (pathname.startsWith('/sennheiser')) return <SennheiserFooter />;
  if (pathname.startsWith('/neumann')) return <NeumannFooter />;
  if (pathname.startsWith('/merging')) return <MergingFooter />;
  
  return <MetanFooter />;
}