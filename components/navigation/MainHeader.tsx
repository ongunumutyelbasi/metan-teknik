"use client";

import { usePathname } from 'next/navigation';
import MetanHeader from './headers/MetanHeader';
import SennheiserHeader from './headers/SennheiserHeader';
import NeumannHeader from './headers/NeumannHeader';
import MergingHeader from './headers/MergingHeader';

export default function MainHeader() {
  const pathname = usePathname() || "";
  const lowerPath = pathname.toLowerCase();

  // 1. Check for admin path first to prevent any header from rendering
  if (lowerPath.startsWith('/admin')) return null;

  // 2. Brand specific headers
  if (lowerPath.startsWith('/sennheiser')) return <SennheiserHeader />;
  if (lowerPath.startsWith('/neumann')) return <NeumannHeader />;
  if (lowerPath.startsWith('/merging')) return <MergingHeader />;

  // 3. Default fallback
  return <MetanHeader />;
}