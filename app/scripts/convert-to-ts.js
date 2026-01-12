const fs = require('fs');
const path = require('path');

// Adjusted paths to navigate from app/scripts/ up to the root
const inputFilePath = path.join(__dirname, '../../app/overviewPage');
const outputFilePath = path.join(__dirname, '../../src/data/sennheiser-products.ts');

if (!fs.existsSync(inputFilePath)) {
    console.error(`Error: Could not find file at ${inputFilePath}`);
    process.exit(1);
}

const rawContent = fs.readFileSync(inputFilePath, 'utf8');
const jsonData = JSON.parse(rawContent);

// Navigating the Next.js data structure in your uploaded file [cite: 1785]
const products = jsonData[0].result.data.data.products;

const allProducts = products.map(p => {
    // Parsing Article Number from the end of the href [cite: 1786, 1788, 1791]
    const articleMatch = p.href.match(/-(\d+)$/);
    
    return {
        id: p.id,
        articleNo: articleMatch ? articleMatch[1] : "N/A",
        name: p.name,
        category: p.tags?.find(t => t.parentSlug === 'product+type')?.name || 'Microphones',
        link: `https://www.sennheiser.com${p.href}`
    };
});

const tsContent = `
export interface SennheiserProduct {
    id: number;
    articleNo: string;
    name: string;
    category: string;
    link: string;
}

export const sennheiserProducts: SennheiserProduct[] = ${JSON.stringify(allProducts, null, 4)};
`;

const dir = path.dirname(outputFilePath);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(outputFilePath, tsContent);

console.log(`Success! ${allProducts.length} products exported to src/data/sennheiser-products.ts`);