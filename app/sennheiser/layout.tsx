import BrandThemeProvider from '@/components/BrandThemeObserver';

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