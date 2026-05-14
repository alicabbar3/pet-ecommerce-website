import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES } from './categories';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Filter, X, ChevronDown, Heart, Search, Check, ShoppingCart, Loader2, Minus, Plus, Package } from 'lucide-react';
import { useLang, t, Lang } from './i18n'; 

export type Product = {
  id: string;
  name: { EN: string, TR: string };
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number | null;
  reviews?: number | null;
  sold: number;
  badges: string[];
  
  brand: string;
  flavor?: string;
  weight?: string;
  age?: string;
  breedSize?: string;
  material?: string;
  color?: string;
};

// Generate deterministic dummy data based on ID
export function generateDummyProducts(categoryId: string, count: number): Product[] {
  let brands: string[] = [];
  let nouns: { en: string, tr: string, isFood?: boolean, flavorOrMat?: string }[] = [];
  let weights: string[] = [];
  let ages: string[] = [];
  let sizes: string[] = [];

  const catLower = categoryId.toLowerCase();
  const isDog = catLower.includes('dog');
  const isCat = catLower.includes('cat');
  const isBird = catLower.includes('bird') || catLower.includes('avian');
  const isFish = catLower.includes('fish') || catLower.includes('aquarium') || catLower.includes('aquatic');
  const isRodent = catLower.includes('rodent');
  const isReptile = catLower.includes('reptile') || catLower.includes('terrarium');
  
  if (isDog) {
    brands = ['Royal Canin', 'Pro Plan', 'Acana', 'Orijen', "Hill's Science Diet", 'Taste of the Wild', 'Blue Buffalo', 'KONG', 'Ruffwear', 'Chuckit!', 'Julius-K9', 'Nylabone'];
    nouns = [
      { en: 'Adult Dry Dog Food', tr: 'Yetişkin Kuru Köpek Maması', isFood: true, flavorOrMat: 'Chicken & Brown Rice' },
      { en: 'Grain-Free Puppy Formula', tr: 'Tahılsız Yavru Köpek Formülü', isFood: true, flavorOrMat: 'Salmon & Sweet Potato' },
      { en: 'Weight Management Kibble', tr: 'Kilo Kontrol Maması', isFood: true, flavorOrMat: 'Turkey & Venison' },
      { en: 'Orthopedic Memory Foam Bed', tr: 'Ortopedik Hafızalı Sünger Yatak', isFood: false, flavorOrMat: 'Plush Fabric' },
      { en: 'Heavy Duty Retractable Leash', tr: 'Ağır Hizmet Tipi Makaralı Tasma', isFood: false, flavorOrMat: 'Nylon' },
      { en: 'Extreme Chew Rubber Toy', tr: 'Ekstra Dayanıklı Kauçuk Sesli Oyuncak', isFood: false, flavorOrMat: 'Natural Rubber' },
      { en: 'No-Pull Training Harness', tr: 'Çekme Önleyici Eğitim Göğüs Tasması', isFood: false, flavorOrMat: 'Breathable Mesh' },
      { en: 'Dental Chew Sticks', tr: 'Diş Temizleyici Çiğneme Çubukları', isFood: true, flavorOrMat: 'Mint & Parsley' },
      { en: 'Oatmeal & Aloe Shampoo', tr: 'Yulaf ve Aloe Veralı Şampuan', isFood: false, flavorOrMat: 'Liquid' },
      { en: 'Joint Support Supplements', tr: 'Eklem Destek Takviyesi', isFood: true, flavorOrMat: 'Beef Liver' }
    ];
    weights = ['1.5 kg', '3 kg', '7 kg', '12 kg'];
    ages = ['Puppy', 'Adult', 'Senior'];
    sizes = ['Small Breed', 'Medium Breed', 'Large Breed'];
  } else if (isCat) {
    brands = ['Royal Canin', 'Pro Plan', 'N&D', 'Whiskas', 'Gimcat', 'Catit', 'Felix', 'Orijen', 'Tidy Cats', 'Ever Clean'];
    nouns = [
      { en: 'Indoor Dry Cat Food', tr: 'Evcil Kedi Kuru Maması', isFood: true, flavorOrMat: 'Chicken & Rice' },
      { en: 'Urinary Tract Health Formula', tr: 'İdrar Yolu Sağlığı Formülü', isFood: true, flavorOrMat: 'Ocean Fish' },
      { en: 'Hairball Control Paste', tr: 'Tüy Yumağı Önleyici Macun', isFood: true, flavorOrMat: 'Malt' },
      { en: 'Premium Wet Food Pouches', tr: 'Premium Yaş Mama Keseleri', isFood: true, flavorOrMat: 'Salmon in Gravy' },
      { en: 'Clumping Bentonite Litter', tr: 'Topaklanan Bentonit Kedi Kumu', isFood: false, flavorOrMat: 'Bentonite Clay' },
      { en: 'Flushable Tofu Litter', tr: 'Tuvalete Atılabilir Tofu Kum', isFood: false, flavorOrMat: 'Natural Tofu' },
      { en: 'Multi-Level Cat Tree', tr: 'Çok Katlı Tırmalama Ağacı', isFood: false, flavorOrMat: 'Sisal & Plush' },
      { en: 'Interactive Laser Toy', tr: 'İnteraktif Lazer Oyuncak', isFood: false, flavorOrMat: 'Plastic' },
      { en: 'Stainless Steel Water Fountain', tr: 'Paslanmaz Çelik Su Şelalesi', isFood: false, flavorOrMat: 'Stainless Steel' },
      { en: 'Self-Cleaning Litter Box', tr: 'Otomatik Temizlenen Kum Kabı', isFood: false, flavorOrMat: 'ABS Plastic' }
    ];
    weights = ['1.5 kg', '2 kg', '5 kg', '10 L', '10 kg'];
    ages = ['Kitten', 'Adult', 'Senior'];
    sizes = ['All Cats'];
  } else if (isBird) {
    brands = ['Versele-Laga', 'Hagen', 'ZuPreem', 'Kaytee', 'Vitakraft', 'Penn-Plax'];
    nouns = [
      { en: 'Premium Seed Blend', tr: 'Premium Tohum Karışımı', isFood: true, flavorOrMat: 'Mixed Seeds & Nuts' },
      { en: 'Fruit & Nut Pellets', tr: 'Meyveli ve Kuruyemişli Peletler', isFood: true, flavorOrMat: 'Tropical Fruit' },
      { en: 'Calcium Cuttlebone', tr: 'Kalsiyumlu Kalamar Kemiği', isFood: true, flavorOrMat: 'Natural Cuttlebone' },
      { en: 'Spacious Flight Cage', tr: 'Geniş Uçuş Kafesi', isFood: false, flavorOrMat: 'Powder-coated Metal' },
      { en: 'Natural Wood Perch', tr: 'Doğal Ahşap Tünek', isFood: false, flavorOrMat: 'Coffee Wood' },
      { en: 'Colorful Foraging Toy', tr: 'Renkli Yapboz Oyuncak', isFood: false, flavorOrMat: 'Wood & Paper' },
      { en: 'Hanging Bird Bath', tr: 'Asmalı Kuş Banyosu', isFood: false, flavorOrMat: 'Acrylic' }
    ];
    weights = ['500 g', '1 kg', '2.5 kg'];
    ages = ['All Life Stages'];
    sizes = ['Small Birds', 'Parrots'];
  } else if (isFish) {
    brands = ['Fluval', 'Tetra', 'Hikari', 'Seachem', 'API', 'Eheim', 'Aqueon'];
    nouns = [
      { en: 'Color Enhancing Flakes', tr: 'Renk Arttırıcı Pul Yem', isFood: true, flavorOrMat: 'Shrimp & Algae' },
      { en: 'Bottom Feeder Wafers', tr: 'Dip Yemi Gofretleri', isFood: true, flavorOrMat: 'Spirulina' },
      { en: 'Canister Filter 1000L/H', tr: 'Dış Filtre 1000L/S', isFood: false, flavorOrMat: 'Plastic & Ceramic' },
      { en: 'Submersible Aquarium Heater', tr: 'Dalgıç Akvaryum Isıtıcı', isFood: false, flavorOrMat: 'Quartz Glass' },
      { en: 'Water Conditioner & Dechlorinator', tr: 'Su Düzenleyici ve Klor Giderici', isFood: false, flavorOrMat: 'Liquid Solution' },
      { en: 'LED Planted Tank Light', tr: 'Bitkili Akvaryum LED Aydınlatma', isFood: false, flavorOrMat: 'Aluminum' },
      { en: 'Natural Driftwood Decor', tr: 'Doğal Yati Kökü Dekor', isFood: false, flavorOrMat: 'Wood' }
    ];
    weights = ['50 g', '100 g', '250 g', '500 ml'];
    ages = ['All Life Stages'];
    sizes = ['All Fish'];
  } else if (isRodent) {
    brands = ['Oxbow', 'Supreme Petfoods', 'Mazuri', 'Kaytee', 'Living World', 'Ferplast'];
    nouns = [
      { en: 'Timothy Hay First Cut', tr: 'Birinci Hasat Timothy Otu', isFood: true, flavorOrMat: 'Timothy Hay' },
      { en: 'Adult Guinea Pig Pellets', tr: 'Yetişkin Ginepig Pelet Yemi', isFood: true, flavorOrMat: 'Alfalfa & Vitamin C' },
      { en: 'Paper Bedding Odor Control', tr: 'Koku Kontrollü Kağıt Taban Malzemesi', isFood: false, flavorOrMat: 'Recycled Paper' },
      { en: 'Silent Spinner Wheel', tr: 'Sessiz Egzersiz Çarkı', isFood: false, flavorOrMat: 'Plastic & Ball Bearings' },
      { en: 'Wooden Hideout Hut', tr: 'Ahşap Saklanma Evi', isFood: false, flavorOrMat: 'Pine Wood' },
      { en: 'Apple Wood Chew Sticks', tr: 'Elma Ağacı Çiğneme Çubukları', isFood: true, flavorOrMat: 'Apple Wood' }
    ];
    weights = ['500 g', '1 kg', '2 kg', '10 L'];
    ages = ['Young', 'Adult'];
    sizes = ['Small Rodent', 'Rabbit/Guinea Pig'];
  } else if (isReptile) {
    brands = ['Exo Terra', 'Zoo Med', 'Fluker\'s', 'Repashy', 'Zilla', 'Arcadia'];
    nouns = [
      { en: 'Crusted Gecko Diet', tr: 'Krested Geko Besini', isFood: true, flavorOrMat: 'Papaya & Mango' },
      { en: 'Calcium Powder with D3', tr: 'D3 Vitaminli Kalsiyum Tozu', isFood: true, flavorOrMat: 'Calcium Carbonate' },
      { en: 'UVB T5 Fluorescent Bulb', tr: 'UVB T5 Floresan Ampul', isFood: false, flavorOrMat: 'Glass' },
      { en: 'Digital Thermometer & Hygrometer', tr: 'Dijital Termometre & Higrometre', isFood: false, flavorOrMat: 'Electronic' },
      { en: 'Heat Mat with Thermostat', tr: 'Termostatlı Isıtıcı Ped', isFood: false, flavorOrMat: 'PVC' },
      { en: 'Coco Husk Substrate', tr: 'Hindistan Cevizi Torfu', isFood: false, flavorOrMat: 'Coconut Fiber' }
    ];
    weights = ['100 g', '250 g', '1 kg', '8 L'];
    ages = ['All Life Stages'];
    sizes = ['All Reptiles'];
  } else {
    // Generic fallback for mixed "personalized" categories
    brands = ['Pro Plan', 'Royal Canin', 'Trixie', 'KONG', 'Orijen', 'Versele-Laga', 'Tetra'];
    nouns = [
      { en: 'Premium Pet Nutrition Set', tr: 'Premium Evcil Hayvan Beslenme Seti', isFood: true, flavorOrMat: 'Mixed Proteins' },
      { en: 'Luxury Pet Bed', tr: 'Lüks Evcil Hayvan Yatağı', isFood: false, flavorOrMat: 'Plush & Memory Foam' },
      { en: 'Advanced Pet Care Kit', tr: 'Gelişmiş Evcil Hayvan Bakım Seti', isFood: false, flavorOrMat: 'Various' },
      { en: 'Automatic Smart Feeder', tr: 'Otomatik Akıllı Besleyici', isFood: false, flavorOrMat: 'BPA-free Plastic & Metal' },
      { en: 'Interactive Training Toy', tr: 'İnteraktif Eğitim Oyuncağı', isFood: false, flavorOrMat: 'Durable Rubber' }
    ];
    weights = ['1 kg', '2 kg', '5 kg'];
    ages = ['All Life Stages'];
    sizes = ['All Sizes'];
  }
  
  const products: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const seed = i * 1337 + categoryId.length * 7;
    
    const brand = brands[seed % brands.length];
    const noun = nouns[seed % nouns.length];
    const isEdible = noun.isFood;
    
    let flavor, weight, age, breedSize, material;
    
    if (isEdible) {
      flavor = noun.flavorOrMat;
      weight = weights[seed % weights.length];
      age = ages[seed % ages.length];
      if (isDog || isCat || isRodent) breedSize = sizes[seed % sizes.length];
    } else {
      material = noun.flavorOrMat;
      if (isDog || isCat || isBird || isRodent || isReptile) {
         breedSize = sizes[seed % sizes.length];
      }
    }
    
    // Calculate realistic price based on category
    let basePrice = 50;
    if (noun.en.includes('Food') || noun.en.includes('Kibble') || noun.en.includes('Formula') || noun.en.includes('Diet') || noun.en.includes('Pellets')) {
      basePrice = isDog || isCat ? 400 + (seed % 1500) : 100 + (seed % 300);
    } else if (noun.en.includes('Wet') || noun.en.includes('Pouches') || noun.en.includes('Paste')) {
      basePrice = 40 + (seed % 60);
    } else if (noun.en.includes('Treat') || noun.en.includes('Chew') || noun.en.includes('Sticks')) {
      basePrice = 80 + (seed % 150);
    } else if (noun.en.includes('Toy') || noun.en.includes('Leash')) {
      basePrice = 150 + (seed % 300);
    } else if (noun.en.includes('Bed') || noun.en.includes('Tree') || noun.en.includes('Fountain') || noun.en.includes('Filter') || noun.en.includes('Cage')) {
      basePrice = 800 + (seed % 3000);
    } else if (noun.en.includes('Litter') || noun.en.includes('Substrate') || noun.en.includes('Bedding')) {
      basePrice = 200 + (seed % 300);
    } else {
      basePrice = 150 + (seed % 800);
    }

    const hasDiscount = i % 5 === 0 && basePrice > 100;
    const discount = hasDiscount ? 10 + (seed % 30) : 0;
    const price = hasDiscount ? basePrice * (1 - discount / 100) : basePrice;
    
    // Choose realistic Unsplash placeholders
    let imageKeyword = 'pet%20supplies';
    if (isDog) imageKeyword = isEdible ? 'dog%20food' : 'dog%20toy';
    if (isCat) imageKeyword = isEdible ? 'cat%20food' : 'cat%20toy';
    if (isBird) imageKeyword = 'bird%20cage';
    if (isFish) imageKeyword = 'aquarium';
    if (isReptile) imageKeyword = 'reptile%20terrarium';
    
    // Specific noun bypasses
    if (noun.en.toLowerCase().includes('shampoo')) imageKeyword = 'pet%20shampoo';
    if (noun.en.toLowerCase().includes('bed')) imageKeyword = 'dog%20bed';
    if (noun.en.toLowerCase().includes('fountain')) imageKeyword = 'cat%20water%20fountain';
    
    const imageUrl = `https://source.unsplash.com/400x400/?${imageKeyword}&sig=${seed}`;

    const generateBadges = () => {
      const b = [];
      if (seed % 5 === 0) b.push('New');
      if (seed % 7 === 0) b.push('Bestseller');
      if (seed % 11 === 0) b.push('Limited');
      return b.slice(0, 2);
    };
    
    let nameEN = `${brand} ${noun.en}`;
    let nameTR = `${brand} ${noun.tr}`;
    if (isEdible && weight) {
      nameEN += ` ${weight}`;
      nameTR += ` ${weight}`;
    }

    products.push({
      id: `${categoryId}-prod-${i}`,
      name: { 
        EN: nameEN, 
        TR: nameTR
      },
      image: imageUrl,
      price: Math.round(price * 100) / 100,
      oldPrice: hasDiscount ? basePrice : undefined,
      discount: hasDiscount ? discount : undefined,
      rating: null,
      reviews: null,
      sold: seed % 2000,
      badges: generateBadges(),
      
      brand,
      flavor,
      weight,
      age,
      breedSize,
      material,
    });
  }
  
  return products;
}

