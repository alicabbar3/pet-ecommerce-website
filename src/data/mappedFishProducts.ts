import { fishProducts } from './fishProducts';

const subCatMap: Record<string, string> = {
  "Balık Yemi": "fish-food",
  "Akvaryumlar": "aquariums",
  "Akvaryum Dekorasyonları": "aquarium-decorations",
  "Su Düzenleyiciler": "water-conditioners",
  "Akvaryum Aydınlatma": "aquarium-lighting",
  "Akvaryum Isıtıcıları": "aquarium-heaters",
  "Akvaryum Filtreleri": "aquarium-filters",
  "Akvaryum Temizlik Ürünleri": "aquarium-cleaning",
  "Balık Sağlık Ürünleri": "fish-health"
};

const FISH_IMAGES = [
  "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=400",
  "https://images.unsplash.com/photo-1524704654690-b56c05c87aa5?q=80&w=400",
  "https://images.unsplash.com/photo-1579243734005-728f3227d825?q=80&w=400",
  "https://images.unsplash.com/photo-1517457782161-5368a5d3f25c?q=80&w=400",
  "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=400"
];

export const MAPPED_FISH_PRODUCTS = fishProducts.map((p) => {
  const subCategory = subCatMap[p.subCategory] || "fish-food";
  const numericalPrice = parseInt(p.price.replace(/ TL/g, "").replace(/\./g, ""), 10);
  
  const hasDiscount = p.id % 4 === 0;
  const discount = hasDiscount ? (p.id % 3) * 5 + 10 : 0; // 10%, 15% or 20%
  const oldPrice = hasDiscount ? Math.round(numericalPrice / (1 - discount / 100)) : undefined;

  const slug = p.name.toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const nameLow = p.name.toLowerCase();
  
  // Fish/Aquarium specific filters
  let waterType = undefined;
  if (nameLow.includes("marine") || nameLow.includes("deniz") || nameLow.includes("resif")) waterType = "Tuzlu Su (Marine)";
  else waterType = "Tatlı Su"; // Defaulting mostly to freshwater

  let fishType = undefined;
  if (nameLow.includes("cichlid") || nameLow.includes("ciklet")) fishType = "Cichlid";
  else if (nameLow.includes("japon") || nameLow.includes("goldfish")) fishType = "Japon Balığı";
  else if (nameLow.includes("betta")) fishType = "Betta";
  else if (nameLow.includes("discus")) fishType = "Discus";
  else if (nameLow.includes("vatoz") || nameLow.includes("pleco")) fishType = "Vatoz / Dip Balığı";

  let tankVolume = undefined;
  const volumeMatch = nameLow.match(/([0-9]+)\s*l/i) || p.description.match(/([0-9]+)\s*litre/i);
  if (volumeMatch) tankVolume = `${volumeMatch[1]} Litre`;

  return {
    id: `${subCategory}/${slug}`,
    name: { EN: p.name, TR: p.name },
    image: FISH_IMAGES[p.id % FISH_IMAGES.length],
    price: numericalPrice,
    oldPrice: oldPrice,
    discount: discount,
    rating: (4.0 + (p.id % 10) / 10), // e.g. 4.0 to 4.9
    reviews: (p.id % 50) * 10 + 25,
    sold: (p.id % 20) * 50 + 100,
    stock: (p.id % 10) * 10 + 10,
    badges: p.id % 3 === 0 ? ["Bestseller"] : (p.id % 5 === 0 ? ["New"] : []),
    brand: p.name.split(' ')[0], 
    _categoryId: "fish",
    _subCategoryId: subCategory,
    _categoryLabel: { EN: "Fish & Aquariums", TR: "Balık & Akvaryum" },
    description: p.description,
    imageKeyword: p.imageKeyword,
    
    waterType,
    fishType,
    tankVolume
  };
});
