"use client";

import React, { useState } from 'react';
import SubNav from '@/components/SubNav';
import { ChevronDown, ChevronUp, Circle } from 'lucide-react';

const referanslar = [
  {
    category: "Resmi Daireler",
    items: [
      "EMNİYET GENEL MÜDÜRLÜĞÜ / Ankara",
      "İ.S.K.İ. GENEL MÜDÜRLÜĞÜ / İstanbul",
      "İSTANBUL EMNİYET MÜDÜRLÜĞÜ / İstanbul",
      "İSTANBUL EMNİYET MÜDÜRLÜĞÜ Narkotik Şube Müdürlüğü / İstanbul",
      "İSTANBUL TİCARET ODASI / İstanbul",
      "ŞİŞLİ BELEDİYE BAŞKANLIĞI / İstanbul",
      "T.C. KÜLTÜR BAKANLIĞI MİTHATPAŞA KÜLTÜR MERKEZİ / Ankara",
      "T.C. MALİYE BAKANLIĞI İSTANBUL DEFTERDARLIĞI/ İstanbul",
      "T.C. SANAYİ VE TİCARET BAKANLIĞI/ Ankara",
      "TÜBİTAK BAŞKANLIĞI Feza Gürsey Konferans Salonu/ Ankara"
    ]
  },
  {
    category: "Üniversiteler",
    items: [
      "ANKARA ÜNİVERSİTESİ ATAUM SALONU / Cebeci-Ankara",
      "ANKARA ÜNİVERSİTESİ AVRUPA TOPLULUĞU MERKEZİ / GOP-Ankara",
      "BOĞAZİÇİ ÜNİVERSİTESİ REKTÖRLÜĞÜ KONFERANS SALONU / İstanbul",
      "BOĞAZİÇİ ÜNİVERSİTESİ UNESCO SALONU / İstanbul",
      "GALATASARAY ÜNİVERSİTESİ / İstanbul",
      "GAZİ ÜNİVERSİTESİ MİMAR KEMALETTİN KONFERANS SALONU / Ankara",
      "GAZİ ÜNİVERSİTESİ TIP FAKÜLTESİ KONFERANS SALONU / Ankara",
      "MERSİN ÜNİVERSİTESİ / Mersin"
    ]
  },
  {
    category: "Kiralama Firmaları",
    items: [
      "BİTEK TANITIM & ORGANİZASYON / İstanbul",
      "ÇÖZÜM KONFERANS / İstanbul",
      "DİNAMİK OPTİK LTD. / Ankara",
      "DORUK TEKNİK / İstanbul",
      "ELEKTROOPTİK / Ankara",
      "LET’S İLETİŞİM SİSTEMLERİ / Ankara",
      "PROKON / Ankara"
    ]
  },
  {
    category: "Yurtdışı Referanslarımız",
    items: [
      "ANKARA OTELİ BALO & KONFERANS SALONU / Alma Ata - KAZAKİSTAN",
      "AŞKAABAD HAVAALANI / Aşkaabad-TÜRKMENİSTAN",
      "BAKÜLEV KALP HASTANESİ / Moskova - RUSYA FEDERASYONU",
      "PETRO KİMYA SANAYİİ MERKEZ BİNASI / Oran, Cezayir",
      "CUMHURBAŞKANLIĞI SARAYI / Aşkaabad-TÜRKMENİSTAN",
      "GÜBRE FABRİKASI / Odessa - UKRAYNA",
      "HOCA AHMET YESEVİ ÜNİVERSİTESİ KÜLTÜR MERKEZİ / Türkistan - KAZAKİSTAN",
      "HYATT REGENCY HOTEL / Bakü - AZERBAYCAN",
      "KAZAKİSTAN MEDIA TV TOWER",
      "LUKOIL LİSESİ (Kogalim) / Sibirya - RUSYA FEDERASYONU",
      "LUKOIL OTELİ (Kogalim) / Sibirya - RUSYA FEDERASYONU",
      "MEDIA TV TOWER / TÜRKMENİSTAN",
      "MERKEZ BANKASI / Bakü - AZERBAYCAN",
      "MOSKOVA MERKEZ BANKASI / Moskova - RUSYA FEDERASYONU",
      "ÖZBEKİSTAN MERKEZ BANKASI (NBU) / Taşkent - ÖZBEKİSTAN",
      "POLİMEKS KÜLTÜR SİTESİ / Aşkaabad-TÜRKMENİSTAN",
      "SAĞLIK MERKEZİ / Tuapse - RUSYA FEDERASYONU",
      "SOCHI RADISSON LAZURNAYA HOTEL / Sochi - RUSYA FEDERASYONU",
      "ULAŞTIRMA BAKANLIĞI / Akmola - KAZAKİSTAN"
    ]
  },
  {
    category: "Özel Sektör ve Diğer Kuruluşlar",
    items: [
      "A.B.D. BÜYÜKELÇİLİĞİ İSTANBUL BAŞKONSOLOSLUĞU KÜLTÜR MRK. / İstanbul",
      "ALANYA KÜLTÜR MERKEZİ / Alanya",
      "AMERİKA BİRLEŞİK DEVLETLERİ BÜYÜKELÇİLİĞİ KÜLTÜR MERKEZİ / Ankara",
      "BAYINDIRLIK BAKANLIĞI MİMAR SİNAN BRİFİNG SALONU / Ankara",
      "BEST OTEL / Ankara",
      "BURSA KENT MÜZESİ / Bursa",
      "CEYLAN HOLDİNG İNTERCONTINENTAL OTELİ / İstanbul",
      "COCA COLA (Maksan A.Ş.) GENEL MÜDÜRLÜĞÜ / İstanbul",
      "DEMİRBANK KÜLTÜR MERKEZİ / İstanbul",
      "EFES MÜZESİ / Selçuk, İzmir",
      "ESBANK GENEL MÜDÜRLÜĞÜ KÜLTÜR MERKEZİ / İstanbul",
      "FENERBAHÇE MÜZESİ / İstanbul",
      "GARANTİ BANKASI / İstanbul",
      "GAZİANTEP KENT MÜZESİ / Gaziantep",
      "GuidePort (Sesli Rehber Sistemi)",
      "HARBİYE ASKERİ MÜZESİ / İstanbul",
      "İSTANBUL TİCARET ODASI / İstanbul",
      "İZMİR KENT MÜZESİ / İzmir",
      "İZMİT SARAYBAHÇE KENT MÜZESİ / İzmit",
      "KAYSERİ KENT MÜZESİ / Kayseri",
      "KAYSERİ MİMAR SİNAN MÜZESİ / Kayseri",
      "OSMANLI BANKASI MERKEZ BİNASI / İstanbul",
      "PENTA OTELİ / İstanbul",
      "PERA MÜZESİ / İstanbul",
      "POLAT RÖNESANS OTELİ / İstanbul",
      "PROMED İLAÇ SANAYİİ A.Ş. / İstanbul",
      "TOPKAPI MÜZESİ / İstanbul",
      "TOPKAPI MÜZESİ HAREM DAİRESİ / İstanbul",
      "TÜRKİYE BÖBREK VAKFI / İstanbul",
      "YAPI ve KREDİ BANKASI 2000 PROJESİ GEBZE Yönetim Merkezi / İstanbul"
    ]
  },
  {
    category: "Bayi Referanslarımız",
    items: [
      "AKP GENEL MERKEZİ / Ankara",
      "ANADOLU ÜNİVERSİTESİ / Eskişehir",
      "DEVLET PLANLAMA TEŞKİLATI / Ankara",
      "KAZAKİSTAN DEVLET SARAYI / Kazakistan",
      "RTÜK / Ankara",
      "TV-Tower / Türkmenistan"
    ]
  },
  {
    category: "TV Kanalları",
    items: [
      "ATV",
      "DOĞAN HABER AJANSI",
      "FOX TV",
      "HABER TÜRK",
      "KANAL 1",
      "KANAL D",
      "NTV",
      "SHOW TV",
      "STAR",
      "T.R.T",
      "TV100",
      "TV8"
    ]
  }
];

