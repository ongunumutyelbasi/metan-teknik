"use client";

import React from 'react';
import SubNav from '@/components/SubNav';
import { ArrowUpRight, Phone, Globe } from 'lucide-react';

// 1. Data Structure
const bayiler = [
  { 
    name: "Asimetrik", 
    logo: "/images/bayi-logolar/asimetrik.png", 
    city: "İstanbul", 
    address: "Esentepe Mah. Yazarlar Sok. No:17 34394 Şişli/İstanbul", 
    phone: "+90 (212) 212 80 75", 
    website: "https://asimetrik.com.tr/en/home/",
    websiteLabel: "asimetrik.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/UhjmJQkRjPuFFisBA" 
  },
  { 
    name: "DerTech", 
    logo: "/images/bayi-logolar/dertech.png", 
    city: "İstanbul", 
    address: "Akşemsettin Mah. Fatih Blv. No:541 Uzundere Mevkii, Sultanbeyli/İstanbul", 
    phone: "+90 (216) 487 56 03", 
    website: "http://www.dertech.com.tr/",
    websiteLabel: "dertech.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/L43bVaJyeBxwSwVE8"
  },
  { 
    name: "Devtek", 
    logo: "/images/bayi-logolar/devtek.png", 
    city: "İstanbul", 
    address: "Merkez Efendi Mah. Tercüman Sitesi A2 Blok Kat:11 No:46 Cevizlibağ - Zeytinburnu/İstanbul", 
    phone: "+90 (212) 582 23 07", 
    website: "https://www.devtek.com.tr/tr",
    websiteLabel: "devtek.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/UvAy8d3FkRb2cyjeA"
  },
  { 
    name: "Elektropanç", 
    logo: "/images/bayi-logolar/elektropanc.png", 
    city: "İstanbul", 
    address: "Gürsel Mah. Sevilen Sok. No:38 34400 Çağlayan/İstanbul", 
    phone: "+90 (212) 222 83 83", 
    website: "http://www.elektropanc.com.tr/",
    websiteLabel: "elektropanc.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/KgCRngQwtVb922Vf7"
  },
  { 
    name: "Nidah Ses Işık", 
    logo: "/images/bayi-logolar/nidah-ses-isik.png", 
    city: "İstanbul", 
    address: "Defderdar Mahallesi Güldalı Sok. No:22 Kat:1 Edirnekapı – Eyüp / İstanbul", 
    phone: "+90 (212) 631 04 49", 
    website: "https://www.nidah.org/nidahiletisim",
    websiteLabel: "nidah.org",
    googleMapsUrl: "https://maps.app.goo.gl/cTezc4QpFooWiBRr6"
  },
  { 
    name: "Polokom", 
    logo: "/images/bayi-logolar/polokom.png?v=1", 
    city: "İstanbul", 
    address: "Perpa Ticaret İş Merkezi 11.Kat B Blok No: 1709 Okmeydanı / İstanbul", 
    phone: "+90 (212) 320 06 44", 
    website: "http://www.polokom.com.tr/",
    websiteLabel: "polokom.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/qe8rRM6gDJfjqC9r6"
  },
  { 
    name: "Er-Dijital", 
    logo: "/images/bayi-logolar/erdijital.png", 
    city: "İstanbul", 
    address: "Hoybar Mh. Ankara Cd. Kastelli İş Merk. No:37 / İstanbul", 
    phone: "+90 (212) 514 00 73", 
    website: "https://www.erdijital.com/kategori/comica-mikrofon?marka=sennheiser-e,sennheiser",
    websiteLabel: "erdijital.com",
    googleMapsUrl: "https://maps.app.goo.gl/aLdzCNzFAXeQz79R6"
  },
  { 
    name: "Prokare", 
    logo: "/images/bayi-logolar/prokare.png", 
    city: "İstanbul", 
    address: "Perpa Ticaret Merkezi A Blok Kat:11 No: 1455-1457-1459 Şişli/İstanbul", 
    phone: "+90 (212) 320 23 40", 
    website: "http://www.prokare.com.tr/",
    websiteLabel: "prokare.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/z4X3Pf2mhEmrGWvf7"
  },
  { 
    name: "Sessan", 
    logo: "/images/bayi-logolar/sessan.png", 
    city: "İstanbul", 
    address: "Piyale Paşa Mah. Baruthane Cad. Stad Sk. No.27/3, Okmeydanı/İstanbul", 
    phone: "+90 (212) 253 66 95", 
    website: "http://www.sessan.com.tr/",
    websiteLabel: "sessan.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/JBKCgPBDa3Q3cBFx7"
  },
  { 
    name: "Sunu Proje (Visio-Vox)", 
    logo: "/images/bayi-logolar/sunu-proje.png", 
    city: "İstanbul", 
    address: "Balmumcu Plaza 3, Daire 2 Balmumcu – Beşiktaş / İstanbul", 
    phone: "+90 (212) 327 15 15", 
    website: "https://visio-vox.com/tr/home-turkce/",
    websiteLabel: "visio-vox.com",
    googleMapsUrl: "https://maps.app.goo.gl/ciqVLZMVFxThukG29"
  },
  { 
    name: "Teratek", 
    logo: "/images/bayi-logolar/teratek.png", 
    city: "İstanbul", 
    address: "Kayışdağı Cad. Kor Plaza No:70 K:4 İçerenköy – Ataşehir/İstanbul", 
    phone: "+90 (216) 577 23 77", 
    website: "http://www.teratek.com.tr/",
    websiteLabel: "teratek.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/HjEzK3XDRY9GUvPj6"
  },
  { 
    name: "Asimetrik", 
    logo: "/images/bayi-logolar/asimetrik.png", 
    city: "Ankara", 
    address: "İlkbahar Mah. 622. Sok. Nn:4 Oran / Çankaya / Ankara", 
    phone: "+90 (312) 490 91 01", 
    website: "https://asimetrik.com.tr/en/home/",
    websiteLabel: "asimetrik.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/o5wDsbdHV1Z82bZD7" 
  },
  { 
    name: "Atempo", 
    logo: "/images/bayi-logolar/atempo.png", 
    city: "Ankara", 
    address: "Farabi Sokak No: 8 06680 Çankaya / Ankara", 
    phone: "+90 (312) 466 82 00", 
    website: "http://www.atempo.com.tr/",
    websiteLabel: "atempo.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/Ys4fC1mQRYoeLBrB8" 
  },
  { 
    name: "Atsan Elektronik", 
    logo: "/images/bayi-logolar/atsan.png?v=1", 
    city: "Ankara", 
    address: "Konya Sk. No:13 / 34-35 06250 Ulus / Ankara", 
    phone: ["+90 (312) 309 52 26", "+90 (312) 309 52 27"], 
    website: "http://www.atsanelektronik.com.tr/",
    websiteLabel: "atsanelektronik.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/6kDU6PCgVtD5dqL2A" 
  },
  { 
    name: "İdeapro", 
    logo: "/images/bayi-logolar/ideapro.png", 
    city: "Ankara", 
    address: "Piyade Sokak No: 22/7 06550 Çankaya / Ankara", 
    phone: "+90 (312) 438 68 18", 
    website: "https://www.ideapro.com.tr/magaza/brand/sennheiser/",
    websiteLabel: "ideapro.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/GU7pByPAU3gRgqtH6" 
  },
  { 
    name: "Asimetrik", 
    logo: "/images/bayi-logolar/asimetrik.png", 
    city: "Antalya", 
    address: "Yenigöl, Serik Cd. no: 64/1, 07230 Muratpaşa/Antalya", 
    phone: "+90 (242) 324 61 06", 
    website: "https://asimetrik.com.tr/",
    websiteLabel: "asimetrik.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/1M4mM3YqRAkayhJAA" 
  },
  { 
    name: "Şener Elektronik", 
    logo: "/images/bayi-logolar/sener.png", 
    city: "Antalya", 
    address: "Topçular Mahhallesi Aspendos Bulvarı Kardelen İş Merkezi No:129/B 07300 Muratpaşa / Antalya", 
    phone: ["+90 (242) 244 14 00", "+90 (242) 248 80 60"], 
    website: "http://www.senerelektronik.com/",
    websiteLabel: "senerelektronik.com",
    googleMapsUrl: "https://maps.app.goo.gl/HdZ6G9aus8E6Bqhz8" 
  },
  { 
    name: "Kaşif Elektronik", 
    logo: "/images/bayi-logolar/kasif.png", 
    city: "Bursa", 
    address: "Yahşibey Mah. Bozkurt Cad. NO:6/A Bursa", 
    phone: ["+90 (224) 222 00 00", "+90 (224) 221 30 53"], 
    website: "http://www.kasifmusic.com/",
    websiteLabel: "kasifmusic.com",
    googleMapsUrl: "https://maps.app.goo.gl/YBRy9rUPgMRwq9HeA" 
  },
  { 
    name: "Seyfi Ses", 
    logo: "/images/bayi-logolar/seyfi.png", 
    city: "Bursa", 
    address: "Alaattinbey Mahallesi Nilüfer Ticaret Merkezi Sarp Plaza No:1 Nilüfer / Bursa", 
    phone: "+90 (224) 443 34 69", 
    website: "http://www.kasifmusic.com/",
    websiteLabel: "kasifmusic.com",
    googleMapsUrl: "https://maps.app.goo.gl/YBRy9rUPgMRwq9HeA" 
  },
  { 
    name: "Asimetrik", 
    logo: "/images/bayi-logolar/asimetrik.png", 
    city: "İzmir", 
    address: "1407. Sok. No:1 D:2 Başaran Apt. Alsancak / İzmir", 
    phone: "+90 (232) 463 60 80", 
    website: "https://asimetrik.com.tr/",
    websiteLabel: "asimetrik.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/dYTgyGMpZFC3ZUvs8" 
  },
  { 
    name: "Farfisfon", 
    logo: "/images/bayi-logolar/farfisfon.png", 
    city: "İzmir", 
    address: "İsmet Kaptan, 1362. Sk. No:41D, 35210 Konak/İzmir", 
    phone: "+90 (232) 425 75 75", 
    website: "http://www.farfisfon.com.tr/",
    websiteLabel: "farfisfon.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/z8mU8rTnXTEKxchZ9" 
  },
  { 
    name: "Meteor Müzik", 
    logo: "/images/bayi-logolar/meteor-muzik.png", 
    city: "İzmir", 
    address: "Belenbaşı Mahallesi, 3020 Sokak No:3/1 Meteor Plaza 35390 Buca/İzmir", 
    phone: "+90 (232) 955 02 80", 
    website: "https://www.meteormuzik.com.tr/tumu-c-0?k=sennheiser&siralama=a-z&markalar=19&k=sennheiser",
    websiteLabel: "meteormuzik.com.tr",
    googleMapsUrl: "https://maps.app.goo.gl/UqDkaFZqH6V1ECHw8"
  },
];

