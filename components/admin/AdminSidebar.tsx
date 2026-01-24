'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Layout,
  Store
} from 'lucide-react';

const mainMenuItems = [
  { 
    group: 'Sennheiser İçerik Yönetimi', 
    items: [
      { name: 'Sennheiser Ürün Listesi', icon: LayoutDashboard, href: '/admin' },
      { name: 'Ürün Ekle', icon: PlusCircle, href: '/admin/add-product' },
      { name: 'Ana Sayfa Slayt Yönetimi', icon: Layout, href: '/admin/carousel-manager' },
      { name: 'Bayi Yönetimi', icon: Store, href: '/admin/bayi-manager' },
    ]
  }
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); // Initialize router

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh(); // Force a refresh to ensure middleware clears
      }
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-16' : 'w-52'
      } bg-[#0f172a] text-slate-300 h-screen sticky top-0 hidden md:flex flex-col border-r border-slate-800 transition-all duration-300 ease-in-out z-40`}
    >
      {/* Header (Same as before) */}
      <div className="h-16 flex items-center px-[18px] border-b border-slate-800/50 flex-shrink-0 relative">
        <div className="flex items-center">
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
            <Image 
              src="/images/metan-icon.png" 
              alt="Metan Icon" 
              width={24} 
              height={24} 
              className="rounded-md object-contain brightness-110"
            />
          </div>
          <span className={`ml-2.5 font-bold text-xs text-white uppercase whitespace-nowrap transition-all duration-200 ${
            isCollapsed ? 'opacity-0 translate-x-[-10px] pointer-events-none' : 'opacity-100 translate-x-0 delay-150'
          }`}>
            YÖNETİM PANELİ
          </span>
        </div>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-slate-800 border border-slate-700 text-white rounded-full p-1 shadow-md hover:bg-metan-orange transition-colors z-50 cursor-pointer"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>
      
      {/* Main Nav (Same as before) */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 space-y-4 custom-scrollbar">
        {mainMenuItems.map((group, idx) => (
          <div key={idx} className="overflow-hidden">
            <h3 className={`text-[10px] font-bold text-slate-500 uppercase px-4 mb-2 whitespace-nowrap transition-all duration-200 ${
              isCollapsed ? 'opacity-0 translate-x-[-10px]' : 'opacity-100 translate-x-0 delay-150'
            }`}>
              {group.group}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      title={isCollapsed ? item.name : ""}
                      className={`flex items-center h-10 px-4 transition-all group relative overflow-hidden ${
                        isActive 
                          ? 'bg-slate-800/80 text-white border-r-2 border-metan-orange' 
                          : 'hover:bg-slate-800/40 hover:text-white'
                      }`}
                    >
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                        <item.icon 
                          size={16} 
                          className={`transition-colors ${isActive ? 'text-metan-orange' : 'text-slate-500 group-hover:text-metan-orange'}`} 
                        />
                      </div>
                      <span className={`ml-3 text-[12.5px] font-medium leading-none whitespace-nowrap transition-all duration-200 ${
                        isCollapsed ? 'opacity-0 translate-x-[-20px] pointer-events-none' : 'opacity-100 translate-x-0 delay-150'
                      } ${isActive ? 'text-white font-bold' : ''}`}>
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="flex-shrink-0 border-t border-slate-800/50 bg-[#0f172a]">
        <ul className="py-2 space-y-0.5">
          {/* Settings Link */}
          <li>
            <Link 
              href="#" 
              className="flex items-center h-10 px-4 transition-all group hover:bg-slate-800/40 hover:text-white"
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 text-slate-500 group-hover:text-metan-orange">
                <Settings size={16} />
              </div>
              <span className={`ml-3 text-[12.5px] font-medium transition-all duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                Site Ayarları
              </span>
            </Link>
          </li>
          {/* Logout Button */}
          <li>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center h-10 px-4 transition-all group hover:bg-red-500/10 hover:text-red-400 cursor-pointer text-slate-500"
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <LogOut size={16} />
              </div>
              <span className={`ml-3 text-[12.5px] font-medium transition-all duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                Çıkış
              </span>
            </button>
          </li>
        </ul>

        {/* User Profile (Same as before) */}
        <div className="p-3">
          <div className="flex items-center px-1.5 h-10 rounded-lg bg-slate-800/30 overflow-hidden">
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                U
              </div>
            </div>
            <div className={`ml-2.5 flex flex-col min-w-0 transition-all duration-200 ${
              isCollapsed ? 'opacity-0 translate-x-[-10px]' : 'opacity-100 translate-x-0 delay-150'
            }`}>
              <span className="text-[11px] text-white font-medium leading-none truncate whitespace-nowrap">Umut</span>
              <span className="text-[9px] text-slate-500 leading-none mt-1 whitespace-nowrap">Yönetici</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}