import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { password, data } = await request.json();

        // 1. Security Check
        // Ensure process.env.ADMIN_PASSWORD is set to 'sennheiser_admin_2026' in your .env file
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Define Path
        const filePath = path.join(process.cwd(), 'src', 'data', 'sennheiser-products.ts');
        
        // 3. Construct File Content
        // We include both the import and the explicit export type so that 
        // other pages can still import the SennheiserProduct interface from this file.
        const fileContent = `import { SennheiserProduct } from '../types/product-schema';
export type { SennheiserProduct };

export const products: SennheiserProduct[] = ${JSON.stringify(data, null, 4)};`;

        // 4. Write File
        await writeFile(filePath, fileContent, 'utf-8');

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Save Error:', error);
        return NextResponse.json({ error: 'Failed to write file: ' + error.message }, { status: 500 });
    }
}