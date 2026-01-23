import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const category = formData.get('category') as string;
        const productName = formData.get('productName') as string;
        const files = formData.getAll('files') as File[];

        if (!category || !productName || files.length === 0) {
            return NextResponse.json({ error: 'Eksik bilgi' }, { status: 400 });
        }

        // URL-friendly product name
        const folderName = productName.toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        // Category folder name
        const catFolder = category.toLowerCase().replace(/\s+/g, '-');

        const targetDir = path.join(process.cwd(), 'public', 'images', 'sennheiser', catFolder, folderName);

        // Ensure directory exists
        await fs.mkdir(targetDir, { recursive: true });

        const savedPaths = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.type.split('/')[1] || 'webp';
            const fileName = `${folderName}-${i + 1}.${extension}`;
            const filePath = path.join(targetDir, fileName);
            
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(filePath, buffer);
            
            // Path to store in JSON
            savedPaths.push(`/images/sennheiser/${catFolder}/${folderName}/${fileName}`);
        }

        return NextResponse.json({ paths: savedPaths });
    } catch (error) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}