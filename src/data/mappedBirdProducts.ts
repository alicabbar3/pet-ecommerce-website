import { birdProducts } from './birdProducts';

const subCatMap: Record<string, string> = {
  "Kuş Yemi": "bird-food",
  "Kuş Kafesleri": "bird-cages",
  "Kuş Kafes Aksesuarları": "bird-cage-accessories",
  "Kuş Oyuncakları": "bird-toys",
  "Kuş Vitamin ve Takviyeleri": "bird-vitamins",
  "Kuş Hijyen Ürünleri": "bird-hygiene",
  "Kuş Ödülleri": "bird-treats",
  "Kuş Tünekleri": "bird-perches",
  "Kuş Bakım Ürünleri": "bird-care",
  "Kuş Yemlikleri ve Sulukları": "bird-feeders"
};

const BIRD_IMAGES = [
  "https://images.unsplash.com/photo-1552728089-57168de0a716?q=80&w=400",
  "https://images.unsplash.com/photo-1444464666168-49b626d0ce0a?q=80&w=400",
  "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=400",
  "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?q=80&w=400",
  "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?q=80&w=400"
];

export const MAPPED_BIRD_PRODUCTS = birdProducts.map((p) => {
  const subCategory = subCatMap[p.subCategory] || "bird-food";
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
  
  let birdSpecies = undefined;
  if (nameLow.includes("muhabbet")) birdSpecies = "Muhabbet Kuşu";
  else if (nameLow.includes("kanarya")) birdSpecies = "Kanarya";
  else if (nameLow.includes("papağan")) birdSpecies = "Papağan";
  else if (nameLow.includes("sultan")) birdSpecies = "Sultan Papağanı";
  else if (nameLow.includes("bülbül")) birdSpecies = "Hint Bülbülü";

  let feedType = undefined;
  if (nameLow.includes("yem") || nameLow.includes("tohum") || nameLow.includes("dar")) feedType = "Tohum & Yem";
  else if (nameLow.includes("kraker") || nameLow.includes("ödül")) feedType = "Ödül & Kraker";
  else if (nameLow.includes("kum")) feedType = "Kuş Kumu";

  let cageSize = undefined;
  if (nameLow.includes("büyük") || nameLow.includes("katlı") || nameLow.includes("boy")) cageSize = "Büyük Boy";
  else if (nameLow.includes("küçük") || nameLow.includes("mini") || nameLow.includes("taşıma")) cageSize = "Küçük Boy";
  else if (subCategory === "bird-cages") cageSize = "Standart Boy";

  let material = undefined;
  if (nameLow.includes("ahşap") || nameLow.includes("ağaç") || nameLow.includes("tahta")) material = "Ahşap";
  else if (nameLow.includes("çelik") || nameLow.includes("metal") || nameLow.includes("pirinç")) material = "Çelik / Metal";
  else if (nameLow.includes("plastik") || nameLow.includes("akrilik")) material = "Plastik / Akrilik";

  let weight = undefined;
  const weightMatch = nameLow.match(/([0-9]+)\s*(kg|gr|ml)/);
  if (weightMatch) weight = weightMatch[0].toUpperCase();

  return {
    id: `${subCategory.replace('bird-', '')}/${slug}`,
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
    _categoryId: "birds",
    _subCategoryId: subCategory,
    _categoryLabel: { EN: "Birds", TR: "Kuşlar" },
    description: p.description,
    imageKeyword: p.imageKeyword,
    
    birdSpecies,
    feedType,
    cageSize,
    material,
    weight,
  };
});
