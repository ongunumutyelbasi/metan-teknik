import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        {/* 
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-sm font-medium text-slate-600">Metan Teknik Ürün Konsolu</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
               <img src="/uploads/avatar/2.jpg" alt="User" />
            </div>
          </div>
        </header>
        */}
        

        {/* Main Content Area */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}