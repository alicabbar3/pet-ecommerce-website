import { reptileProducts } from './reptileProducts';

const subCatMap: Record<string, string> = {
  "Sürüngen Yemi": "reptile-food",
  "Teraryumlar": "terrariums",
  "UVB Aydınlatma": "uvb-lighting",
  "Nem ve Sıcaklık Ürünleri": "terrariums", // Reassigned
  "Sürüngen Bakım Ürünleri": "reptile-care",
  "Sürüngen Taban Malzemeleri": "terrariums", // Reassigned
  "Sürüngen Besleme Aksesuarları": "reptile-care", // Reassigned
  "Isıtıcı Lambalar": "uvb-lighting", // Reassigned
  "Sürüngen Sağlık Ürünleri": "reptile-health",
  "Sürüngen Dekorasyonları": "terrariums" // Reassigned
};

const REPTILE_IMAGES = [
  "https://images.unsplash.com/photo-1574066922258-005adfc22a94?q=80&w=400",
  "https://images.unsplash.com/photo-1596788574828-56af97ccad16?q=80&w=400",
  "https://images.unsplash.com/photo-1510255146860-264e12eec559?q=80&w=400",
  "https://images.unsplash.com/photo-1620021614949-06b24de8110b?q=80&w=400",
  "https://images.unsplash.com/photo-1616790877992-04ce714c7717?q=80&w=400"
];

export const MAPPED_REPTILE_PRODUCTS = reptileProducts.map((p) => {
  const subCategory = subCatMap[p.subCategory] || "reptile-food";
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
  
  // Reptile specific filters
  let reptileSpecies = undefined;
  if (nameLow.includes("kaplumbağa") || nameLow.includes("turtle") || nameLow.includes("tortoise")) reptileSpecies = "Kaplumbağa";
  else if (nameLow.includes("iguana")) reptileSpecies = "İguana";
  else if (nameLow.includes("gecko")) reptileSpecies = "Gecko";
  else if (nameLow.includes("ejder") || nameLow.includes("dragon")) reptileSpecies = "Sakallı Ejder";
  else if (nameLow.includes("bukalemun")) reptileSpecies = "Bukalemun";
  else if (nameLow.includes("yılan")) reptileSpecies = "Yılan";

  let terrariumSize = undefined;
  if (nameLow.includes("mini") || nameLow.includes("nano") || nameLow.includes("20x20")) terrariumSize = "Nano / Mini Boy";
  else if (nameLow.includes("büyük") || nameLow.includes("100x")) terrariumSize = "Büyük Boy";
  else if (subCategory === "terrariums") terrariumSize = "Standart Boy";

  let wattage = undefined;
  const wattageMatch = nameLow.match(/([0-9]+)\s*w/i);
  if (wattageMatch) wattage = wattageMatch[0].toUpperCase();

  let substrateMaterial = undefined;
  if (nameLow.includes("kum") || nameLow.includes("sand")) substrateMaterial = "Kum";
  else if (nameLow.includes("torf") || nameLow.includes("peat") || nameLow.includes("toprak")) substrateMaterial = "Torf / Toprak";
  else if (nameLow.includes("talaş") || nameLow.includes("kabuk")) substrateMaterial = "Ağaç Kabuğu / Talaş";

  return {
    id: `${subCategory}/${slug}`,
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
    _categoryId: "reptiles",
    _subCategoryId: subCategory,
    _categoryLabel: { EN: "Reptiles", TR: "Sürüngenler" },
    description: p.description,
    imageKeyword: p.imageKeyword,
    
    reptileSpecies,
    terrariumSize,
    wattage,
    substrateMaterial
  };
});
