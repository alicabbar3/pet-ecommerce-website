import React, { useState, useMemo, useEffect, useRef } from "react";
import { CATEGORIES } from "./categories";
import { motion, AnimatePresence } from "motion/react";
import VirtualTryOnModal from "./VirtualTryOnModal";
import {
  ChevronRight,
  Filter,
  X,
  ChevronDown,
  Heart,
  Search,
  Check,
  ShoppingCart,
  Loader2,
  Minus,
  Plus,
  Package,
  FolderPlus,
  Sparkles,
  Camera,
} from "lucide-react";
import { isTryOnCompatible } from "./tryOnUtils";
import { useLang, t, Lang } from "./i18n";

export type Product = {
  id: string;
  name: { EN: string; TR: string };
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating?: number | null;
  reviews?: number | null;
  sold: number;
  stock: number;
  badges: string[];

  brand: string;
  flavor?: string;
  weight?: string;
  age?: string;
  breedSize?: string;
  material?: string;
  color?: string;

  birdSpecies?: string;
  feedType?: string;
  cageSize?: string;
  toyType?: string;
  vitaminType?: string;

  waterType?: string;
  fishType?: string;
  tankVolume?: string;

  smallPetSpecies?: string;
  beddingMaterial?: string;

  reptileSpecies?: string;
  terrariumSize?: string;
  wattage?: string;
};

