"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ShieldAlert, Loader2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shouldShake, setShouldShake] = useState(false);
    const router = useRouter();

    // Trigger shake when error changes
    useEffect(() => {
        if (error) {
            setShouldShake(true);
            const timer = setTimeout(() => setShouldShake(false), 500);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                const data = await res.json();
                setError(data.error || 'Geçersiz şifre');
            }
        } catch (err) {
            setError('Bağlantı hatası.');
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Fixed position with inset-0 is the most reliable way to kill scrolling */
        <div className="fixed inset-0 overflow-hidden bg-[#020617] flex items-center justify-center p-6">
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-6px); }
                    50% { transform: translateX(6px); }
                    75% { transform: translateX(-6px); }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                }
            `}</style>

            <div className={`w-full max-w-[360px] transition-transform ${shouldShake ? 'animate-shake' : ''}`}>
                <div className="bg-[#0f172a] border border-slate-800 rounded-lg shadow-2xl overflow-hidden">
                    
                    <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700/50 flex items-center gap-3">
                        <div className="w-8 h-8 flex-shrink-0">
                            <Image 
                                src="/images/metan-icon.png" 
                                alt="Metan" 
                                width={32} 
                                height={32} 
                                className="object-contain brightness-110"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-[16px] tracking-normal uppercase leading-none">
                                MeTan Admin Paneli
                            </span>
                            <span className="text-slate-500 text-[9px] uppercase mt-1 font-medium">
                                Kullanıcı Girişi
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="p-6 space-y-4">
                        <div className="space-y-1.5">
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                    <Lock size={14} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Yönetici Şifresi"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#1e293b] border border-slate-700 text-white pl-9 pr-3 py-2.5 rounded text-sm focus:outline-none focus:border-metan-orange focus:ring-1 focus:ring-metan-orange/20 transition-all placeholder:text-slate-600"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/5 border border-red-500/20 text-red-400 p-2.5 rounded text-[11px]">
                                <ShieldAlert size={12} className="flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading || !password}
                            className="w-full bg-metan-orange text-white font-bold py-2.5 rounded text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:bg-orange-600 active:scale-[0.98] cursor-pointer disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed disabled:active:scale-100 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <Loader2 size={14} className="animate-spin" />
                            ) : (
                                "Giriş"
                            )}
                        </button>
                    </form>
                </div>

                <button 
                    onClick={() => router.push('/')}
                    className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-300 text-[10px] uppercase font-bold tracking-tighter mx-auto transition-colors cursor-pointer"
                >
                    <ArrowLeft size={10} />
                    Ana Sayfaya Dön
                </button>
            </div>
        </div>
    );
}