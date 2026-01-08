"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Helper component to handle "Scroll to Top if on same page" logic
  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href;

    return (
      <Link 
        href={href} 
        className="hover:text-brand-blue transition-colors duration-100"
        onClick={(e) => {
          if (isActive) {
            e.preventDefault();
            scrollToTop();
          }
        }}
      >
        {children}
      </Link>
    );
  };

  return (
    <footer className="bg-[#013746] text-white pt-[20px] pb-[20px] px-[20px] mt-0">
      <div className="max-w-full mx-auto">
        
        {/* --- TOP SECTION: LOGO & SCROLL BUTTON --- */}
        <div className="flex justify-between items-center pb-[125px]">
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              aria-label="Anasayfa'ya git"
              onClick={(e) => {
                if (pathname === "/sennheiser") {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
            >
                <svg 
                viewBox="0 0 148 24" 
                className="h-5 w-auto fill-white cursor-pointer hover:fill-brand-blue transition-colors duration-300"
                aria-label="Sennheiser Logo"
                >
                <path d="M79.328 4.076h2.276v11.852h-2.9l-3.376-5.452a27.436 27.436 0 01-1.07-1.967h-.033v7.42H71.94V4.075h2.678l4 6.457c.267.425.496.873.686 1.339V4.075h.023zm13.091 4.852h-3.966V4.072H85.56v11.852h2.891v-5.057h3.967v5.057h2.906V4.072h-2.906v4.856zm-42.336 1.844h3.759V8.99h-3.759V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.1zm-10.44-4a.529.529 0 01.43-.872h4.312V4.076h-5.102a2.504 2.504 0 00-1.776.662 2.535 2.535 0 00-.813 1.72c0 .694.052 1.2 1.088 2.294l3.839 4.048a.659.659 0 01-.445 1.152h-4.733v1.976h5.415a2.772 2.772 0 002.025-.78 2.804 2.804 0 00.857-2.005c0-.786-.185-1.31-1.212-2.381l-3.886-3.99zm26.068 5.085a8.629 8.629 0 00-.686-1.338l-4-6.457h-2.678v11.866h2.276V8.525h.034s.473 1.028 1.069 1.967l3.379 5.451h2.902V4.076H65.73v7.786l-.02-.005zm63.941-1.085h3.758V8.99h-3.758V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.18zm17.848 5.156h-3.147l-2.263-4.866h-1.268v4.866h-2.897V4.076h5.282c2.546 0 3.73 1.596 3.73 3.438a3.423 3.423 0 01-.627 1.97 3.38 3.38 0 01-1.645 1.24l2.835 5.204zm-3.043-8.336c0-.549-.317-1.686-1.846-1.686h-1.793v3.37h1.759c1.591 0 1.88-1.18 1.88-1.684zm-25.284-.815a.53.53 0 01.431-.87h4.312V4.074h-5.121a2.502 2.502 0 00-1.775.662 2.538 2.538 0 00-.814 1.72c0 .695.052 1.2 1.089 2.295l3.838 4.047a.655.655 0 01-.431 1.176h-4.747v1.977h5.415a2.773 2.773 0 002.026-.781 2.813 2.813 0 00.856-2.005c0-.786-.185-1.31-1.211-2.381l-3.868-4.01v.002zm-16.995 4h3.758V8.992h-3.753V5.905h5.031v-1.83h-7.932v11.852h8.017v-1.975h-5.116v-3.177h-.005v.002zm8.273 5.157h2.901V4.076h-2.901v11.858zM0 0v20h26.504V0H0zm14.587 1.843c-1.576.61-3.091 1.952-4.312 4.648-.355.78-1.023 2.29-1.325 2.966-2.457 5.424-3.716 6.59-7.422 6.59V1.5H14.52a.175.175 0 01.162.264.177.177 0 01-.095.079zM25 3.947V18.5H11.983a.175.175 0 01-.155-.265.177.177 0 01.095-.078c1.575-.61 3.09-1.952 4.31-4.648.356-.78 1.023-2.29 1.325-2.966 2.453-5.424 3.711-6.59 7.417-6.59L25 3.947z" />
                </svg>
            </Link>
          </div>
          
          <button type='button' onClick={scrollToTop} aria-label='Scroll to top' className={`inline-flex items-center justify-center shrink-0 w-[24px] h-[24px] aspect-square rounded-full bg-[#f4f4f6] text-black transition-all duration-200 ease-in-out hover:bg-[#037cc2] hover:text-white cursor-pointer`}>
            <svg width='12' height='12' viewBox='0 0 32 32' fill='currentColor'>
              <title>arrow-up</title>
              <path d='M4.076 15.659l-1.689-1.689 13.626-13.627 0.12 0.12 0.002-0.002 13.509 13.509-1.689 1.689-10.746-10.746v27.462l-2.388 0v-27.462l-10.746 10.746z'></path>
            </svg>
          </button>
        </div>

        {/* --- NAVIGATION LINKS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-6 mb-3 gap-10">
          
          <div className="space-y-[8px]">
            <h4 className="font-bold text-[#999999] text-[.65rem]">Ürünler</h4>
            <ul className="space-y-[8px] font-bold text-[.65rem] leading-[18px] text-gray-300">
              <li className="hover:text-brand-blue cursor-pointer">Aksesuarlar</li>
              <li className="hover:text-brand-blue cursor-pointer">Kulaklıklar</li>
              <li className="hover:text-brand-blue cursor-pointer">Toplantı ve Konferans Sistemleri</li>
              <li className="hover:text-brand-blue cursor-pointer">Mikrofonlar</li>
              <li className="hover:text-brand-blue cursor-pointer">Monitörler</li>
              <li className="hover:text-brand-blue cursor-pointer">Sesli Rehberlik Sistemleri</li>
              <li className="hover:text-brand-blue cursor-pointer">Kablosuz Sistemler</li>
              <li className="hover:text-brand-blue cursor-pointer">Çift Yönlü Haberleşme</li>
              <li className="hover:text-brand-blue cursor-pointer">Video Konferans Sistemleri</li>
              <li className="hover:text-brand-blue cursor-pointer">Ambeo (3 Boyutlu Ses)</li>
              <li className="hover:text-brand-blue cursor-pointer">Yazılımlar</li>
              <li className="hover:text-brand-blue cursor-pointer">Yedek Parça</li>
            </ul>
          </div>

          <div className="space-y-[8px]">
            <h4 className="font-bold text-[#999999] text-[.65rem]">Kurumsal</h4>
            <nav aria-label="Footer Navigation">
                <ul className="space-y-[8px] font-bold text-[.65rem] leading-[18px] text-white">
                    <li><FooterLink href="/hakkimizda">Hakkımızda</FooterLink></li>
                    <li><FooterLink href="/hakkimizda/bayilerimiz">Bayilerimiz</FooterLink></li>
                    <li><FooterLink href="/hakkimizda/referanslarimiz">Referanslarımız</FooterLink></li>
                    <li><FooterLink href="/hakkimizda/finans">Finans</FooterLink></li>
                    <li><FooterLink href="/hakkimizda/iletisim-bilgileri">İletişim Bilgileri</FooterLink></li>
                    <li><FooterLink href="/hakkimizda/kunye">Künye</FooterLink></li>
                </ul>
            </nav>
          </div>

          <div className="space-y-[8px]">
            <h4 className="font-bold text-[#999999] text-[.65rem]">Destek</h4>
            <ul className="space-y-[8px] font-bold text-[.65rem] leading-[18px] text-white">
              <li><FooterLink href="/teknik-servis">Teknik Servis</FooterLink></li>
              <li className="hover:text-brand-blue cursor-pointer">Servis Ücretleri</li>
              <li className="hover:text-brand-blue cursor-pointer">Müşteri Memnuniyeti</li>
            </ul>
          </div>

          <div className="space-y-[8px]">
            <h4 className="font-bold text-[#999999] text-[.65rem]">Bilgi</h4>
            <ul className="space-y-[8px] font-bold text-[.65rem] leading-[18px] text-white">
              <li className="hover:text-brand-blue cursor-pointer">Garanti Koşulları</li>
              <li className="hover:text-brand-blue cursor-pointer">Gizlilik Politikası</li>
              <li className="hover:text-brand-blue cursor-pointer">Kullanım Koşulları</li>
              <li className="hover:text-brand-blue cursor-pointer">KVKK Hakkında</li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="mt-3 pt-3 border-t border-white/20 text-[.65rem] text-white -mx-[20px] px-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-0">
            
            {/* left column: links */}
            <div className="flex space-x-6 justify-start order-2 md:order-1">
              <span className="font-bold hover:text-brand-blue cursor-pointer transition-colors">Gizlilik Politikası</span>
              <span className="font-bold hover:text-brand-blue cursor-pointer transition-colors">Yasal Uyarı</span>
            </div>

            {/* middle column: social icons */}
            <div className="flex items-center justify-center gap-8 order-1 md:order-2">
              <a href='https://www.instagram.com/metan_teknik' target='_blank' aria-label='Instagram' className='hover:text-brand-blue transition-colors'>
                <svg width='20' height='20' viewBox='0 0 18 18' fill='currentColor'><path d='M6,9c0-0.6,0.2-1.2,0.5-1.7c0.3-0.5,0.8-0.9,1.3-1.1C8.4,6,9,5.9,9.6,6c0.6,0.1,1.1,0.4,1.5,0.8c0.4,0.4,0.7,1,0.8,1.5 c0.1,0.6,0.1,1.2-0.2,1.7c-0.2,0.5-0.6,1-1.1,1.3S9.6,12,9,12c-0.8,0-1.6-0.3-2.1-0.9C6.3,10.6,6,9.8,6,9z M4.4,9 c0,0.9,0.3,1.8,0.8,2.6c0.5,0.8,1.2,1.4,2.1,1.7c0.8,0.4,1.8,0.4,2.7,0.3c0.9-0.2,1.7-0.6,2.4-1.3c0.6-0.6,1.1-1.5,1.3-2.4 s0.1-1.8-0.3-2.7c-0.4-0.8-0.9-1.6-1.7-2.1S9.9,4.4,9,4.4c-1.2,0-2.4,0.5-3.3,1.4C4.9,6.6,4.4,7.8,4.4,9z M12.8,4.2 c0,0.2,0.1,0.4,0.2,0.6s0.3,0.3,0.5,0.4c0.2,0.1,0.4,0.1,0.6,0.1c0.2,0,0.4-0.1,0.6-0.3c0.2-0.2,0.3-0.3,0.3-0.6 c0-0.2,0-0.4-0.1-0.6c-0.1-0.2-0.2-0.4-0.4-0.5c-0.2-0.1-0.4-0.2-0.6-0.2c-0.1,0-0.3,0-0.4,0.1c-0.1,0.1-0.3,0.1-0.4,0.2 c-0.1,0.1-0.2,0.2-0.2,0.4C12.8,3.9,12.8,4,12.8,4.2z M5.4,16.3c-0.6,0-1.1-0.1-1.7-0.3c-0.4-0.1-0.7-0.4-1-0.7 c-0.3-0.3-0.5-0.6-0.7-1c-0.2-0.5-0.3-1.1-0.3-1.7c0-0.9,0-6.3,0-7.3c0-0.6,0.1-1.1,0.3-1.7c0.2-0.4,0.4-0.7,0.7-1 c0.3-0.3,0.6-0.5,1-0.7c0.5-0.2,1.1-0.3,1.7-0.3c0.9,0,6.3,0,7.3,0c0.6,0,1.1,0.1,1.7,0.3c0.4,0.2,0.7,0.4,1,0.7 c0.3,0.3,0.5,0.6,0.7,1c0.2,0.5,0.3,1.1,0.3,1.7c0,1,0,6.3,0,7.3c0,0.6-0.1,1.1-0.3,1.7c-0.2,0.4-0.4,0.7-0.7,1 c-0.3,0.3-0.6,0.5-1,0.7c-0.5,0.2-1.1,0.3-1.7,0.3c-1,0-1.2,0.1-3.6,0.1C6.6,16.4,6.3,16.4,5.4,16.3z M5.3,0c-0.7,0-1.5,0.2-2.2,0.4 C2.5,0.7,2,1,1.5,1.5c-0.5,0.5-0.8,1-1,1.6C0.2,3.8,0,4.5,0,5.3c0,1,0,6.5,0,7.4c0,0.7,0.2,1.5,0.4,2.2c0.2,0.6,0.6,1.1,1,1.6 c0.5,0.5,1,0.8,1.6,1c0.7,0.3,1.4,0.4,2.2,0.4C6.2,18,6.5,18,9,18s2.8,0,3.7-0.1c0.7,0,1.5-0.2,2.2-0.4c0.6-0.2,1.1-0.6,1.6-1 c0.5-0.5,0.8-1,1-1.6c0.3-0.7,0.4-1.4,0.4-2.2c0-1,0-6.5,0-7.4c0-0.7-0.2-1.5-0.4-2.2c-0.2-0.6-0.6-1.1-1-1.6c-0.5-0.5-1-0.8-1.6-1 C14.2,0.2,13.5,0,12.7,0C11.8,0,6.2,0,5.3,0'></path></svg>
              </a>
              <a href='https://www.youtube.com/@metanteknik103' target='_blank' aria-label='Youtube' className='hover:text-brand-blue transition-colors'>
                <svg width='20' height='20' viewBox='0 0 461.001 461.001' fill='currentColor'><path d='M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z'></path></svg>
              </a>
              <a href='https://www.facebook.com/metanteknik' target='_blank' aria-label='Facebook' className='hover:text-brand-blue transition-colors'>
                <svg width='20' height='20' viewBox='0 0 18 18' fill='currentColor'><path d='M17,0H1C0.7,0,0.5,0.1,0.3,0.3S0,0.7,0,1v16c0,0.3,0.1,0.5,0.3,0.7C0.5,17.9,0.7,18,1,18h8.6v-7H7.3V8.3h2.3v-2 c0-2.3,1.4-3.6,3.5-3.6c0.7,0,1.4,0,2.1,0.1v2.4h-1.4c-1.1,0-1.3,0.5-1.3,1.3v1.7h2.7L14.8,11h-2.3v7H17c0.3,0,0.5-0.1,0.7-0.3 c0.2-0.2,0.3-0.4,0.3-0.7V1c0-0.3-0.1-0.5-0.3-0.7C17.5,0.1,17.3,0,17,0z'></path></svg>
              </a>
              <a href='https://www.linkedin.com/company/metan-teknik/' target='_blank' aria-label='LinkedIn' className='hover:text-brand-blue transition-colors'>
                <svg width='20' height='20' viewBox='0 0 18 18' fill='currentColor'><path d='M16.7,0H1.3C1.2,0,1,0,0.8,0.1C0.7,0.2,0.5,0.3,0.4,0.4S0.2,0.6,0.1,0.8C0,1,0,1.1,0,1.3v15.4c0,0.2,0,0.3,0.1,0.5 c0.1,0.2,0.2,0.3,0.3,0.4c0.1,0.1,0.3,0.2,0.4,0.3C1,18,1.2,18,1.3,18h15.3c0.3,0,0.7-0.1,0.9-0.4c0.3-0.2,0.4-0.6,0.4-0.9V1.3 c0-0.3-0.1-0.7-0.4-0.9C17.4,0.1,17,0,16.7,0z M5.3,15.3H2.7V6.8h2.7V15.3z M4,5.6c-0.3,0-0.6-0.1-0.9-0.3C2.9,5.2,2.7,4.9,2.6,4.6 C2.5,4.4,2.4,4,2.5,3.7C2.5,3.4,2.7,3.2,2.9,3c0.2-0.2,0.5-0.4,0.8-0.4c0.3-0.1,0.6,0,0.9,0.1c0.3,0.1,0.5,0.3,0.7,0.6 C5.5,3.4,5.5,3.7,5.6,4c0,0.4-0.2,0.8-0.5,1.1C4.8,5.4,4.4,5.6,4,5.6L4,5.6z M15.3,15.3h-2.7v-4.2c0-1,0-2.3-1.4-2.3 S9.7,10,9.7,11.1v4.2H7V6.8h2.6v1.2c0.3-0.4,0.6-0.8,1.1-1c0.4-0.2,0.9-0.4,1.5-0.3c2.7,0,3.2,1.8,3.2,4.1L15.3,15.3z'></path></svg>
              </a>
            </div>

            {/* right column: copyright */}
            <div className="flex justify-end order-3">
              <p className="font-bold text-[#999999]">© 2025 Metan Teknik Müm. ve Tic. AŞ. | Türkiye</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}