import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { password, data } = await request.json();

        // 1. Security Check
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Define Path
        const filePath = path.join(process.cwd(), 'src', 'data', 'sennheiser-products.ts');
        
        // 3. Construct File Content (UPDATED)
        // We now point to the correct schema file and use the correct Interface name
        const fileContent = `import { SennheiserProduct } from '../types/product-schema';

export const products: SennheiserProduct[] = ${JSON.stringify(data, null, 4)};`;

        // 4. Write File
        await writeFile(filePath, fileContent, 'utf-8');

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Save Error:', error);
        return NextResponse.json({ error: 'Failed to write file: ' + error.message }, { status: 500 });
    }
}