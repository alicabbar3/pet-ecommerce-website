import { dogProducts } from './dogProducts';

const subCatMap: Record<string, string> = {
  "Köpek Kuru Mama": "dog-dry-food",
  "Köpek Oyuncakları": "dog-toys",
  "Köpek Yatakları": "dog-beds",
  "Köpek Vitamin ve Takviyeleri": "dog-vitamins",
  "Köpek Mama ve Su Kapları": "dog-bowls",
  "Köpek Tasmaları, Göğüs Tasmaları ve Kayışları": "dog-collars",
  "Köpek Konserve Mama": "dog-wet-food",
  "Köpek Tımar ve Bakım Ürünleri": "dog-grooming",
  "Köpek Şampuan ve Hijyen": "dog-shampoo",
  "Köpek Eğitim Ürünleri": "dog-training",
  "Köpek Sağlık Ürünleri": "dog-health",
  "Köpek Ödül Maması": "dog-treats",
  "Köpek Kıyafetleri": "dog-clothing",
  "Köpek Taşıma ve Seyahat Ürünleri": "dog-carriers",
};

const DOG_DRY_FOOD_IMAGES: Record<number, string> = {
  1: "/products/12.jpg",
  2: "/products/11.jpg",
  29: "/products/10.jpg",
  30: "/products/9.jpg",
  31: "/products/8.jpg",
  32: "/products/7.jpg",
  33: "/products/6.jpg",
  34: "/products/5.jpg",
  35: "/products/4.jpg",
  36: "/products/3.jpg",
  37: "/products/2.jpg",
  38: "/products/1.jpg",
};

export const MAPPED_DOG_PRODUCTS = dogProducts.map((p) => {
  const subCategory = subCatMap[p.subCategory] || "dog-dry-food";
  const numericalPrice = parseInt(p.price.replace(/ TL/g, "").replace(/\./g, ""), 10);
  
  const hasDiscount = p.id % 4 === 0;
  const discount = hasDiscount ? (p.id % 3) * 5 + 10 : 0; // 10%, 15% or 20%
  const oldPrice = hasDiscount ? Math.round(numericalPrice / (1 - discount / 100)) : undefined;

  return {
    id: `dog-prod-${p.id}`,
    name: { EN: p.name, TR: p.name },
    image: DOG_DRY_FOOD_IMAGES[p.id] || undefined,
    price: numericalPrice,
    oldPrice: oldPrice,
    discount: discount,
    rating: (4.0 + (p.id % 10) / 10), // e.g. 4.0 to 4.9
    reviews: (p.id % 50) * 10 + 25,
    sold: (p.id % 20) * 50 + 100,
    stock: (p.id % 10) * 10 + 10,
    badges: p.id % 3 === 0 ? ["Bestseller"] : (p.id % 5 === 0 ? ["New"] : []),
    brand: p.name.split(' ')[0], 
    _categoryId: "dogs",
    _subCategoryId: subCategory,
    _categoryLabel: { EN: "Dogs", TR: "Köpekler" },
    description: p.description,
    imageKeyword: p.imageKeyword
  };
});
