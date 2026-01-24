import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Using absolute paths to avoid confusion during build/runtime
const dataFilePath = path.join(process.cwd(), 'data', 'bayiler.json');
const uploadDir = path.join(process.cwd(), 'public', 'images', 'bayi-logolar');

export async function GET() {
    try {
        if (!fs.existsSync(dataFilePath)) {
            return NextResponse.json([]);
        }
        const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
        return NextResponse.json(JSON.parse(jsonData));
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: 'Veri okuma hatası' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const sectionsData = formData.get('sectionsData') as string;
        
        if (!sectionsData) {
            return NextResponse.json({ error: 'Veri bulunamadı' }, { status: 400 });
        }

        let sections = JSON.parse(sectionsData);

        // 1. Ensure the upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // 2. Process Files
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('logo_') && value instanceof File) {
                try {
                    const [_, sIdx, dIdx] = key.split('_').map(Number);
                    const file = value as File;
                    const buffer = Buffer.from(await file.arrayBuffer());
                    
                    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
                    const filePath = path.join(uploadDir, fileName);

                    // Write the image file
                    fs.writeFileSync(filePath, new Uint8Array(buffer));

                    // Update the JSON structure with the relative path for the frontend
                    if (sections[sIdx]?.dealers[dIdx]) {
                        sections[sIdx].dealers[dIdx].logo = `/images/bayi-logolar/${fileName}`;
                    }
                } catch (fileErr) {
                    console.error(`File processing error for ${key}:`, fileErr);
                }
            }
        }

        // 3. Ensure data directory exists
        const dataDir = path.dirname(dataFilePath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // 4. Save JSON
        fs.writeFileSync(dataFilePath, JSON.stringify(sections, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Başarıyla kaydedildi' });
    } catch (error: any) {
        // This will show up in your VS Code / Terminal console
        console.error("CRITICAL POST ERROR:", error.message);
        return NextResponse.json({ error: 'Sunucu hatası: ' + error.message }, { status: 500 });
    }
}