// 2. Main Page Component
export default function Bayilerimiz() {
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
      {/* Hero Section */}
      <section data-nav-color="light" className="relative h-[80vh] flex items-center px-12 md:px-24 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/images/sennheiser-store.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="max-w-4xl w-full relative z-10">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            Bayilerimiz
          </h1>
          <div className="relative py-6 md:py-6"> 
            <div className="absolute left-[-100vw] right-[-100vw] h-[1px] bg-white/30 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      <SubNav links={hakkimizdaLinks} />

      {/* İSTANBUL SECTION */}
      <section className="px-6 md:px-16 py-6 bg-white">
        <div className="max-w-full mx-auto">
          <div className="mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-black">İstanbul Satış Noktalarımız</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
            {bayiler
              .filter(bayi => bayi.city === "İstanbul")
              .map((bayi, index) => (
                <DealerCard key={index} bayi={bayi} />
              ))}
          </div>
        </div>
      </section>

      {/* ANKARA SECTION */}
      <section className="px-6 md:px-16 py-6 bg-white">
        <div className="max-w-full mx-auto">
          <div className="mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-black">Ankara Satış Noktalarımız</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
            {bayiler
              .filter(bayi => bayi.city === "Ankara")
              .map((bayi, index) => (
                <DealerCard key={index} bayi={bayi} />
              ))}
          </div>
        </div>
      </section>

      {/* ANTALYA SECTION */}
      <section className="px-6 md:px-16 py-6 bg-white">
        <div className="max-w-full mx-auto">
          <div className="mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-black">Antalya Satış Noktalarımız</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
            {bayiler
              .filter(bayi => bayi.city === "Antalya")
              .map((bayi, index) => (
                <DealerCard key={index} bayi={bayi} />
              ))}
          </div>
        </div>
      </section>

      {/* BURSA SECTION */}
      <section className="px-6 md:px-16 py-6 bg-white">
        <div className="max-w-full mx-auto">
          <div className="mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-black">Bursa Satış Noktalarımız</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
            {bayiler
              .filter(bayi => bayi.city === "Bursa")
              .map((bayi, index) => (
                <DealerCard key={index} bayi={bayi} />
              ))}
          </div>
        </div>
      </section>

      {/* İZMİR SECTION */}
      <section className="px-6 md:px-16 pt-6 pb-12 bg-white">
        <div className="max-w-full mx-auto">
          <div className="mb-6">
            <h2 className="text-4xl font-semibold tracking-tight text-black">İzmir Satış Noktalarımız</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
            {bayiler
              .filter(bayi => bayi.city === "İzmir")
              .map((bayi, index) => (
                <DealerCard key={index} bayi={bayi} />
              ))}
          </div>
        </div>
      </section>

    </main>
  );
}

