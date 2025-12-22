"use client";

import React, { useState } from 'react';
import SubNav from '@/components/SubNav';
import { CreditCard, Landmark, Truck, Info, Mail, Copy, CheckCircle2, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export default function Finans() {
  const hakkimizdaLinks = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Bayilerimiz", href: "/hakkimizda/bayilerimiz" },
    { name: "Referanslarımız", href: "/hakkimizda/referanslarimiz" },
    { name: "Finans", href: "/hakkimizda/finans" },
    { name: "İletişim Bilgileri", href: "/hakkimizda/iletisim-bilgileri" },
    { name: "Künye", href: "/hakkimizda/kunye" },
  ];

  const [copiedUnvan, setCopiedUnvan] = useState(false);
  const unvanText = "METAN TEK. MÜM. ve TİC.AŞ.";

  const handleCopyUnvan = () => {
    navigator.clipboard.writeText(unvanText);
    setCopiedUnvan(true);
    setTimeout(() => setCopiedUnvan(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section data-nav-color="light" className="relative h-[80vh] flex items-center px-12 md:px-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/radission-us-_XeQ8XEWb4Q-unsplash.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="max-w-4xl w-full relative z-10">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Finans
          </h1>
          <div className="relative py-6"> 
            <div className="absolute left-[-100vw] right-[-100vw] h-[1px] bg-white/30 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      <SubNav links={hakkimizdaLinks} />

      <section className="px-6 md:px-12 pt-6 pb-12 bg-white">
        <div className="max-w-full mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            
            {/* LEFT COLUMN: BANK DETAILS */}
            <div className="flex-[2] border border-gray-200 rounded-2xl p-8 flex flex-col">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Landmark className="text-black w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold">Banka Bilgilerimiz</h2>
              </div>

              {/* HIGH PROMINENCE ALICI ÜNVANI BOX */}
              <div className="mb-8 p-5 bg-emerald-50 border border-emerald-100 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold block mb-1">Gerekli Alıcı Ünvanı</span>
                    <p className="text-lg font-bold text-gray-900 tracking-tight leading-none">{unvanText}</p>
                  </div>
                </div>
                <button 
                  onClick={handleCopyUnvan}
                  className="flex items-center justify-center space-x-2 text-xs font-bold px-4 py-2.5 rounded-full bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
                >
                  {copiedUnvan ? <><CheckCircle2 className="w-3.5 h-3.5" /> <span>Kopyalandı</span></> : <><Copy className="w-3.5 h-3.5" /> <span>Ünvanı Kopyala</span></>}
                </button>
              </div>

              <div className="space-y-4 flex-grow">
                <IbanRow bank="GARANTİ BANKASI" iban="TR39 0006 2000 4480 0006 2785 29" />
                <IbanRow bank="TÜRKİYE İŞ BANKASI" iban="TR30 0006 4000 0011 3990 0172 57" />
              </div>

              <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start space-x-3">
                <Info className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600 leading-relaxed">
                  <strong>Dekont İşlemleri:</strong> EFT/Havale açıklamasına Fatura Ünvanını veya Servis Formu numarasını eklemeniz işleminizi hızlandıracaktır. Dekontları <a href="mailto:dekont@metan.com" className="text-brand-blue font-medium hover:underline">dekont@metan.com</a> adresine iletebilirsiniz.
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STACKED ONLINE PAYMENT & SPEED TIP */}
            <div className="flex-1 flex flex-col gap-6">
              
              {/* 1. Online Payment Card */}
              <div className="flex-1 flex flex-col border border-gray-200 rounded-2xl p-8 bg-gray-50/50">
                <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center mb-6">
                  <CreditCard className="text-white w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold mb-3 leading-none">Sanal Ödeme</h2>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Kredi kartı ile hızlı ve güvenli ödeme yapmak için aşağıdaki bağlantıyı kullanabilirsiniz.
                </p>
                <div className="mt-auto">
                  <a 
                    href="https://metanodeme.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cursor-pointer bg-black text-white px-6 py-4 rounded-full text-sm font-bold flex items-center justify-center space-x-2 hover:bg-brand-blue transition-all w-full group"
                  >
                    <span>metanodeme.com</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* 2. Speed Tip Card */}
              <div 
                className="flex-1 rounded-2xl p-8 text-white flex flex-col"
                style={{ backgroundColor: 'var(--color-sennheiser-footer)' }}
              >
                {/* Updated Icon & Layout to match others */}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-brand-blue fill-brand-blue" />
                </div>
                <h2 className="text-2xl font-semibold mb-3 leading-none">Hızlı İşlem</h2>
                <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                  Ödemenizi yaptıktan sonra dekontunuzu e-posta ile paylaşmanız, sevkiyat sürecini <span className="text-white font-bold">1 saat içinde</span> başlatmamıza olanak tanır.
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: LOGISTICS */}
          <div className="mt-8 border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <Truck className="w-5 h-5 text-brand-blue" />
                <h3 className="font-semibold text-lg text-gray-900">Kargo ve Teslimat</h3>
              </div>
              <ul className="text-sm text-gray-500 space-y-3">
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" /> 15:00 öncesi ödemelerde aynı gün çıkış yapılır.</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" /> MNG ve DHL Kargo ile gönderim sağlanır.</li>
                <li className="flex items-start"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" /> 1150 TL (25€) üzeri ve 1kg altı gönderiler ücretsizdir.</li>
              </ul>
            </div>
            
            <div className="hidden md:block w-[1px] bg-gray-100" />
            
            <div className="flex-1">
                <div className="flex items-center space-x-3 mb-6">
                    <Mail className="w-5 h-5 text-brand-blue" />
                    <h3 className="font-semibold text-lg text-gray-900">Fatura Bilgileri</h3>
                </div>
                
                <div className="space-y-2">
                    {/* Vergi Dairesi Row */}
                    <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                    <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-tight">Vergi Dairesi</span>
                    <span className="text-sm font-semibold text-gray-900">Zincirlikuyu</span>
                    </div>

                    {/* Vergi No Row */}
                    <div className="flex justify-between items-center p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                    <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-tight">Vergi No</span>
                    <span className="text-sm font-semibold text-gray-900">619 0570 940</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function IbanRow({ bank, iban }: { bank: string; iban: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="mb-2 md:mb-0">
        {/* Prominence increased: font-extrabold and text-gray-600 (darker) */}
        <span className="text-[11px] font-extrabold text-gray-600 uppercase tracking-tight block mb-0.5">{bank} (TL)</span>
        <p className="text-sm font-mono font-medium text-gray-800 tracking-wider">{iban}</p>
      </div>
      <button 
        onClick={handleCopy}
        className="flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-brand-blue hover:text-brand-blue transition-all"
      >
        {copied ? <><CheckCircle2 className="w-3.5 h-3.5" /> <span>Kopyalandı</span></> : <><Copy className="w-3.5 h-3.5" /> <span>Kopyala</span></>}
      </button>
    </div>
  );
}