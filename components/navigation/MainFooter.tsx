"use client";

import { usePathname } from 'next/navigation';
import MetanFooter from './footers/MetanFooter';
import SennheiserFooter from './footers/SennheiserFooter';
import NeumannFooter from './footers/NeumannFooter';
import MergingFooter from './footers/MergingFooter';

export default function MainFooter() {
  const pathname = usePathname() || "";
  const lowerPath = pathname.toLowerCase();

  // 1. Check for admin path first to prevent any header from rendering
  if (lowerPath.startsWith('/admin')) return null;

  // 2. Brand specific headers
  if (lowerPath.startsWith('/sennheiser')) return <SennheiserFooter />;
  if (lowerPath.startsWith('/neumann')) return <NeumannFooter />;
  if (lowerPath.startsWith('/merging')) return <MergingFooter />;

  // 3. Default fallback
  return <MetanFooter />;
}