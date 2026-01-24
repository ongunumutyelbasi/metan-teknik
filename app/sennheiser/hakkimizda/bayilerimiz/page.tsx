"use client";

import React, { useState, useEffect } from 'react';
import SubNav from '@/components/SubNav';
import { ArrowUpRight, Phone, Globe, Loader2 } from 'lucide-react';

interface Dealer {
  id: string;
  name: string;
  logo: string;
  city: string;
  address: string;
  phone: string | string[];
  website: string;
  websiteLabel: string;
  googleMapsUrl: string;
}

interface BayiSection {
  id: string;
  title: string;
  dealers: Dealer[];
}

export default function Bayilerimiz() {
  const [sections, setSections] = useState<BayiSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/bayiler')
      .then((res) => res.json())
      .then((data) => {
        // data is now the array of sections from your JSON
        setSections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Bayi verisi yüklenemedi:", err);
        setLoading(false);
      });
  }, []);

  const hakkimizdaLinks = [
    { name: "Hakkımızda", href: "/sennheiser/hakkimizda" },
    { name: "Bayilerimiz", href: "/sennheiser/hakkimizda/bayilerimiz" },
    { name: "Referanslarımız", href: "/sennheiser/hakkimizda/referanslarimiz" },
    { name: "Finans", href: "/sennheiser/hakkimizda/finans" },
    { name: "İletişim Bilgileri", href: "/sennheiser/hakkimizda/iletisim-bilgileri" },
    { name: "Künye", href: "/sennheiser/hakkimizda/kunye" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

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

      {/* Dynamic Sections from JSON */}
      {sections.map((section) => (
        <section key={section.id} className="px-6 md:px-16 py-12 bg-white">
          <div className="max-w-full mx-auto">
            <div className="mb-6">
              <h2 className="text-4xl font-semibold tracking-tight text-black">
                {section.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
              {section.dealers.map((bayi) => (
                <DealerCard key={bayi.id} bayi={bayi} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

function DealerCard({ bayi }: { bayi: Dealer }) {
  const phoneNumbers = Array.isArray(bayi.phone) ? bayi.phone : [bayi.phone];

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-5 transition-all duration-300 group">
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