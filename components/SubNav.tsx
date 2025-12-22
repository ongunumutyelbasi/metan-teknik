"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubNavLink {
  name: string;
  href: string;
}

interface SubNavProps {
  links: SubNavLink[];
}

export default function SubNav({ links }: SubNavProps) {
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If user clicks the link of the current page, scroll to top
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-[66px] w-full px-4 z-40 pointer-events-none">
      <div className="max-w-full mx-auto flex items-center">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-4 pointer-events-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 whitespace-nowrap bg-white/80 backdrop-blur-md text-[#5d5b5c] border border-gray-200 hover:bg-brand-blue hover:text-white hover:border-brand-blue"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}