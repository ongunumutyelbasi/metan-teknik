"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ActionButton from '@/components/ui/ActionButton';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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
                // Redirect to your main dashboard after successful login
                router.push('/admin');
            } else {
                const data = await res.json();
                setError(data.error || 'Giriş başarısız');
            }
        } catch (err) {
            setError('Bir hata oluştu, lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sennheiser px-4">
            <div className="w-full max-w-md">
                <div className="mb-12 text-center">
                    <h1 className="text-[2.5rem] font-medium tracking-tight mb-2">Admin Paneli</h1>
                    <p className="text-dark-gray">Devam etmek için yönetici şifresini girin.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-[54px] px-4 border border-light-gray rounded-xl focus:outline-none focus:border-brand-hover-blue transition-colors text-[16px]"
                            autoFocus
                        />
                        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                    </div>

                    <ActionButton 
                        text={loading ? 'Giriş yapılıyor...' : 'Giriş Yap'} 
                        className="w-full h-[54px] justify-center"
                        onClick={() => {}} // Form submission handles this
                        type="submit"
                        disabled={loading}
                    />
                </form>
            </div>
        </div>
    );
}