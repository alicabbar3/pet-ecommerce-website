import fs from 'fs';

const raw = fs.readFileSync('./src/staticProducts.ts', 'utf-8');
const jsonMatch = raw.match(/export const SORTED_MOCK_PRODUCTS: ProductWithCategory\[\] = (\[[\s\S]*\]);/);
if (jsonMatch) {
  const products = JSON.parse(jsonMatch[1]);
  const dogProducts = products.filter(p => p._categoryId === 'dogs');
  const fileContent = `import { ProductWithCategory } from './productGenerator';

export const DOG_PRODUCTS: ProductWithCategory[] = ${JSON.stringify(dogProducts, null, 2)};
`;
  fs.writeFileSync('./src/products_dog.ts', fileContent);
  if (fs.existsSync('./src/products_dog.ts.tsx')) {
    fs.rmSync('./src/products_dog.ts.tsx', { force: true });
  }
  console.log('Extracted ' + dogProducts.length + ' dog products.');
} else {
  console.log('Could not find json.');
}