// 3. Local Card Component (To avoid repeating the heavy JSX)
function DealerCard({ bayi }: { bayi: any }) {
  const phoneNumbers = Array.isArray(bayi.phone) ? bayi.phone : [bayi.phone];

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-5 transition-all duration-300 group">
      {/* Logo Box */}
      <div className="aspect-[4/3] w-full flex items-center justify-center p-2 mb-4 overflow-hidden">
        <img 
          src={bayi.logo} 
          alt={bayi.name} 
          className="w-full h-full object-contain filter transition-all duration-500"
        />
      </div>

      <h3 className="text-[28px] font-semibold text-gray-900 mb-3 leading-none">
        {bayi.name}
      </h3>

      <div className="flex flex-col space-y-3 text-[14px] text-gray-500 leading-snug">
        {/* Address */}
        <a 
          href={bayi.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pr-4 italic hover:text-brand-blue transition-colors duration-200 group/map inline-flex items-start"
        >
          {bayi.address}
          <ArrowUpRight 
            className="ml-1 mt-1 w-3 h-3 text-gray-400 flex-shrink-0 transition-colors duration-200 transition-transform group-hover/map:text-brand-blue group-hover/map:-translate-y-0.5 group-hover/map:translate-x-0.5" 
            strokeWidth={3} 
          />
        </a>

        {/* Phone Numbers - Now with Phone Icon */}
        <div className="flex flex-col space-y-2">
          {phoneNumbers.map((num: string, idx: number) => (
            <a 
              key={idx}
              href={`tel:${num.replace(/\s+/g, '')}`} 
              className="inline-flex items-center hover:text-brand-blue transition-colors duration-200 w-fit group/phone"
            >
              <Phone 
                className="mr-2 w-3.5 h-3.5 text-gray-600 flex-shrink-0 transition-colors duration-200 group-hover/phone:text-brand-blue" 
                strokeWidth={2.5}
              />
              {num}
            </a>
          ))}
        </div>

        {/* Website - Now with Globe Icon */}
        <a 
          href={bayi.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center hover:text-brand-blue transition-colors duration-200 w-fit group/link"
        >
          <Globe 
            className="mr-2 w-3.5 h-3.5 text-gray-600 flex-shrink-0 transition-colors duration-200 group-hover/link:text-brand-blue" 
            strokeWidth={2.5}
          />
          {bayi.websiteLabel || "Web Sitesi"}
          <ArrowUpRight 
            className="ml-1 w-3 h-3 text-gray-400 flex-shrink-0 transition-colors duration-200 transition-transform group-hover/link:text-brand-blue group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" 
            strokeWidth={3} 
          />
        </a>
      </div>
    </div>
  );
}