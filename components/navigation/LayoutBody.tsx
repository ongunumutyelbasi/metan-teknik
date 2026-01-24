'use client';

import { usePathname } from 'next/navigation';
import MainHeader from "./MainHeader"; 
import MainFooter from "./MainFooter";
import BrandThemeObserver from "@/components/BrandThemeObserver";

export default function LayoutBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide header/footer if the path is exactly /login or starts with /admin
  const isExcludedPage = pathname === '/login' || pathname?.startsWith('/admin');

  return (
    <body className="antialiased min-h-screen flex flex-col font-sans">
      <BrandThemeObserver />
      {!isExcludedPage && <MainHeader />}
      <main className="flex-grow">
        {children}
      </main>
      {!isExcludedPage && <MainFooter />}
    </body>
  );
}