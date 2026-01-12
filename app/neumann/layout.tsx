import type { Metadata } from 'next';
import BrandThemeProvider from '@/components/BrandThemeObserver';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function NeumannLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ "--brand-bg": "#ef7622" } as React.CSSProperties}>
      {children}
    </div>
  );
}