import { rodentProducts } from './rodentProducts';

const subCatMap: Record<string, string> = {
  "Kemirgen Yemi": "rodent-food",
  "Kemirgen Kafesleri": "rodent-cages",
  "Kemirgen Taban Malzemesi": "rodent-bedding",
  "Kemirgen Yemlikleri ve Sulukları": "rodent-feeders",
  "Kemirgen Ödülleri": "rodent-treats",
  "Kemirgen Oyuncakları": "rodent-toys",
  "Kemirgen Hijyen Ürünleri": "rodent-hygiene",
  "Kemirgen Çarkları ve Egzersiz Ürünleri": "rodent-wheels",
  "Kemirgen Bakım Ürünleri": "rodent-care"
};

const RODENT_IMAGES = [
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=400",
  "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=400",
  "https://images.unsplash.com/photo-1582298538104-fe2e74c87720?q=80&w=400",
  "https://images.unsplash.com/photo-1533418579930-b30a1097fa31?q=80&w=400",
  "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=400"
];

export const MAPPED_RODENT_PRODUCTS = rodentProducts.map((p) => {
  const subCategory = subCatMap[p.subCategory] || "rodent-food";
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
  
  let smallPetSpecies = undefined;
  if (nameLow.includes("hamster")) smallPetSpecies = "Hamster";
  else if (nameLow.includes("tavşan") || nameLow.includes("rabbit")) smallPetSpecies = "Tavşan";
  else if (nameLow.includes("gine pig") || nameLow.includes("guinea pig") || nameLow.includes("cavia")) smallPetSpecies = "Gine Pig";
  else if (nameLow.includes("chinchilla") || nameLow.includes("çinçilla")) smallPetSpecies = "Çinçilla";
  else if (nameLow.includes("rat") || nameLow.includes("sıçan") || nameLow.includes("fare")) smallPetSpecies = "Sıçan / Fare";
  
  let feedType = undefined;
  if (nameLow.includes("pelet") || nameLow.includes("pellets")) feedType = "Pelet Yem";
  else if (nameLow.includes("müsli") || nameLow.includes("çekirdek") || nameLow.includes("karışım")) feedType = "Tohum & Karışım";
  else if (nameLow.includes("yonca") || nameLow.includes("ot")) feedType = "Kuru Ot & Yonca";
  else if (nameLow.includes("ödül") || nameLow.includes("kraker") || nameLow.includes("crock")) feedType = "Ödül & Kraker";

  let cageSize = undefined;
  if (nameLow.includes("büyük") || nameLow.includes("katlı") || nameLow.includes("suite") || nameLow.includes("maxi") || nameLow.includes("xl")) cageSize = "Büyük Boy";
  else if (nameLow.includes("mini") || nameLow.includes("taşıma") || nameLow.includes("küçük")) cageSize = "Küçük Boy";
  else if (subCategory === "rodent-cages") cageSize = "Standart Boy";

  let beddingMaterial = undefined;
  if (nameLow.includes("talaş") || nameLow.includes("çam")) beddingMaterial = "Talaş";
  else if (nameLow.includes("kâğıt") || nameLow.includes("kağıt") || nameLow.includes("paper")) beddingMaterial = "Kağıt";
  else if (nameLow.includes("kum") || nameLow.includes("sand")) beddingMaterial = "Kum";

  let weight = undefined;
  const weightMatch = nameLow.match(/([0-9]+)\s*(kg|gr|ml|L|litre)/i);
  if (weightMatch) weight = weightMatch[0].toUpperCase();

  return {
    id: `${subCategory.replace('rodent-', '')}/${slug}`,
    name: { EN: p.name, TR: p.name },
    image: undefined,
    price: numericalPrice,
    oldPrice: oldPrice,
    discount: discount,
    rating: (4.0 + (p.id % 10) / 10),
    reviews: (p.id % 50) * 10 + 25,
    sold: (p.id % 20) * 50 + 100,
    stock: (p.id % 10) * 10 + 10,
    badges: p.id % 3 === 0 ? ["Bestseller"] : (p.id % 5 === 0 ? ["New"] : []),
    brand: p.name.split(' ')[0], 
    _categoryId: "rodents",
    _subCategoryId: subCategory,
    _categoryLabel: { EN: "Rodents & Small Pets", TR: "Kemirgenler" },
    description: p.description,
    imageKeyword: p.imageKeyword,
    
    smallPetSpecies,
    feedType,
    cageSize,
    beddingMaterial,
    weight,
  };
});