export default function CategoryPage({ 
  categoryId, 
  onAddToCart, 
  wishlistItems, 
  onToggleWishlist,
  userPets = [],
  selectedPets = []
}: { 
  categoryId: string, 
  onAddToCart: (name: string, quantity?: number, price?: number) => void,
  wishlistItems: string[],
  onToggleWishlist: (name: string) => void,
  userPets?: any[],
  selectedPets?: string[]
}) {
  const { lang } = useLang();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  
  // Find category info
  const subcategory = useMemo(() => {
    if (categoryId === 'personalized') {
      return {
        parent: { name: { EN: "Catalog", TR: "Katalog" } },
        sub: { name: { EN: "Your Personalized Catalog", TR: "Sizin İçin Özel Seçimler" } }
      } as any;
    }
    for (const cat of CATEGORIES) {
      const sub = cat.subcategories.find(s => s.id === categoryId);
      if (sub) return { parent: cat, sub };
    }
    return {
      parent: { name: { EN: "Catalog", TR: "Katalog" } },
      sub: { name: { EN: categoryId, TR: categoryId } }
    } as any;
  }, [categoryId]);

  // Filters state
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading data
    setProducts([]);
    const timer = setTimeout(() => {
      if (categoryId === 'personalized') {
        const combinedPets = Array.from(new Set([
          ...selectedPets.map(p => p.toLowerCase()),
          ...userPets.filter(p => p.name && p.type).map(p => p.type.toLowerCase())
        ]));
        if (combinedPets.length === 0) {
          // fallback to dogs
          setProducts(generateDummyProducts('dogs', 48));
        } else {
          // Generate an array of products matching those pets
          let mixedProducts: Product[] = [];
          for (const pet of combinedPets) {
             const items = generateDummyProducts(pet + 's', Math.floor(48 / combinedPets.length));
             mixedProducts = [...mixedProducts, ...items];
          }
          setProducts(mixedProducts.sort(() => 0.5 - Math.random()));
        }
      } else {
        setProducts(generateDummyProducts(categoryId, 48));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [categoryId, userPets, selectedPets]);

  // Derive filter options from products
  const availableBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);
  const availableFlavors = useMemo(() => Array.from(new Set(products.map(p => p.flavor).filter(Boolean) as string[])), [products]);
  const availableWeights = useMemo(() => Array.from(new Set(products.map(p => p.weight).filter(Boolean) as string[])), [products]);
  const availableAges = useMemo(() => Array.from(new Set(products.map(p => p.age).filter(Boolean) as string[])), [products]);
  const availableSizes = useMemo(() => Array.from(new Set(products.map(p => p.breedSize).filter(Boolean) as string[])), [products]);
  const availableMaterials = useMemo(() => Array.from(new Set(products.map(p => p.material).filter(Boolean) as string[])), [products]);

  // Filter and sort
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedFlavors.length > 0 && p.flavor && !selectedFlavors.includes(p.flavor)) return false;
      if (selectedWeights.length > 0 && p.weight && !selectedWeights.includes(p.weight)) return false;
      if (selectedAges.length > 0 && p.age && !selectedAges.includes(p.age)) return false;
      if (selectedSizes.length > 0 && p.breedSize && !selectedSizes.includes(p.breedSize)) return false;
      if (selectedMaterials.length > 0 && p.material && !selectedMaterials.includes(p.material)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return b.sold - a.sold; // recommended / bestseller
    });
  }, [products, selectedBrands, priceRange, selectedFlavors, selectedWeights, sortBy]);

  const toggleFilter = (setFn: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setFn(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  if (!subcategory) {
    return <div className="py-32 text-center">Category not found</div>;
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between lg:hidden mb-4 border-b border-border pb-4">
        <h3 className="font-bold text-lg">{lang === 'TR' ? 'Filtreler' : 'Filters'}</h3>
        <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-secondary rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Brands */}
      <FilterSection title={lang === 'TR' ? 'Marka' : 'Brand'}>
        <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
          {availableBrands.map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedBrands.includes(b) ? 'bg-brand-teal border-brand-teal text-white' : 'border-input bg-card group-hover:border-brand-teal'}`}>
                {selectedBrands.includes(b) && <Check className="w-3.5 h-3.5" />}
              </div>
              <span className="text-sm text-foreground">{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title={lang === 'TR' ? 'Fiyat Aralığı' : 'Price Range'}>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            value={priceRange[0]} 
            onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal"
            placeholder="Min"
          />
          <span className="text-muted-foreground">-</span>
          <input 
            type="number" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 5000])}
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal"
            placeholder="Max"
          />
        </div>
      </FilterSection>

      {/* Flavors */}
      {availableFlavors.length > 0 && (
        <FilterSection title={lang === 'TR' ? 'Lezzet/İçerik' : 'Flavor/Taste'}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableFlavors.map(f => (
              <label key={f} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedFlavors.includes(f)}
                  onChange={() => toggleFilter(setSelectedFlavors, f)}
                  className="hidden" 
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedFlavors.includes(f) ? 'bg-brand-teal border-brand-teal text-white' : 'border-input bg-card group-hover:border-brand-teal'}`}>
                  {selectedFlavors.includes(f) && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm text-foreground">{t(f, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Materials */}
      {availableMaterials.length > 0 && (
        <FilterSection title={lang === 'TR' ? 'Materyal' : 'Material'}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableMaterials.map(m => (
              <label key={m} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedMaterials.includes(m)}
                  onChange={() => toggleFilter(setSelectedMaterials, m)}
                  className="hidden" 
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedMaterials.includes(m) ? 'bg-brand-teal border-brand-teal text-white' : 'border-input bg-card group-hover:border-brand-teal'}`}>
                  {selectedMaterials.includes(m) && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm text-foreground">{t(m, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Ages */}
      {availableAges.length > 0 && (
        <FilterSection title={lang === 'TR' ? 'Yaş Grubu' : 'Age Range'}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableAges.map(a => (
              <label key={a} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedAges.includes(a)}
                  onChange={() => toggleFilter(setSelectedAges, a)}
                  className="hidden" 
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedAges.includes(a) ? 'bg-brand-teal border-brand-teal text-white' : 'border-input bg-card group-hover:border-brand-teal'}`}>
                  {selectedAges.includes(a) && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm text-foreground">{t(a, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Sizes */}
      {availableSizes.length > 0 && (
        <FilterSection title={lang === 'TR' ? 'Boyut / Tür' : 'Size / Type'}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableSizes.map(s => (
              <label key={s} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedSizes.includes(s)}
                  onChange={() => toggleFilter(setSelectedSizes, s)}
                  className="hidden" 
                />
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedSizes.includes(s) ? 'bg-brand-teal border-brand-teal text-white' : 'border-input bg-card group-hover:border-brand-teal'}`}>
                  {selectedSizes.includes(s) && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm text-foreground">{t(s, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Weights */}
      {availableWeights.length > 0 && (
        <FilterSection title={lang === 'TR' ? 'Ağırlık' : 'Package Weight'}>
          <div className="grid grid-cols-2 gap-2">
            {availableWeights.map(w => (
              <button
                key={w}
                onClick={() => toggleFilter(setSelectedWeights, w)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${selectedWeights.includes(w) ? 'bg-brand-teal/10 border-brand-teal text-brand-teal' : 'bg-card border-input text-muted-foreground hover:border-brand-teal/50'}`}
              >
                {w}
              </button>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30 pt-4 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} className="hover:text-brand-teal transition-colors">Vivia</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{subcategory.parent.name[lang]}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-foreground">{subcategory.sub.name[lang]}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-1">
              {subcategory.sub.name[lang]}
            </h1>
            <p className="text-muted-foreground text-sm">
              {products.length > 0 ? (lang === 'TR' ? `${products.length} ürün bulundu` : `${products.length} products found`) : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-card border border-border rounded-2xl p-5 shadow-sm">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar for Mobile Filter Toggle & Sorting */}
            <div className="flex items-center justify-between lg:justify-end mb-6 gap-4">
              <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-card border border-border px-4 py-2.5 rounded-xl font-medium text-sm text-foreground hover:bg-secondary active:scale-95 transition-all"
              >
                <Filter className="w-4 h-4" />
                {lang === 'TR' ? 'Filtreler' : 'Filters'}
              </button>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                  {lang === 'TR' ? 'Sırala:' : 'Sort by:'}
                </span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all cursor-pointer"
                  >
                    <option value="recommended">{lang === 'TR' ? 'Önerilen' : 'Recommended'}</option>
                    <option value="newest">{lang === 'TR' ? 'En Yeniler' : 'Newest'}</option>
                    <option value="rating">{lang === 'TR' ? 'En Yüksek Puan' : 'Highest Rated'}</option>
                    <option value="price-low">{lang === 'TR' ? 'Fiyat: Artan' : 'Price: Low to High'}</option>
                    <option value="price-high">{lang === 'TR' ? 'Fiyat: Azalan' : 'Price: High to Low'}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-brand-teal mb-4" />
                <p>{lang === 'TR' ? 'Ürünler yükleniyor...' : 'Loading products...'}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{lang === 'TR' ? 'Ürün Bulunamadı' : 'No Products Found'}</h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  {lang === 'TR' ? 'Seçtiğiniz filtrelere uygun ürün bulamadık. Lütfen farklı seçenekler deneyin.' : 'We couldnt find any products matching your filters. Please try different options.'}
                </p>
                <button 
                  onClick={() => {
                    setSelectedBrands([]);
                    setPriceRange([0, 5000]);
                    setSelectedFlavors([]);
                    setSelectedWeights([]);
                    setSelectedAges([]);
                    setSelectedSizes([]);
                    setSelectedMaterials([]);
                  }}
                  className="mt-6 font-bold text-brand-teal hover:underline"
                >
                  {lang === 'TR' ? 'Filtreleri Temizle' : 'Clear Filters'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-8">
                  {filteredProducts.map(product => (
                    <ProductListingCard 
                      key={product.id}
                      product={product}
                      lang={lang}
                      onAddToCart={onAddToCart}
                      isWishlisted={wishlistItems.includes(product.name.EN)}
                      onToggleWishlist={onToggleWishlist}
                    />
                  ))}
                </div>
                
                {/* Pagination / Load More */}
                {filteredProducts.length > 0 && (
                  <div className="flex flex-col items-center justify-center pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      {lang === 'TR' ? `${filteredProducts.length} ürün gösteriliyor` : `Showing ${filteredProducts.length} products`}
                    </p>
                    <button className="px-8 py-3 rounded-xl border-2 border-brand-teal text-brand-teal font-bold hover:bg-brand-teal hover:text-white transition-all active:scale-95 flex items-center gap-2">
                      {lang === 'TR' ? 'Daha Fazla Yükle' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 z-[150] lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-md bg-background shadow-2xl z-[160] lg:hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-6">
                <FilterSidebar />
              </div>
              <div className="p-4 border-t border-border bg-card">
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full bg-brand-teal text-white py-3.5 rounded-xl font-bold active:scale-95 transition-all"
                >
                  {lang === 'TR' ? `Sonuçları Göster (${filteredProducts.length})` : `Show Results (${filteredProducts.length})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Subcomponents

function FilterSection({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 mb-2 group"
      >
        <span className="font-semibold text-sm text-foreground tracking-tight">{title}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const ProductListingCard: React.FC<{ 
  product: Product,
  lang: string,
  onAddToCart: (name: string, quantity?: number, price?: number) => void,
  isWishlisted: boolean,
  onToggleWishlist: (name: string) => void
}> = ({ 
  product, 
  lang,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-card rounded-2xl border border-border hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-500 flex flex-col group overflow-hidden relative">
      {/* Image & Badges Container */}
      <div className="aspect-[4/5] sm:aspect-square relative bg-secondary/20 overflow-hidden flex items-center justify-center p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.discount && (
            <div className="bg-[#E27D60] text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              -{Math.round(product.discount)}%
            </div>
          )}
          {product.badges.map(b => (
            <div key={b} className="bg-foreground text-background text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              {lang === 'TR' && b === 'New' ? 'Yeni' : b === 'Bestseller' ? (lang === 'TR' ? 'Çok Satan' : b) : b}
            </div>
          ))}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); onToggleWishlist(product.name.EN); }}
          className={`absolute top-3 right-3 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all bg-background/90 backdrop-blur-md shadow-sm border border-border/50 hover:scale-105 active:scale-95 ${isWishlisted ? 'text-[#E27D60] border-[#E27D60]/20' : 'text-muted-foreground hover:text-brand-teal'}`}
        >
          <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${isWishlisted ? 'fill-[#E27D60]' : ''}`} />
        </button>

        <Package className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground/20 group-hover:scale-110 group-hover:text-brand-teal/40 transition-all duration-700 ease-out" />

        {/* Desktop Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 hidden lg:flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="flex items-center justify-between border border-white/20 rounded-xl overflow-hidden bg-background/95 backdrop-blur-md shadow-lg">
            <button 
              onClick={(e) => { e.preventDefault(); setQuantity(Math.max(1, quantity - 1)); }}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-brand-teal hover:bg-secondary active:scale-95 transition-all duration-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-semibold text-foreground text-sm min-w-[20px] text-center">{quantity}</span>
            <button 
              onClick={(e) => { e.preventDefault(); setQuantity(quantity + 1); }}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-brand-teal hover:bg-secondary active:scale-95 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); onAddToCart(product.name.EN, quantity, product.price); setQuantity(1); }}
            className="w-full bg-brand-teal text-white font-bold py-2.5 rounded-xl shadow-[0_4px_14px_0_rgba(45,212,191,0.39)] hover:bg-brand-teal-dark active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {lang === 'TR' ? 'Sepete Ekle' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Info Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 relative bg-card z-10">
        <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-2">
          <span className="truncate">{product.brand}</span>
          {product.weight && (
            <>
              <span className="w-1 h-1 rounded-full bg-border"></span>
              <span className="truncate">{product.weight}</span>
            </>
          )}
        </div>
        <h3 className="font-semibold text-sm sm:text-base text-foreground leading-snug line-clamp-2 min-h-[2.75rem] mb-2 group-hover:text-brand-teal transition-colors">
          {product.name[lang as 'EN' | 'TR'] || product.name.EN}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-4 min-h-[1.25rem]">
          {product.rating != null && product.reviews != null ? (
            <>
              <div className="flex text-[#F4A261] text-[10px] sm:text-xs">
                {'★'.repeat(Math.round(product.rating))}
                <span className="text-muted-foreground opacity-30">{'★'.repeat(5 - Math.round(product.rating))}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">({product.reviews})</span>
            </>
          ) : (
             <span className="text-[10px] sm:text-xs text-muted-foreground/60 italic">{lang === 'TR' ? 'Henüz değerlendirme yok' : 'No reviews'}</span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-border/60 flex flex-col gap-3">
          <div className="flex items-end justify-between gap-2 w-full">
            <div className="flex flex-col">
              {product.oldPrice && (
                <span className="text-[10px] sm:text-xs text-muted-foreground/60 line-through decoration-muted-foreground/40 font-medium mb-0.5">
                  ₺{product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className={`text-base sm:text-lg lg:text-xl font-extrabold tracking-tight ${product.discount ? 'text-[#E27D60]' : 'text-foreground'}`}>
                ₺{product.price.toFixed(2)}
              </span>
            </div>
            
            {/* Mobile / Tablet Add to Cart Button */}
            <button 
              onClick={(e) => { e.preventDefault(); onAddToCart(product.name.EN, 1, product.price); }}
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-teal text-white flex items-center justify-center hover:bg-brand-teal-dark active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(45,212,191,0.2)]"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
