"use client";

import React from 'react';
import SubNav from '@/components/SubNav';

export default function Hakkimizda() {
  // Navigation links for the Hakkımızda sub-menu
  const hakkimizdaLinks = [
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Bayilerimiz", href: "/hakkimizda/bayilerimiz" },
    { name: "Referanslarımız", href: "/hakkimizda/referanslarimiz" },
    { name: "Finans", href: "/hakkimizda/finans" },
    { name: "İletişim Bilgileri", href: "/hakkimizda/iletisim-bilgileri" },
    { name: "Künye", href: "/hakkimizda/kunye" },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* 1. Hero Section */}
      <section data-nav-color="light" className="relative h-[80vh] flex items-center px-12 md:px-24 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/about-hero.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content Layer */}
        <div className="max-w-4xl w-full relative z-10">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Hakkımızda
          </h1>

          {/* Equalized Line Container */}
          <div className="relative py-6 md:py-6"> 
            <div className="absolute left-[-100vw] right-[-100vw] h-[1px] bg-white/30 top-1/2 -translate-y-1/2" />
          </div>

          {/* Updated Metan Logo Container */}
          {/* By using absolute and top-full, the logo sits below the line 
              but doesn't affect the centering of the Title/Line. */}
          <div className="absolute top-full left-0 w-full max-w-[240px] pt-4">
            <img 
              src="/images/metan-logo-white-noDate.webp" 
              alt="Metan Teknik Logo" 
              className="w-full h-auto object-contain" 
            />
          </div>
        </div>
      </section>

      {/* 2. Sub-Navigation Menu */}
      <SubNav links={hakkimizdaLinks} />

      {/* 3. Main Content - Hikayemiz Section */}
      <section className="max-w-full mx-auto grid md:grid-cols-2 gap-6 items-center">
        <div className="py-6 pl-16 pr-6">
            <h2 className="text-3xl font-bold mb-4">Metan Teknik Hakkında</h2>
            <p className="text-gray-600 mb-4">
                1992 yılında İstanbul’da kurulan ve bu yıl {new Date().getFullYear() - 1992}. yılını kutlamakta olan metan A.Ş. kurulduğu yıldan beri Alman elektronik devi Sennheiser’in Türkiye distribütörlüğünü üstlenmektedir. Sektörde uzun yılların getirdiği birikim ile saygınlık ilkesinden ayrılmadan bugünkü yerini belirlemiştir.
            </p>
            <p className="text-gray-600 mb-4">
                Bugün Sennheiser Group dahilindeki kalitesi tartışılmayan Neumann kayıt mikrofonlarının, Klein+Hummel serisi hoparlörlerin, Avusturyalı projeksiyon ve minyatür kulak içi monitörleme sistemlerinin tartışmasız teknolojik lideri İsviçreli Phonak Communications firmasının ROGER serisi IE/IFB kulaklıklarının Türkiye distribütörü konumunda olan şirket, başarı grafiği nedeniyle 1998 ve 2007 yıllarında Sennheiser tarafından “Distributor of the Year Award” ile ödüllendirildi ve iki kez dünya çapında yılın distribütörü seçildi.
            </p>
            <p className="text-gray-600 mb-4">
                2016 yılı itibari ile Consumer ürün grubunun distribütörlüğünü ve satış sonrası desteğini Bircom firmasına devreden firmamız, bu tarih itibari ile Consumer ürün gruplarını ürün pörtföyünden ayırmış ve sadece profesyonel ürün grubunu teşkil eden Sennheiser Pro Audio ürün grubunda radyo/TV, canlı yayın, stüdyo, işyeri, toplantı odası ve konferans amaçlı mikrofon, kulaklık, monitör hoparlör ve fabrikalar/müzeler için sesli ziyaretçi rehberliği ürünlerine yoğunlaşmıştır.
            </p>
            <p className="text-gray-600">
                Sitemiz katalog amaçlı bir ürün tanıtım sitesidir ve online satışımız (e-Ticaret) bulunmamaktadır.
            </p>
        </div>

        <div className="bg-white h-full w-full p-4 flex">
            <div className="relative w-full h-full overflow-hidden">
                <img 
                src="/images/senn-history.avif" 
                alt="Sennheiser History" 
                className="absolute inset-0 w-full h-full object-cover" 
                />
            </div>
        </div>

      </section>

    {/* 3.1. Main Content - Vizyonumuz Section */}
      <section className="max-w-full mx-auto grid md:grid-cols-2 gap-6 items-center bg-[#f4f4f6]">
        <div className="bg-[#f4f4f6] h-full w-full p-4 flex">
            <div className="relative w-full h-full overflow-hidden">
                <img 
                src="/images/Neumann_U87_Condenser_Microphone_-_Studio_A,_In_Your_Ear_Studios.jpg" 
                alt="Sennheiser History" 
                className="absolute inset-0 w-full h-full object-cover" 
                />
            </div>
        </div>
        
        <div className="py-6 pl-6 pr-16">
            <h2 className="text-3xl font-bold mb-4">Vizyonumuz</h2>
            <p className="text-gray-600 mb-4">
                Müşterilerimizin ihtiyaçları doğrultusunda ürün araştırmalarında önceliğimiz doğru ve orijinal ürün seçimini gerçekleştirmek, müşteri isteklerini en hızlı şekilde ve maksimum seviyede fiyat/performans başarısı ile  yüksek tutarak karşılamaktır.
            </p>
            <p className="text-gray-600 mb-10">
                Müşterilerimize sunulan hizmet ve ürünlerdeki gelişen teknolojiyi takip etmek, sürekli gelişmeyi sağlamak, tüm kaynakları etkin şekilde kullanarak müşteri memnuniyetini arttırmak, insan kaynaklarına yatırım yapmak, eğitimlerle mevcut kadromuzu ve müşterilerimizi daima canlı, dinamik ve verimli kılmak olup en iyi hizmeti en uygun maliyetle ve zamanında yapmak, satış sonrası ürünlerimizin arkasında durmak ve saha uygulamalarında teknik destek vermek genel amacımızdır.
            </p>
            <h2 className="text-3xl font-bold mb-4">Misyonumuz</h2>
            <p className="text-gray-600 mb-4">
                Metan’ın ana hedefi; hizmet kalitesini sürekli kılarak gerek koşulsuz müşteri memnuniyeti anlayışı, gerek doğru teknik servis hizmeti, gerekse bünyesindeki güvenilir markaların ürün satışı ile şirketin iş hacmini artırmak, Türkiye’deki Ses Işık Görüntü sektörüne yön veren seçkin firmalar arasında, donanımsal ses zincirinin basındaki Mikrofondan, sonundaki Hoparlöre Donanımsal ses ürünlerinde firmamız “Metan Tek. Müm. ve Tic. AŞ.” ‘yi üst sıralara taşımaktır.
            </p>
        </div>

      </section>

    </main>
  );
}