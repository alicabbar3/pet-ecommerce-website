import { catProducts } from './catProducts';

const subCatMap: Record<string, string> = {
  "Kedi Kuru Mama": "cat-dry-food",
  "Kedi Taşıma & Seyahat Ürünleri": "cat-carriers",
  "Kedi Tuvaletleri": "cat-litter-boxes",
  "Kedi Oyuncakları": "cat-toys",
  "Kedi Tırmalama Ürünleri": "cat-scratchers",
  "Kedi Vitamin ve Takviyeleri": "cat-vitamins",
  "Kedi Sağlık Ürünleri": "cat-health",
  "Kedi Yaş Mama": "cat-wet-food",
  "Kedi Kumu": "cat-litter",
  "Kedi Yatakları": "cat-beds",
  "Kedi Ödül Maması": "cat-treats",
  "Kedi Tımar ve Bakım Ürünleri": "cat-grooming",
  "Kedi Mama ve Su Kapları": "cat-bowls",
};

const CAT_IMAGES = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400",
  "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=400",
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=400",
  "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=400",
  "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=400"
];

export const MAPPED_CAT_PRODUCTS = catProducts.map((p) => {
  const subCategory = subCatMap[p.subCategory] || "cat-dry-food";
  const numericalPrice = parseInt(p.price.replace(/ TL/g, "").replace(/\./g, ""), 10);
  
  const hasDiscount = p.id % 4 === 0;
  const discount = hasDiscount ? (p.id % 3) * 5 + 10 : 0; // 10%, 15% or 20%
  const oldPrice = hasDiscount ? Math.round(numericalPrice / (1 - discount / 100)) : undefined;

  const slug = p.name.toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return {
    id: `${subCategory.replace('cat-', '')}/${slug}`,
    name: { EN: p.name, TR: p.name },
    image: undefined,
    price: numericalPrice,
    oldPrice: oldPrice,
    discount: discount,
    rating: (4.0 + (p.id % 10) / 10), // e.g. 4.0 to 4.9
    reviews: (p.id % 50) * 10 + 25,
    sold: (p.id % 20) * 50 + 100,
    stock: (p.id % 10) * 10 + 10,
    badges: p.id % 3 === 0 ? ["Bestseller"] : (p.id % 5 === 0 ? ["New"] : []),
    brand: p.name.split(' ')[0], 
    _categoryId: "cats",
    _subCategoryId: subCategory,
    _categoryLabel: { EN: "Cats", TR: "Kediler" },
    description: p.description,
    imageKeyword: p.imageKeyword
  };
});
