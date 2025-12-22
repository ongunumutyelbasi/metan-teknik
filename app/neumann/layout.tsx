import BrandThemeProvider from '@/components/BrandThemeObserver';

export default function NeumannLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ "--brand-bg": "#ef7622" } as React.CSSProperties}>
      {children}
    </div>
  );
}