export default function CategoryPage({
  categoryId,
  onAddToCart,
  savedProductNames,
  onSaveToFolder,
  userPets = [],
  selectedPets,
  database = [],
  onTryOnProduct,
}: {
  categoryId: string;
  onAddToCart: (name: string, quantity?: number, price?: number) => void;
  savedProductNames: string[];
  onSaveToFolder: (name: string) => void;
  userPets?: any[];
  selectedPets?: string[];
  database?: any[];
  onTryOnProduct?: (product: any) => void;
}) {
  const { lang } = useLang();

  const [products, setProducts] = useState<Product[]>([]);
  const [tryOnProduct, setTryOnProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");

  // Find category info
  const subcategory = useMemo(() => {
    if (categoryId === "personalized") {
      return {
        parent: { name: { EN: "Catalog", TR: "Katalog" } },
        sub: {
          name: {
            EN: "Your Personalized Catalog",
            TR: "Sizin İçin Özel Seçimler",
          },
        },
      } as any;
    }
    for (const cat of CATEGORIES) {
      const sub = cat.subcategories.find((s) => s.id === categoryId);
      if (sub) return { parent: cat, sub };
    }
    return {
      parent: { name: { EN: "Catalog", TR: "Katalog" } },
      sub: { name: { EN: categoryId, TR: categoryId } },
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

  // Bird-specific filter states
  const [selectedBirdSpecies, setSelectedBirdSpecies] = useState<string[]>([]);
  const [selectedFeedTypes, setSelectedFeedTypes] = useState<string[]>([]);
  const [selectedCageSizes, setSelectedCageSizes] = useState<string[]>([]);

  // Fish-specific filter states
  const [selectedWaterTypes, setSelectedWaterTypes] = useState<string[]>([]);
  const [selectedFishTypes, setSelectedFishTypes] = useState<string[]>([]);
  const [selectedTankVolumes, setSelectedTankVolumes] = useState<string[]>([]);

  // Rodent-specific filter states
  const [selectedSmallPetSpecies, setSelectedSmallPetSpecies] = useState<string[]>([]);
  const [selectedBeddingMaterials, setSelectedBeddingMaterials] = useState<string[]>([]);

  // Reptile-specific filter states
  const [selectedReptileSpecies, setSelectedReptileSpecies] = useState<string[]>([]);
  const [selectedTerrariumSizes, setSelectedTerrariumSizes] = useState<string[]>([]);
  const [selectedWattages, setSelectedWattages] = useState<string[]>([]);
  // Remove substrate material filter


  const getOrganicCount = (catId: string) => {
    let hash = 0;
    for (let i = 0; i < catId.length; i++) {
      hash = catId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 290) + 60;
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
    setSelectedFlavors([]);
    setSelectedWeights([]);
    setSelectedAges([]);
    setSelectedSizes([]);
    setSelectedMaterials([]);
    setSelectedBirdSpecies([]);
    setSelectedFeedTypes([]);
    setSelectedCageSizes([]);
    setSelectedWaterTypes([]);
    setSelectedFishTypes([]);
    setSelectedTankVolumes([]);
    setSelectedSmallPetSpecies([]);
    setSelectedBeddingMaterials([]);
    setSelectedReptileSpecies([]);
    setSelectedTerrariumSizes([]);
    setSelectedWattages([]);
  };

  useEffect(() => {
    // Simulate loading data
    setIsLoadingProducts(true);
    setProducts([]);
    setVisibleCount(24);
    resetFilters();
    const timer = setTimeout(() => {
      setIsLoadingProducts(false);
      let newProducts = database;
      
      // Filter by category
      if (categoryId && categoryId !== "all" && categoryId !== "personalized") {
        newProducts = newProducts.filter(p => p._categoryId === categoryId || p._subCategoryId === categoryId);
      }
      
      setProducts(newProducts);
    }, 400);

    return () => clearTimeout(timer);
  }, [categoryId, userPets, selectedPets]);

  // Derive filter options from products
  const availableBrands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))),
    [products],
  );
  const availableFlavors = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.flavor).filter(Boolean) as string[]),
      ),
    [products],
  );
  const availableWeights = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.weight).filter(Boolean) as string[]),
      ),
    [products],
  );
  const availableAges = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.age).filter(Boolean) as string[]),
      ),
    [products],
  );
  const availableSizes = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.breedSize).filter(Boolean) as string[]),
      ),
    [products],
  );
  const availableMaterials = useMemo(
    () =>
      Array.from(
        new Set(products.map((p) => p.material).filter(Boolean) as string[]),
      ),
    [products],
  );
  
  const availableBirdSpecies = useMemo(() => Array.from(new Set(products.map(p => p.birdSpecies).filter(Boolean) as string[])), [products]);
  const availableFeedTypes = useMemo(() => Array.from(new Set(products.map(p => p.feedType).filter(Boolean) as string[])), [products]);
  const availableCageSizes = useMemo(() => Array.from(new Set(products.map(p => p.cageSize).filter(Boolean) as string[])), [products]);

  const availableWaterTypes = useMemo(() => Array.from(new Set(products.map(p => p.waterType).filter(Boolean) as string[])), [products]);
  const availableFishTypes = useMemo(() => Array.from(new Set(products.map(p => p.fishType).filter(Boolean) as string[])), [products]);
  const availableTankVolumes = useMemo(() => Array.from(new Set(products.map(p => p.tankVolume).filter(Boolean) as string[])), [products]);

  const availableSmallPetSpecies = useMemo(() => Array.from(new Set(products.map(p => p.smallPetSpecies).filter(Boolean) as string[])), [products]);
  const availableBeddingMaterials = useMemo(() => Array.from(new Set(products.map(p => p.beddingMaterial).filter(Boolean) as string[])), [products]);

  const availableReptileSpecies = useMemo(() => Array.from(new Set(products.map(p => p.reptileSpecies).filter(Boolean) as string[])), [products]);
  const availableTerrariumSizes = useMemo(() => Array.from(new Set(products.map(p => p.terrariumSize).filter(Boolean) as string[])), [products]);
  const availableWattages = useMemo(() => Array.from(new Set(products.map(p => p.wattage).filter(Boolean) as string[])), [products]);
  // Filter and sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand))
          return false;
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
        if (
          selectedFlavors.length > 0 &&
          p.flavor &&
          !selectedFlavors.includes(p.flavor)
        )
          return false;
        if (
          selectedWeights.length > 0 &&
          p.weight &&
          !selectedWeights.includes(p.weight)
        )
          return false;
        if (selectedAges.length > 0 && p.age && !selectedAges.includes(p.age))
          return false;
        if (
          selectedSizes.length > 0 &&
          p.breedSize &&
          !selectedSizes.includes(p.breedSize)
        )
          return false;
        if (
          selectedMaterials.length > 0 &&
          p.material &&
          !selectedMaterials.includes(p.material)
        )
          return false;
          
        // Bird-specific filters
        if (selectedBirdSpecies.length > 0 && p.birdSpecies && !selectedBirdSpecies.includes(p.birdSpecies)) return false;
        if (selectedFeedTypes.length > 0 && p.feedType && !selectedFeedTypes.includes(p.feedType)) return false;
        if (selectedCageSizes.length > 0 && p.cageSize && !selectedCageSizes.includes(p.cageSize)) return false;

        // Fish-specific filters
        if (selectedWaterTypes.length > 0 && p.waterType && !selectedWaterTypes.includes(p.waterType)) return false;
        if (selectedFishTypes.length > 0 && p.fishType && !selectedFishTypes.includes(p.fishType)) return false;
        if (selectedTankVolumes.length > 0 && p.tankVolume && !selectedTankVolumes.includes(p.tankVolume)) return false;

        // Rodent-specific filters
        if (selectedSmallPetSpecies.length > 0 && p.smallPetSpecies && !selectedSmallPetSpecies.includes(p.smallPetSpecies)) return false;
        if (selectedBeddingMaterials.length > 0 && p.beddingMaterial && !selectedBeddingMaterials.includes(p.beddingMaterial)) return false;

        // Reptile-specific filters
        if (selectedReptileSpecies.length > 0 && p.reptileSpecies && !selectedReptileSpecies.includes(p.reptileSpecies)) return false;
        if (selectedTerrariumSizes.length > 0 && p.terrariumSize && !selectedTerrariumSizes.includes(p.terrariumSize)) return false;
        if (selectedWattages.length > 0 && p.wattage && !selectedWattages.includes(p.wattage)) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "newest") return b.id.localeCompare(a.id);
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return b.sold - a.sold; // recommended / bestseller
      });
  }, [
    products,
    selectedBrands,
    priceRange,
    selectedFlavors,
    selectedWeights,
    selectedAges,
    selectedSizes,
    selectedMaterials,
    selectedBirdSpecies,
    selectedFeedTypes,
    selectedCageSizes,
    selectedWaterTypes,
    selectedFishTypes,
    selectedTankVolumes,
    selectedSmallPetSpecies,
    selectedBeddingMaterials,
    selectedReptileSpecies,
    selectedTerrariumSizes,
    selectedWattages,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000 ||
    selectedFlavors.length > 0 ||
    selectedWeights.length > 0 ||
    selectedAges.length > 0 ||
    selectedSizes.length > 0 ||
    selectedBirdSpecies.length > 0 ||
    selectedFeedTypes.length > 0 ||
    selectedCageSizes.length > 0 ||
    selectedWaterTypes.length > 0 ||
    selectedFishTypes.length > 0 ||
    selectedTankVolumes.length > 0 ||
    selectedSmallPetSpecies.length > 0 ||
    selectedBeddingMaterials.length > 0 ||
    selectedReptileSpecies.length > 0 ||
    selectedTerrariumSizes.length > 0 ||
    selectedWattages.length > 0 ||
    selectedMaterials.length > 0;

  const toggleFilter = (
    setFn: React.Dispatch<React.SetStateAction<string[]>>,
    val: string,
  ) => {
    setFn((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  if (!subcategory) {
    return <div className="py-32 text-center">Category not found</div>;
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between lg:hidden mb-4 border-b border-border pb-4">
        <h3 className="font-bold text-lg">
          {lang === "TR" ? "Filtreler" : "Filters"}
        </h3>
        <button
          onClick={() => setIsMobileFiltersOpen(false)}
          className="p-2 bg-secondary rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {hasActiveFilters && (
        <div className="mb-4">
          <button
            onClick={resetFilters}
            className="w-full py-2.5 rounded-lg bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            {lang === "TR" ? "Filtreleri Temizle" : "Clear Filters"}
          </button>
        </div>
      )}

      {/* Brands */}
      <FilterSection title={lang === "TR" ? "Marka" : "Brand"}>
        <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
          {availableBrands.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleFilter(setSelectedBrands, b)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedBrands.includes(b) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
              >
                {selectedBrands.includes(b) && (
                  <Check className="w-3.5 h-3.5" />
                )}
              </div>
              <span className="text-sm text-foreground">{b}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title={lang === "TR" ? "Fiyat Aralığı" : "Price Range"}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value) || 0, priceRange[1]])
            }
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal"
            placeholder="Min"
          />
          <span className="text-muted-foreground">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value) || 5000])
            }
            className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal"
            placeholder="Max"
          />
        </div>
      </FilterSection>

      {/* Flavors */}
      {availableFlavors.length > 0 && (
        <FilterSection title={lang === "TR" ? "Lezzet/İçerik" : "Flavor/Taste"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableFlavors.map((f) => (
              <label
                key={f}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedFlavors.includes(f)}
                  onChange={() => toggleFilter(setSelectedFlavors, f)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedFlavors.includes(f) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedFlavors.includes(f) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{t(f, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Material */}
      {availableMaterials.length > 0 && (
        <FilterSection title={lang === "TR" ? "Materyal" : "Material"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableMaterials.map((m) => (
              <label
                key={m}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(m)}
                  onChange={() => toggleFilter(setSelectedMaterials, m)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedMaterials.includes(m) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedMaterials.includes(m) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{t(m, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Bird Species */}
      {availableBirdSpecies.length > 0 && (
        <FilterSection title={lang === "TR" ? "Kuş Türü" : "Bird Species"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableBirdSpecies.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBirdSpecies.includes(s)}
                  onChange={() => toggleFilter(setSelectedBirdSpecies, s)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedBirdSpecies.includes(s) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedBirdSpecies.includes(s) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{t(s, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Bird Feed Types */}
      {availableFeedTypes.length > 0 && (
        <FilterSection title={lang === "TR" ? "Yem Tipi" : "Feed Type"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableFeedTypes.map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedFeedTypes.includes(t)}
                  onChange={() => toggleFilter(setSelectedFeedTypes, t)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedFeedTypes.includes(t) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedFeedTypes.includes(t) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{t}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Bird Cage Sizes */}
      {availableCageSizes.length > 0 && (
        <FilterSection title={lang === "TR" ? "Kafes Boyutu" : "Cage Size"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableCageSizes.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCageSizes.includes(c)}
                  onChange={() => toggleFilter(setSelectedCageSizes, c)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedCageSizes.includes(c) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedCageSizes.includes(c) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{t(c, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Water Types (Fish) */}
      {availableWaterTypes.length > 0 && (
        <FilterSection title={lang === "TR" ? "Su Tipi" : "Water Type"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableWaterTypes.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedWaterTypes.includes(c)}
                  onChange={() => toggleFilter(setSelectedWaterTypes, c)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedWaterTypes.includes(c) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedWaterTypes.includes(c) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{c}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Fish Types */}
      {availableFishTypes.length > 0 && (
        <FilterSection title={lang === "TR" ? "Balık Türü" : "Fish Type"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableFishTypes.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedFishTypes.includes(c)}
                  onChange={() => toggleFilter(setSelectedFishTypes, c)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedFishTypes.includes(c) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedFishTypes.includes(c) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{c}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Tank Volume */}
      {availableTankVolumes.length > 0 && (
        <FilterSection title={lang === "TR" ? "Akvaryum Hacmi" : "Tank Volume"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableTankVolumes.map((c) => (
              <label
                key={c}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedTankVolumes.includes(c)}
                  onChange={() => toggleFilter(setSelectedTankVolumes, c)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedTankVolumes.includes(c) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedTankVolumes.includes(c) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{c}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Small Pet Species */}
      {availableSmallPetSpecies.length > 0 && (
        <FilterSection title={lang === "TR" ? "Tür" : "Species"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableSmallPetSpecies.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedSmallPetSpecies.includes(s)}
                  onChange={() => toggleFilter(setSelectedSmallPetSpecies, s)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedSmallPetSpecies.includes(s) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedSmallPetSpecies.includes(s) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{s}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Bedding Materials */}
      {availableBeddingMaterials.length > 0 && (
        <FilterSection title={lang === "TR" ? "Taban Malzemesi" : "Bedding Material"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableBeddingMaterials.map((m) => (
              <label
                key={m}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBeddingMaterials.includes(m)}
                  onChange={() => toggleFilter(setSelectedBeddingMaterials, m)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedBeddingMaterials.includes(m) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedBeddingMaterials.includes(m) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{m}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Reptile Species */}
      {availableReptileSpecies.length > 0 && (
        <FilterSection title={lang === "TR" ? "Sürüngen Türü" : "Species"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableReptileSpecies.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedReptileSpecies.includes(s)}
                  onChange={() => toggleFilter(setSelectedReptileSpecies, s)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedReptileSpecies.includes(s) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedReptileSpecies.includes(s) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{s}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Terrarium Size */}
      {availableTerrariumSizes.length > 0 && (
        <FilterSection title={lang === "TR" ? "Teraryum Boyutu" : "Terrarium Size"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableTerrariumSizes.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedTerrariumSizes.includes(s)}
                  onChange={() => toggleFilter(setSelectedTerrariumSizes, s)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedTerrariumSizes.includes(s) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedTerrariumSizes.includes(s) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{s}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Wattages */}
      {availableWattages.length > 0 && (
        <FilterSection title={lang === "TR" ? "Güç (Watt)" : "Wattage"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableWattages.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedWattages.includes(s)}
                  onChange={() => toggleFilter(setSelectedWattages, s)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedWattages.includes(s) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedWattages.includes(s) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{s}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}



      {/* Ages */}
      {availableAges.length > 0 && (
        <FilterSection title={lang === "TR" ? "Yaş Grubu" : "Age Range"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableAges.map((a) => (
              <label
                key={a}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedAges.includes(a)}
                  onChange={() => toggleFilter(setSelectedAges, a)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedAges.includes(a) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedAges.includes(a) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{t(a, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Sizes */}
      {availableSizes.length > 0 && (
        <FilterSection title={lang === "TR" ? "Boyut / Tür" : "Size / Type"}>
          <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-2">
            {availableSizes.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(s)}
                  onChange={() => toggleFilter(setSelectedSizes, s)}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${selectedSizes.includes(s) ? "bg-brand-teal border-brand-teal text-white" : "border-input bg-card group-hover:border-brand-teal"}`}
                >
                  {selectedSizes.includes(s) && (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm text-foreground">{t(s, lang)}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Weights */}
      {availableWeights.length > 0 && (
        <FilterSection title={lang === "TR" ? "Ağırlık" : "Package Weight"}>
          <div className="grid grid-cols-2 gap-2">
            {availableWeights.map((w) => (
              <button
                key={w}
                onClick={() => toggleFilter(setSelectedWeights, w)}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${selectedWeights.includes(w) ? "bg-brand-teal/10 border-brand-teal text-brand-teal" : "bg-card border-input text-muted-foreground hover:border-brand-teal/50"}`}
              >
                {w}
              </button>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  );

  // Intersection observer for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !isLoadingProducts &&
          visibleCount < filteredProducts.length
        ) {
          setVisibleCount((prev) =>
            Math.min(prev + 24, filteredProducts.length),
          );
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [isLoadingProducts, visibleCount, filteredProducts.length]);

  return (
    <div className="min-h-screen bg-secondary/30 pt-4 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "";
            }}
            className="hover:text-brand-teal transition-colors"
          >
            Vivia
          </a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>{subcategory.parent.name[lang]}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-foreground">
            {subcategory.sub.name[lang]}
          </span>
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
              {products.length > 0
                ? lang === "TR"
                  ? `${products.length} ürün bulundu`
                  : `${products.length} products found`
                : ""}
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
                {lang === "TR" ? "Filtreler" : "Filters"}
              </button>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                  {lang === "TR" ? "Sırala:" : "Sort by:"}
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all cursor-pointer"
                  >
                    <option value="recommended">
                      {lang === "TR" ? "Önerilen" : "Recommended"}
                    </option>
                    <option value="newest">
                      {lang === "TR" ? "En Yeniler" : "Newest"}
                    </option>
                    <option value="rating">
                      {lang === "TR" ? "En Yüksek Puan" : "Highest Rated"}
                    </option>
                    <option value="price-low">
                      {lang === "TR" ? "Fiyat: Artan" : "Price: Low to High"}
                    </option>
                    <option value="price-high">
                      {lang === "TR" ? "Fiyat: Azalan" : "Price: High to Low"}
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {isLoadingProducts ? (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-brand-teal mb-4" />
                <p>
                  {lang === "TR"
                    ? "Ürünler yükleniyor..."
                    : "Loading products..."}
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {lang === "TR" ? "Ürün Bulunamadı" : "No Products Found"}
                </h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  {lang === "TR"
                    ? "Seçtiğiniz filtrelere uygun ürün bulamadık. Lütfen farklı seçenekler deneyin."
                    : "We couldnt find any products matching your filters. Please try different options."}
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
                  {lang === "TR" ? "Filtreleri Temizle" : "Clear Filters"}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-8">
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductListingCard
                      key={product.id}
                      product={product}
                      lang={lang}
                      onAddToCart={onAddToCart}
                      isSaved={savedProductNames.includes(product.name.EN)}
                      onSaveToFolder={onSaveToFolder}
                      onTryOnProduct={onTryOnProduct}
                    />
                  ))}
                </div>

                {/* Pagination / Load More */}
                {filteredProducts.length > 0 && (
                  <div className="flex flex-col items-center justify-center pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      {lang === "TR"
                        ? `${visibleCount < filteredProducts.length ? visibleCount : filteredProducts.length} / ${filteredProducts.length} ürün gösteriliyor`
                        : `Showing ${visibleCount < filteredProducts.length ? visibleCount : filteredProducts.length} of ${filteredProducts.length} products`}
                    </p>
                    {visibleCount < filteredProducts.length && (
                      <button
                        ref={loadMoreRef}
                        onClick={() =>
                          setVisibleCount((prev) =>
                            Math.min(prev + 24, filteredProducts.length),
                          )
                        }
                        className="px-8 py-3 rounded-xl border-2 border-brand-teal text-brand-teal font-bold hover:bg-brand-teal hover:text-white transition-all active:scale-95 flex items-center gap-2"
                      >
                        {lang === "TR" ? "Daha Fazla Yükle" : "Load More"}
                      </button>
                    )}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 z-[150] lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                  {lang === "TR"
                    ? `Sonuçları Göster (${filteredProducts.length})`
                    : `Show Results (${filteredProducts.length})`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <VirtualTryOnModal
        isOpen={!!tryOnProduct}
        onClose={() => setTryOnProduct(null)}
        product={tryOnProduct}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

// Subcomponents

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 mb-2 group"
      >
        <span className="font-semibold text-sm text-foreground tracking-tight">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
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
  product: Product;
  lang: string;
  onAddToCart: (name: string, quantity?: number, price?: number) => void;
  isSaved?: boolean;
  onSaveToFolder: (name: string) => void;
  onTryOnProduct?: (p: Product) => void;
}> = ({ product, lang, onAddToCart, isSaved = false, onSaveToFolder, onTryOnProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  return (
    <a href={`#/product/${product.id}`} className="bg-card rounded-2xl border border-border hover:border-brand-teal/40 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-500 flex flex-col group overflow-hidden relative h-full">
      {/* Image & Badges Container */}
      <div className="aspect-[4/5] sm:aspect-square relative bg-secondary/20 overflow-hidden flex items-center justify-center p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {product.discount && (
            <div className="bg-[#E27D60] text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm">
              -{Math.round(product.discount)}%
            </div>
          )}
          {product.badges.map((b) => (
            <div
              key={b}
              className="bg-foreground text-background text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm"
            >
              {lang === "TR" && b === "New"
                ? "Yeni"
                : b === "Bestseller"
                  ? lang === "TR"
                    ? "Çok Satan"
                    : b
                  : b}
            </div>
          ))}
        </div>

        <div className="absolute top-3 right-3 z-30 flex flex-col gap-2 items-end">
          {/* Folder Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSaveToFolder(product.name.EN);
            }}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all bg-background/90 backdrop-blur-md shadow-sm border border-border/50 hover:scale-105 active:scale-95 ${isSaved ? "text-brand-teal border-brand-teal/20 bg-brand-teal/10" : "text-muted-foreground hover:text-brand-teal"}`}
          >
            <FolderPlus
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${isSaved ? "fill-current" : ""}`}
            />
          </button>

          {/* Try On Button */}
          {onTryOnProduct && isTryOnCompatible((product as any)._subCategoryId || (product as any)._categoryId, product.name.EN) && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTryOnProduct(product);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all bg-background/95 backdrop-blur-md shadow-md border border-brand-teal/30 hover:border-brand-teal hover:scale-105 active:scale-95 text-brand-teal hover:shadow-brand-teal/20"
              title={lang === "TR" ? "Yapay Zeka ile Dene" : "AI Try-On"}
            >
              <div className="relative flex items-center justify-center">
                <Camera className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                <Sparkles className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 text-yellow-500" />
              </div>
            </button>
          )}
        </div>

        {product.image && !imgError ? (
          <img src={product.image} onError={() => setImgError(true)} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-all duration-700 ease-out" alt={product.name.EN} />
        ) : (
          <Package className="w-16 h-16 sm:w-20 sm:h-20 text-muted-foreground/20 group-hover:scale-110 group-hover:text-brand-teal/40 transition-all duration-700 ease-out" />
        )}

        {/* Desktop Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 hidden lg:flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {product.stock > 0 ? (
            <>
              <div className="flex items-center justify-between border border-white/20 rounded-xl overflow-hidden bg-background/95 backdrop-blur-md shadow-lg">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:text-brand-teal hover:bg-secondary active:scale-95 transition-all duration-300"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold text-foreground text-sm min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(quantity + 1);
                  }}
                  className="w-10 h-10 flex items-center justify-center text-foreground hover:text-brand-teal hover:bg-secondary active:scale-95 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart(product.name.EN, quantity, product.price);
                  setQuantity(1);
                }}
                className="w-full bg-brand-teal text-white font-bold py-2.5 rounded-xl shadow-[0_4px_14px_0_rgba(45,212,191,0.39)] hover:bg-brand-teal-dark active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {lang === "TR" ? "Sepete Ekle" : "Add to Cart"}
              </button>
            </>
          ) : (
             <div className="w-full bg-secondary text-muted-foreground/50 font-bold py-3 rounded-xl border border-white/10 text-sm flex items-center justify-center gap-2 text-center shadow-lg backdrop-blur cursor-not-allowed">
                {lang === "TR" ? "Tükendi" : "Out of Stock"}
             </div>
          )}
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
          {product.name[lang as "EN" | "TR"] || product.name.EN}
        </h3>

        <div className="flex items-center gap-1.5 mb-4 min-h-[1.25rem]">
          <div className="flex text-[#F4A261] text-[10px] sm:text-xs">
            {Array.from({ length: Math.floor(product.rating || 5) }).map((_, i) => (
              <span key={i}>★</span>
            ))}
            {product.rating && product.rating % 1 !== 0 && <span>★</span>}
            {Array.from({ length: 5 - Math.ceil(product.rating || 5) }).map((_, i) => (
              <span key={`empty-${i}`} className="text-muted-foreground opacity-30">★</span>
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            ({product.reviews || 0})
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-border/60 flex flex-col gap-3">
          <div className="flex items-end justify-between gap-2 w-full">
            <div className="flex flex-col">
              {product.oldPrice && (
                <span className="text-[10px] sm:text-xs text-muted-foreground/60 line-through decoration-muted-foreground/40 font-medium mb-0.5">
                  ₺{product.oldPrice.toFixed(2)}
                </span>
              )}
              <span
                className={`text-base sm:text-lg lg:text-xl font-extrabold tracking-tight ${product.discount ? "text-[#E27D60]" : "text-foreground"}`}
              >
                ₺{product.price.toFixed(2)}
              </span>
            </div>

            {/* Mobile / Tablet Add to Cart Button */}
            {product.stock > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onAddToCart(product.name.EN, 1, product.price);
                }}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-teal text-white flex items-center justify-center hover:bg-brand-teal-dark active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(45,212,191,0.2)]"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </button>
            ) : (
               <div className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground/60 p-2 text-center leading-tight">
                 {lang === "TR" ? 'YOK' : 'OUT'}
               </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};
