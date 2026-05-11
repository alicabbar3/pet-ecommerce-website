import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES } from './categories';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Filter, X, ChevronDown, Heart, Search, Check, ShoppingCart, Loader2, Minus, Plus, Package } from 'lucide-react';
import { useLang, t } from './App'; 

export type Product = {
  id: string;
  name: string;
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
function generateDummyProducts(categoryId: string, count: number): Product[] {
  let brands: string[] = [];
  let flavors: string[] = [];
  let weights: string[] = [];
  let ages: string[] = [];
  let sizes: string[] = [];
  let materials: string[] = [];

  const isDogOrCat = categoryId.includes('dog') || categoryId.includes('cat');
  const isBird = categoryId.includes('bird');
  const isFish = categoryId.includes('fish') || categoryId.includes('aquarium') || categoryId.includes('water');
  const isRodent = categoryId.includes('rodent');
  const isReptile = categoryId.includes('reptile') || categoryId.includes('terrarium');

  const isFoodOrTreat = categoryId.includes('food') || categoryId.includes('treats') || categoryId.includes('vitamins') || categoryId.includes('health');
  
  if (isDogOrCat) {
    brands = ['Royal Canin', 'Pro Plan', 'Acana', 'Reflex', "Hill's", 'Brit', 'N&D', 'Orijen', 'Trixie', 'Gimcat', 'Whiskas', 'Gimdog'];
    flavors = ['Chicken', 'Salmon', 'Lamb', 'Beef', 'Turkey', 'Ocean Fish', 'Vegetable', 'Rabbit'];
    weights = ['1 kg', '2.5 kg', '5 kg', '10 kg', '12 kg', '15 kg'];
    ages = ['Puppy/Kitten', 'Adult', 'Senior', 'All Life Stages'];
    sizes = ['Small', 'Medium', 'Large', 'All Breeds'];
    materials = ['Plastic', 'Stainless Steel', 'Ceramic', 'Silicone', 'Nylon', 'Leather', 'Fleece'];
  } else if (isBird) {
    brands = ['Versele-Laga', 'Quik', 'Vitakraft', 'Jungle', 'Trixie', 'Flamingo'];
    flavors = ['Mixed Seeds', 'Fruit', 'Honey', 'Nut', 'Eucalyptus'];
    weights = ['250 g', '500 g', '1 kg', '2.5 kg'];
    ages = ['All Life Stages'];
    sizes = ['Small Bird', 'Medium Bird', 'Parrot'];
    materials = ['Wood', 'Metal', 'Plastic', 'Cuttlebone', 'Natural Branch'];
  } else if (isFish) {
    brands = ['Tetra', 'Sera', 'JBL', 'Eheim', 'Fluval', 'AquaClear', 'Marina'];
    flavors = ['Algae', 'Krill', 'Bloodworms', 'Color Enhancing', 'Spirulina'];
    weights = ['50 g', '100 g', '250 g', '500 g'];
    ages = ['All Life Stages'];
    sizes = ['Small', 'Medium', 'Large'];
    materials = ['Glass', 'Acrylic', 'Plastic', 'Sponge', 'Ceramic Rings'];
  } else if (isRodent) {
    brands = ['Beaphar', 'Vitakraft', 'Ferplast', 'Versele-Laga', 'Trixie', 'Living World'];
    flavors = ['Alfalfa', 'Timothy Hay', 'Apple', 'Carrot', 'Mixed Berries'];
    weights = ['500 g', '1 kg', '2.5 kg'];
    ages = ['Baby', 'Adult'];
    sizes = ['Small Pet', 'Hamster/Mouse', 'Rabbit/Guinea Pig'];
    materials = ['Wood', 'Plastic', 'Metal', 'Paper', 'Corn Cob'];
  } else if (isReptile) {
    brands = ['Exo Terra', 'JBL', 'Hagen', 'Lucky Reptile', 'Zoomed', 'Komodo'];
    flavors = ['Crickets', 'Mealworms', 'Calcium Coated', 'Vegetable Blend'];
    weights = ['100 g', '250 g', '500 g'];
    ages = ['Juvenile', 'Adult'];
    sizes = ['Small', 'Medium', 'Large'];
    materials = ['Glass', 'Mesh', 'Resin', 'Cork Bark', 'Sand', 'Coco Husk'];
  } else {
    brands = ['Premium Pet', 'Pets Plus', 'Happy Tails'];
    flavors = ['Standard'];
    weights = ['1 kg'];
    ages = ['All'];
    sizes = ['Standard'];
    materials = ['Standard'];
  }
  
  const products: Product[] = [];
  
  for (let i = 0; i < count; i++) {
    const seed = i * 1337 + categoryId.length;
    
    // Select specific values based on category
    const brand = brands[seed % brands.length];
    const isEdible = isFoodOrTreat;
    const isGear = !isFoodOrTreat;
    
    let flavor, weight, age, breedSize, material;
    
    if (isEdible) {
      flavor = flavors[seed % flavors.length];
      weight = weights[seed % weights.length];
      age = ages[seed % ages.length];
      if (isDogOrCat) breedSize = sizes[seed % sizes.length];
    } else {
      material = materials[seed % materials.length];
      if (isDogOrCat || isBird || isRodent || isReptile) {
         breedSize = sizes[seed % sizes.length];
      }
    }
    
    let basePrice = 50;
    if (categoryId.includes('dry-food') || categoryId.includes('food')) {
      basePrice = isDogOrCat ? 400 + (seed % 2000) : 100 + (seed % 400);
    } else if (categoryId.includes('wet-food') || categoryId.includes('canned')) {
      basePrice = 35 + (seed % 60);
    } else if (categoryId.includes('treat')) {
      basePrice = 80 + (seed % 150);
    } else if (categoryId.includes('toy')) {
      basePrice = 100 + (seed % 400);
    } else if (categoryId.includes('cage') || categoryId.includes('aquarium') || categoryId.includes('terrarium')) {
      basePrice = 1000 + (seed % 4000);
    } else if (categoryId.includes('bed') || categoryId.includes('furniture') || categoryId.includes('tree')) {
      basePrice = 600 + (seed % 2000);
    } else if (categoryId.includes('litter') || categoryId.includes('sand')) {
      basePrice = 150 + (seed % 300);
    } else {
      basePrice = 150 + (seed % 800);
    }
    
    // add minor random cents to basePrice
    basePrice += (seed % 99) / 100;
    
    // Only apply discounts sensibly
    const hasDiscount = i % 5 === 0 && basePrice > 100;
    const discount = hasDiscount ? 10 + (seed % 20) : 0;
    const price = hasDiscount ? basePrice * (1 - discount/100) : basePrice;

    // Formatting product name
    const unslugCategory = categoryId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let name = `${brand} Premium ${unslugCategory}`;
    if (isEdible && flavor) {
      name += ` ${flavor} Flavor`;
    } else if (isGear && material) {
      name += ` (${material})`;
    }
    if (isEdible && weight) {
      name += ` - ${weight}`;
    } else if (isGear && breedSize) {
      name += ` - ${breedSize}`;
    }

    // specific image keywords
    let imgKeyword = 'pet';
    if (isDogOrCat && isEdible) imgKeyword = categoryId.includes('dog') ? 'dog,food' : 'cat,food';
    else if (isDogOrCat && isGear) imgKeyword = categoryId.includes('dog') ? 'dog,toy' : 'cat,toy';
    else if (isBird) imgKeyword = 'bird,pet';
    else if (isFish) imgKeyword = 'aquarium,fish';
    else if (isRodent) imgKeyword = 'hamster,pet';
    else if (isReptile) imgKeyword = 'reptile,pet';

    products.push({
      id: `${categoryId}-prod-${i}`,
      name,
      image: `https://loremflickr.com/320/320/${imgKeyword}?random=${seed}`,
      price,
      oldPrice: hasDiscount ? basePrice : undefined,
      discount: hasDiscount ? discount : undefined,
      rating: null,
      reviews: null,
      sold: seed % 2000,
      badges: i % 5 === 0 ? ['Bestseller'] : i % 7 === 0 ? ['New'] : [],
      
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
          ...userPets.filter(p => p.type).map(p => p.type.toLowerCase())
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
                      isWishlisted={wishlistItems.includes(product.name)}
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

const ProductListingCard: React.FC<{ 
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
          onClick={(e) => { e.preventDefault(); onToggleWishlist(product.name); }}
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
            onClick={(e) => { e.preventDefault(); onAddToCart(product.name, quantity, product.price); setQuantity(1); }}
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
          {product.name}
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
              onClick={(e) => { e.preventDefault(); onAddToCart(product.name, 1, product.price); }}
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