export default function Referanslarimiz() {
  const hakkimizdaLinks = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Bayilerimiz", href: "/hakkimizda/bayilerimiz" },
    { name: "Referanslarımız", href: "/hakkimizda/referanslarimiz" },
    { name: "Finans", href: "/hakkimizda/finans" },
    { name: "İletişim Bilgileri", href: "/hakkimizda/iletisim-bilgileri" },
    { name: "Künye", href: "/hakkimizda/kunye" },
  ];

  // State to track which accordion is open. null means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section data-nav-color="light" className="relative h-[80vh] flex items-center px-12 md:px-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/zorlu-psm.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl w-full relative z-10">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Referanslarımız
          </h1>
          <div className="relative py-6 md:py-6"> 
            <div className="absolute left-[-100vw] right-[-100vw] h-[1px] bg-white/30 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      <SubNav links={hakkimizdaLinks} />

      {/* References Content */}
      <section className="px-6 md:px-16 pt-6 pb-12 bg-white">
        {/* Changed from max-w-4xl to max-w-full to go full width */}
        <div className="max-w-full mx-auto">
          <div className="space-y-4">
            {referanslar.map((ref, index) => (
              <ReferenceAccordion 
                key={index} 
                category={ref.category} 
                items={ref.items} 
                isOpen={openIndex === index}
                onToggle={() => toggleAccordion(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// 2. Accordion Component
function ReferenceAccordion({ 
  category, 
  items, 
  isOpen, 
  onToggle 
}: { 
  category: string; 
  items: string[]; 
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand-blue ring-1 ring-brand-blue/10' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors duration-200 text-left"
      >
        <span className={`text-xl font-medium transition-colors duration-200 ${isOpen ? 'text-brand-blue' : 'text-gray-900'}`}>
          {category}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-brand-blue" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 bg-white">
          <div className="h-[1px] w-full bg-gray-100 mb-6" />
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-3 gap-x-12">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start text-[16px] text-gray-600 py-1">
                <Circle className="w-1.5 h-1.5 mt-2 mr-3 text-brand-blue fill-brand-blue flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}