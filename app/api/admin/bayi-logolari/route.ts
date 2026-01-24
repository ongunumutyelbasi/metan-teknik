import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const uploadDir = path.join(process.cwd(), 'public', 'images', 'bayi-logolar');
        if (!fs.existsSync(uploadDir)) return NextResponse.json([]);

        const files = fs.readdirSync(uploadDir);
        // Filter for common image extensions
        const images = files
            .filter(file => /\.(jpg|jpeg|png|webp|avif|svg)$/i.test(file))
            .map(file => `/images/bayi-logolar/${file}`);

        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: 'Logolar yüklenemedi' }, { status: 500 });
    }
}