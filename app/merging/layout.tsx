import BrandThemeProvider from '@/components/BrandThemeObserver';

export default function NeumannLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ "--brand-bg": "#e30613" } as React.CSSProperties}>
      {children}
    </div>
  );
}