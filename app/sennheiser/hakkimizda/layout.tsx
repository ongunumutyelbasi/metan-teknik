// app/sennheiser/hakkimizda/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda | Metan Teknik | Sennheiser Pro Audio Türkiye Distribütörü',
  description: 'Sennheiser Türkiye yetkili distribütörü iletişim bilgileri.'
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}