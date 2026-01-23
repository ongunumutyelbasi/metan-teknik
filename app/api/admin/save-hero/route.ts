import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const password = formData.get('password');
        const slidesDataRaw = formData.get('slidesData') as string;

        if (password !== 'sennheiser_admin_2026') {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const slides = JSON.parse(slidesDataRaw);
        const uploadDir = path.join(process.cwd(), 'public', 'images', 'hero-slide');

        // Ensure the directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        // Process each slide and its potential new files
        const updatedSlides = await Promise.all(slides.map(async (slide: any, index: number) => {
            const productFile = formData.get(`product_${index}`) as File | null;
            const lifestyleFile = formData.get(`lifestyle_${index}`) as File | null;

            let productPath = slide.productImg;
            let lifestylePath = slide.lifestyleImg;

            // Save Product Image if uploaded
            if (productFile && typeof productFile !== 'string') {
                const buffer = Buffer.from(await productFile.arrayBuffer());
                const fileName = `prod_${Date.now()}_${productFile.name.replace(/\s+/g, '_')}`;
                await fs.writeFile(path.join(uploadDir, fileName), buffer);
                productPath = `/images/hero-slide/${fileName}`;
            }

            // Save Lifestyle Image if uploaded
            if (lifestyleFile && typeof lifestyleFile !== 'string') {
                const buffer = Buffer.from(await lifestyleFile.arrayBuffer());
                const fileName = `bg_${Date.now()}_${lifestyleFile.name.replace(/\s+/g, '_')}`;
                await fs.writeFile(path.join(uploadDir, fileName), buffer);
                lifestylePath = `/images/hero-slide/${fileName}`;
            }

            return {
                ...slide,
                productImg: productPath,
                lifestyleImg: lifestylePath
            };
        }));

        // Write the final JSON
        const jsonPath = path.join(process.cwd(), 'data', 'hero-slides.json');
        await fs.writeFile(jsonPath, JSON.stringify(updatedSlides, null, 2), 'utf-8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Save Error:', error);
        return NextResponse.json({ error: 'Sunucu hatası oluştu' }, { status: 500 });
    }
}