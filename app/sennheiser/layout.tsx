import BrandThemeProvider from '@/components/BrandThemeObserver';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  icons: {
    icon: '/images/favicons/sennheiser-icon.ico', 
  },
  title: "Metan Teknik | Sennheiser Pro Audio Türkiye Distribütörü",
};

export default function SennheiserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html { background-color: #057cc3 !important; }
      `}} />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}