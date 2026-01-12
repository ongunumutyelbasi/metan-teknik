const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/sennheiser-products.ts');

try {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // 1. Find the start of the ACTUAL data (after the 'export const' line)
    const arrayStartMatch = fileContent.match(/export const sennheiserProducts(?::\s*\w+\[\])?\s*=\s*\[/);
    
    if (!arrayStartMatch) {
        throw new Error("Could not find the 'export const sennheiserProducts = [' line.");
    }

    const startIndex = fileContent.indexOf('[', arrayStartMatch.index);
    const endIndex = fileContent.lastIndexOf(']');

    if (startIndex === -1 || endIndex === -1) {
        throw new Error("Could not find the square brackets of the products array.");
    }

    const arrayText = fileContent.substring(startIndex, endIndex + 1);

    // 2. Safely evaluate the array text
    const products = eval(arrayText);

    // 3. Map the missing fields
    const updatedProducts = products.map(product => ({
        ...product,
        applicationTypes: product.applicationTypes || [],
        microphoneForm: product.microphoneForm || [],
        pickupPattern: product.pickupPattern || [],
        transducerType: product.transducerType || "",
        connection: product.connection || "",
        connectors: product.connectors || [],
        productSeries: product.productSeries || []
    }));

    // 4. Reconstruct the file
    const newArrayText = JSON.stringify(updatedProducts, null, 4);
    const newFileContent = fileContent.substring(0, startIndex) + 
                           newArrayText + 
                           fileContent.substring(endIndex + 1);

    fs.writeFileSync(filePath, newFileContent);
    console.log(`✅ Success! Updated ${updatedProducts.length} products.`);

} catch (error) {
    console.error("❌ Error:", error.message);
    console.log("Tip: Ensure your file has 'export const sennheiserProducts = [' before the data.");
}