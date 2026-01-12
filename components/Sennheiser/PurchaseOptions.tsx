// components/Sennheiser/PurchaseOptions.tsx
import Link from 'next/link';
import { Store, Mail } from 'lucide-react';

export const PurchaseOptions = () => {
  const items = [
    { 
      icon: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M11.73,16,6.91,20.84a.49.49,0,0,1-.85-.4V11.59a.49.49,0,0,1,.85-.4Zm12.15,6.16a.48.48,0,0,1-.34.84H8.6a.49.49,0,0,1-.36-.84l4.83-4.82,3,3,3-3ZM23.56,9a.48.48,0,0,1,.32.85l-7.81,7.83L8.24,9.86A.48.48,0,0,1,8.56,9Zm4.5-2h-24V25h24Zm-2.84,4.18a.49.49,0,0,1,.85.38v8.89a.49.49,0,0,1-.85.38L20.39,16Z" fill="currentColor" />
        </svg>
        ),
      text: "İletişime Geçin",
      href: "/sennheiser/hakkimizda/iletisim-bilgileri" 
    },
    { 
      icon: (
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M47.25 8.75H8.75V12.25H47.25V8.75Z" fill="currentColor"></path>
            <path d="M8.75 49H29.75V35H43.75V49H47.25V35H50.75V31.5L46.865 15.75H9.135L5.25 31.08V35H8.75V49ZM26.25 45.5H12.25V35H26.25V45.5Z" fill="currentColor"></path>
        </svg>
        ), 
      text: "En Yakın Bayimizden Satın Alın",
      href: "/sennheiser/hakkimizda/bayilerimiz"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] px-[20px] pb-[20px]">
      {items.map((item, idx) => (
        <Link key={idx} href={item.href} className="aspect-square w-full border border-light-gray bg-white p-[20px] flex flex-col justify-between group hover:bg-brand-hover-blue transition-all duration-300">
          <div className="w-[48px] h-[48px] text-black group-hover:text-brand-hover-blue transition-colors">
            {item.icon}
          </div>
          <div className="text-[20px] font-medium leading-[1.2] text-black group-hover:text-white group-hover:-translate-y-3 transition-all duration-300">
            {item.text}
          </div>
        </Link>
      ))}
    </div>
  );
};