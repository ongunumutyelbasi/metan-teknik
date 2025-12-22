"use client";

import { usePathname } from 'next/navigation';
import MetanHeader from './headers/MetanHeader';
import SennheiserHeader from './headers/SennheiserHeader';
import NeumannHeader from './headers/NeumannHeader';
import MergingHeader from './headers/MergingHeader';

export default function MainHeader() {
  const pathname = usePathname() || ""; // Fallback to empty string
  const lowerPath = pathname.toLowerCase();

  if (lowerPath.startsWith('/sennheiser')) return <SennheiserHeader />;
  if (lowerPath.startsWith('/neumann')) return <NeumannHeader />;
  if (lowerPath.startsWith('/merging')) return <MergingHeader />;

  return <MetanHeader />;
}